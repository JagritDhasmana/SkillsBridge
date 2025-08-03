
-- Drop all tables in the public schema
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.applications CASCADE;

-- Create the profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create the projects table
CREATE TABLE public.projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  skills TEXT[] NOT NULL,
  duration VARCHAR(50) NOT NULL,
  mentor VARCHAR(255) NOT NULL,
  applications INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'Active',
  posted_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  organization_id UUID REFERENCES public.profiles(id)
);

-- Create the applications table
CREATE TABLE public.applications (
  id SERIAL PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id),
  project_id INTEGER REFERENCES public.projects(id),
  status VARCHAR(50) DEFAULT 'Under Review',
  applied_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for projects
CREATE POLICY "Projects are viewable by everyone." ON public.projects FOR SELECT USING (true);
CREATE POLICY "Organizations can create projects." ON public.projects FOR INSERT WITH CHECK (auth.uid() = organization_id);
CREATE POLICY "Organizations can update their own projects." ON public.projects FOR UPDATE USING (auth.uid() = organization_id);

-- RLS Policies for applications
CREATE POLICY "Users can view their own applications." ON public.applications FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students can create applications." ON public.applications FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Organizations can view applications for their projects." ON public.applications FOR SELECT USING (
  EXISTS (
    SELECT 1
    FROM public.projects
    WHERE projects.id = applications.project_id AND projects.organization_id = auth.uid()
  )
);

-- Sample Data
-- To get the user IDs, you can run the following query after creating the users in your application:
-- SELECT id, email FROM auth.users;

-- Replace '<student_user_id>' and '<organization_user_id>' with the actual user IDs.

-- Insert a student profile
-- INSERT INTO public.profiles (id, email, role)
-- VALUES ('<student_user_id>', 'student@example.com', 'student');

-- Insert an organization profile
-- INSERT INTO public.profiles (id, email, role)
-- VALUES ('<organization_user_id>', 'organization@example.com', 'organization');

-- Insert some projects
-- INSERT INTO public.projects (title, description, skills, duration, mentor, organization_id)
-- VALUES
--   ('Marketing Strategy Development', 'Help develop a comprehensive marketing strategy for our new product launch.', '{"Marketing", "Strategy", "Research"}', '4 weeks', 'Sarah Johnson', '<organization_user_id>'),
--   ('Website Redesign Project', 'Redesign our company website with modern UI/UX principles.', '{"UI/UX Design", "Web Design", "Figma"}', '6 weeks', 'David Chen', '<organization_user_id>');

-- Insert some applications
-- INSERT INTO public.applications (student_id, project_id)
-- VALUES
--   ('<student_user_id>', 1),
--   ('<student_user_id>', 2);

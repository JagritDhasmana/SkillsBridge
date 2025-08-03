-- Test script to verify profiles table structure and permissions
-- Run this in your Supabase SQL editor to check if everything is set up correctly

-- 1. Check if the profiles table exists and has the new columns
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'profiles' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Check RLS policies on profiles table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'profiles';

-- 3. Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'profiles' AND schemaname = 'public';

-- 4. Test inserting a sample profile (replace with your actual user ID)
-- SELECT auth.uid(); -- This will show your current user ID
-- INSERT INTO public.profiles (id, email, role, first_name, last_name) 
-- VALUES (auth.uid(), 'test@example.com', 'student', 'Test', 'User');

-- 5. Check existing profiles
SELECT id, email, role, first_name, last_name, created_at 
FROM public.profiles 
ORDER BY created_at DESC 
LIMIT 5;

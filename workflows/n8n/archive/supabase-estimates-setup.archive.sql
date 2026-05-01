-- MULTI-NICHE CHAT AGENT: ESTIMATE TABLES SETUP
-- Run this script in your Supabase SQL Editor

-- 1. Create the estimate_requests table
CREATE TABLE IF NOT EXISTS public.estimate_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  lead_id UUID,
  niche TEXT NOT NULL,
  estimate_type TEXT,
  request_payload_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for estimate_requests
CREATE INDEX IF NOT EXISTS idx_estimate_requests_session ON public.estimate_requests(session_id);
CREATE INDEX IF NOT EXISTS idx_estimate_requests_lead ON public.estimate_requests(lead_id);

-- Enable RLS (Service Role access only for n8n)
ALTER TABLE public.estimate_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access" ON public.estimate_requests;
CREATE POLICY "Service role full access" ON public.estimate_requests FOR ALL USING (true) WITH CHECK (true);


-- 2. Create the estimate_results table
CREATE TABLE IF NOT EXISTS public.estimate_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  estimate_request_id UUID REFERENCES public.estimate_requests(id) ON DELETE CASCADE,
  lead_id UUID,
  niche TEXT NOT NULL,
  normalized_result_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  raw_api_response_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for estimate_results
CREATE INDEX IF NOT EXISTS idx_estimate_results_request ON public.estimate_results(estimate_request_id);
CREATE INDEX IF NOT EXISTS idx_estimate_results_lead ON public.estimate_results(lead_id);

-- Enable RLS
ALTER TABLE public.estimate_results ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access" ON public.estimate_results;
CREATE POLICY "Service role full access" ON public.estimate_results FOR ALL USING (true) WITH CHECK (true);


-- 3. Create the estimate_photos table
CREATE TABLE IF NOT EXISTS public.estimate_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  lead_id UUID,
  niche TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  signed_url TEXT,
  mime_type TEXT NOT NULL,
  size_bytes INTEGER,
  analysis_status TEXT DEFAULT 'pending',
  analysis_summary JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for estimate_photos
CREATE INDEX IF NOT EXISTS idx_estimate_photos_session ON public.estimate_photos(session_id);
CREATE INDEX IF NOT EXISTS idx_estimate_photos_lead ON public.estimate_photos(lead_id);

-- Enable RLS
ALTER TABLE public.estimate_photos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access" ON public.estimate_photos;
CREATE POLICY "Service role full access" ON public.estimate_photos FOR ALL USING (true) WITH CHECK (true);


-- 4. Set up Supabase Storage Bucket for Chat Uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('chat-uploads', 'chat-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
-- Allow service role to upload (from n8n)
DROP POLICY IF EXISTS "Service role uploads" ON storage.objects;
CREATE POLICY "Service role uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'chat-uploads');

-- Allow public read access to the images
DROP POLICY IF EXISTS "Public read" ON storage.objects;
CREATE POLICY "Public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'chat-uploads');

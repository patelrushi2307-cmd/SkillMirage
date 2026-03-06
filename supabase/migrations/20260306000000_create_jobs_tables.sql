-- Create jobs_base table for Kaggle historical data
CREATE TABLE public.jobs_base (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_title TEXT NOT NULL,
    company TEXT,
    city TEXT,
    skills TEXT[],
    experience TEXT,
    salary TEXT,
    job_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skills_base table
CREATE TABLE public.skills_base (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create jobs_live table for scraped fresh jobs
CREATE TABLE public.jobs_live (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_title TEXT NOT NULL,
    company TEXT,
    city TEXT,
    skills TEXT[],
    experience TEXT,
    salary TEXT,
    job_description TEXT,
    posting_date TIMESTAMP WITH TIME ZONE,
    source TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.jobs_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs_live ENABLE ROW LEVEL SECURITY;

-- Allow read access to authenticated users
CREATE POLICY "Allow read access to authenticated users on jobs_base"
ON public.jobs_base FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow read access to authenticated users on skills_base"
ON public.skills_base FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow read access to authenticated users on jobs_live"
ON public.jobs_live FOR SELECT
TO authenticated
USING (true);

-- Allow service role or admins to insert/update (for python pipeline)
CREATE POLICY "Allow service role full access on jobs_base"
ON public.jobs_base FOR ALL
TO service_role
USING (true);

CREATE POLICY "Allow service role full access on skills_base"
ON public.skills_base FOR ALL
TO service_role
USING (true);

CREATE POLICY "Allow service role full access on jobs_live"
ON public.jobs_live FOR ALL
TO service_role
USING (true);

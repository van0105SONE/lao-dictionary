-- Enable pg_trgm extension for fuzzy / similarity-based search
-- This is required for the similarity() function used in correct-incorrect word search.
-- Safe to run multiple times (IF NOT EXISTS).
CREATE EXTENSION IF NOT EXISTS pg_trgm;

import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://ttkkpcomrrefsqgnaicg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0a2twY29tcnJlZnNxZ25haWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMzIzNzksImV4cCI6MjA2MjcwODM3OX0.3JYX3bnmzeDyJFKVIQkXdgabvi9DN_Tf-CvZdfBftIg';
const supabase = createClient(supabaseUrl, supabaseKey);

export {supabase};

// https://my-js.org/docs/guide/supabase/

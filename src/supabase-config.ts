import {createClient} from "@supabase/supabase-js";

const project_id = import.meta.env.VITE_PROJECT_ID;
const project_api = import.meta.env.VITE_PROJECT_API;
export const supabase=createClient(project_id,project_api);
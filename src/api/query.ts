import { supabase } from "@/lib/supabase";

export const getApplicationStats = {
  QUERY_KEY: "application-stats",
  QUERY_FN: async () => supabase.rpc("get_application_status_stats"),
};

export const getAllApplications = {
  QUERY_KEY: "job-application",
  QUERY_FN: (profileId: string, range: number[]) => async () => {
    return supabase
      .from("job_applications")
      .select("*")
      .eq("user_id", profileId)
      .range(range[0], range[1] - 1) // i have to do (-1) because supabase return 0-12 (13 items, 0 and 12 both are included)
      .order("created_at", { ascending: false });
  },
};

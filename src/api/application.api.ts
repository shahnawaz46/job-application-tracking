import { supabase } from "@/lib/supabase";
import { DATA_LIMIT } from "@/validation/constants";

// types/interface
import type {
  IJobApplication,
  IJobApplicationRes,
  IMonthlyApplicationStats,
} from "@/types/interface";
import type { TApplicationStats, TApplicationStatus } from "@/types/type";

export const getApplicationStats = {
  QUERY_KEY: "application-stats",
  QUERY_FN: async (): Promise<TApplicationStats> => {
    const { data, error } = await supabase.rpc("get_application_status_stats");

    if (error) {
      throw error;
    }

    return data[0];
  },
};

export const getMonthlyApplicationStats = {
  QUERY_KEY: "monthly-application-stats",
  QUERY_FN: async (year: number): Promise<IMonthlyApplicationStats[]> => {
    const { data, error } = await supabase.rpc(
      "get_monthly_application_stats",
      { selected_year: year },
    );

    if (error) {
      throw error;
    }

    return data;
  },
};

export const getAllApplications = {
  QUERY_KEY: "job-application",
  QUERY_FN: async (
    profileId: string,
    status: TApplicationStatus,
    pageParam: number,
  ): Promise<IJobApplicationRes[]> => {
    const from = pageParam * DATA_LIMIT;
    const to = from + DATA_LIMIT - 1; // i have to do (-1) because supabase return 0-12 (13 items, 0 and 12 both are included)

    if (!status || status === "applied") {
      const { data, error } = await supabase
        .from("job_applications")
        .select("*")
        .eq("user_id", profileId)
        .range(from, to)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    }

    const updatedStatus: TApplicationStatus[] =
      status === "telephonic interview"
        ? ["telephonic interview", "interview", "offer received", "rejected"]
        : status === "interview"
          ? ["interview", "offer received", "rejected"]
          : status === "offer received"
            ? ["offer received"]
            : ["rejected"];

    const { data, error } = await supabase
      .from("job_applications")
      .select("*")
      .eq("user_id", profileId)
      .in("application_status", updatedStatus)
      .range(from, to)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  },
};

export const deleteJobApplication = async (jobId: string) => {
  const { error } = await supabase
    .from("job_applications")
    .delete()
    .eq("id", jobId);

  if (error) {
    throw error;
  }
};

export const searchApplications = {
  QUERY_KEY: "search-applications",
  QUERY_FN: async (
    profileId: string,
    search: string,
    status: TApplicationStatus,
  ): Promise<IJobApplicationRes[]> => {
    const input = search
      .trim()
      .split(/\s+/)
      .map((word) => `${word}:*`)
      .join(" & ");

    if (!status || status === "applied") {
      const { data, error } = await supabase
        .from("job_applications")
        .select("*")
        .eq("user_id", profileId)
        .textSearch("search_text", input)
        .order("created_at", { ascending: false })
        .limit(16);

      if (error) {
        throw error;
      }

      return data;
    }

    const updatedStatus: TApplicationStatus[] =
      status === "telephonic interview"
        ? ["telephonic interview", "interview", "offer received", "rejected"]
        : status === "interview"
          ? ["interview", "offer received", "rejected"]
          : status === "offer received"
            ? ["offer received"]
            : ["rejected"];

    const { data, error } = await supabase
      .from("job_applications")
      .select("*")
      .eq("user_id", profileId)
      .textSearch("search_text", input)
      .in("application_status", updatedStatus)
      .order("created_at", { ascending: false })
      .limit(16);

    if (error) throw error;

    return data;
  },
};

export const addApplication = async (applicationData: IJobApplication) => {
  const { data: authDate } = await supabase.auth.getUser();

  const payload = {
    ...applicationData,
    job_location: applicationData.job_location || null,
    application_source: applicationData.application_source || null,
    salary_range: applicationData.salary_range || null,
  };

  const { error } = await supabase
    .from("job_applications")
    .insert({ user_id: authDate.user?.id, ...payload });

  if (error) {
    throw error;
  }
};

export const editApplication = async ({
  applicationData,
  jobId,
}: {
  applicationData: IJobApplication;
  jobId: string;
}) => {
  const payload = {
    ...applicationData,
    job_location: applicationData.job_location || null,
    application_source: applicationData.application_source || null,
    salary_range: applicationData.salary_range || null,
  };

  const { error } = await supabase
    .from("job_applications")
    .update({ ...payload })
    .eq("id", jobId);

  if (error) {
    throw error;
  }
};

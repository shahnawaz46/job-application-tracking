import { supabase } from "@/lib/supabase";

// types/interface
import type { IUserProfile } from "@/types/interface";
import type { IEditUserProfile } from "@/types/type";

export const getUserProfile = {
  QUERY_KEY: "profile",
  QUERY_FN: async (userId: string): Promise<IUserProfile> => {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  },
};

export const updateUserProfile = async ({
  values,
  profileId,
}: {
  values: IEditUserProfile;
  profileId: string;
}): Promise<IUserProfile> => {
  const { error, data } = await supabase
    .from("user_profiles")
    .update({ ...values })
    .eq("id", profileId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

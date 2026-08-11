import { getUserProfile } from "@/api/user.api";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";

// types/interface
import type { IUserProfile } from "@/types/interface";

export const useProfile = () => {
  const { session } = useAuthContext();
  const userId = session?.user.id;

  return useQuery<IUserProfile>({
    queryKey: [getUserProfile.QUERY_KEY, userId],
    queryFn: () => {
      if (!userId) {
        throw new Error("useProfile called without a valid userId");
      }
      return getUserProfile.QUERY_FN(userId);
    },
    enabled: !!userId,
  });
};

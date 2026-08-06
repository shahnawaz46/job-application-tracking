import { createContext, useContext } from "react";

// types/interfaces
import type { IUserProfile } from "@/types/interface";
import type { Session } from "@supabase/supabase-js";

export interface IAuthData {
  session: Session | null | undefined;
  profile: IUserProfile | null;
  updateProfileData: (newValue: any) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<IAuthData>({
  session: undefined,
  profile: null,
  updateProfileData: () => {},
  isLoading: true,
  isAuthenticated: false,
});

export const useAuthContext = () => useContext(AuthContext);

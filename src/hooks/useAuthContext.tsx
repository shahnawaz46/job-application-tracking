import { createContext, useContext } from "react";

// types/interfaces
import type { Session } from "@supabase/supabase-js";

export interface IAuthData {
  session: Session | null | undefined;
  profile: any | null;
  updateProfileData: (newValue: any) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  isRecoveringPassword: boolean;
}

export const AuthContext = createContext<IAuthData>({
  session: undefined,
  profile: undefined,
  updateProfileData: () => {},
  isLoading: true,
  isAuthenticated: false,
  isRecoveringPassword: false,
});

export const useAuthContext = () => useContext(AuthContext);

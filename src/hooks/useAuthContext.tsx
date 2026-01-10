import { createContext, useContext } from "react";

// types/interfaces
import type { Session } from "@supabase/supabase-js";

export interface IAuthData {
  session: Session | null | undefined;
  profile: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isRecoveringPassword: boolean;
}

export const AuthContext = createContext<IAuthData>({
  session: undefined,
  profile: undefined,
  isLoading: true,
  isAuthenticated: false,
  isRecoveringPassword: false,
});

export const useAuthContext = () => useContext(AuthContext);

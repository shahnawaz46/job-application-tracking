import { createContext, useContext } from "react";

// types/interfaces
import type { Session } from "@supabase/supabase-js";

export interface IAuthData {
  session: Session | null | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<IAuthData>({
  session: undefined,
  isLoading: true,
  isAuthenticated: false,
});

export const useAuthContext = () => useContext(AuthContext);

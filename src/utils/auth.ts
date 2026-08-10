import { jwtDecode } from "jwt-decode";

// types/interface
import type { JwtPayload } from "jwt-decode";

interface SupabaseJwtPayload extends JwtPayload {
  amr?: { method: string; timestamp: number }[];
}

export const isRecoverySession = (accessToken: string): boolean => {
  const decoded = jwtDecode<SupabaseJwtPayload>(accessToken);
  const amr = decoded.amr ?? [];
  const lastMethod = amr[amr.length - 1]?.method;

  return lastMethod === "otp";
};

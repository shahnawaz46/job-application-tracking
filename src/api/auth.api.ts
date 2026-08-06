import { supabase } from "@/lib/supabase";

// types/interface
import type { ISignIn, ISignUp, IVerifyOTP } from "@/types/interface";

export const signIn = async (userData: ISignIn) => {
  const { error } = await supabase.auth.signInWithPassword(userData);

  if (error) {
    throw error;
  }
};

export const signUp = async (userData: ISignUp): Promise<{ email: string }> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: { data: { full_name: userData.full_name } },
  });

  if (error) {
    throw error;
  }

  return { email: user?.email || user?.user_metadata?.email };
};

export const verifyAccount = async ({ otp, email, type }: IVerifyOTP) => {
  const { error } = await supabase.auth.verifyOtp({
    email: email,
    token: otp,
    type: type,
  });

  if (error) {
    throw error;
  }
};

export const resendOTP = async (email: string) => {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email,
  });

  if (error) {
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    throw error;
  }
};

export const updatePassword = async (password: string) => {
  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    throw error;
  }
};

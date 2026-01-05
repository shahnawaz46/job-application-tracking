import { AuthContext } from "@/hooks/useAuthContext";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

// types/interfaces
import type { Session } from "@supabase/supabase-js";
import type { PropsWithChildren } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | undefined | null>();
  const [profile, setProfile] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch the session once, and subscribe to auth state changes
  const fetchSession = async () => {
    setIsLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.log("Error while fetching session: ", error);
    }

    console.log("getSession: ", session);
    setSession(session);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", { event: _event, session });
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch the profile when the session changes
  const fetchProfile = async () => {
    if (session) {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single();

      console.log("fetchProfile: ", data);
      setProfile(data);
    } else {
      setProfile(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        profile,
        isAuthenticated: session != undefined,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

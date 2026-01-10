import { AuthContext } from "@/hooks/useAuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

// types/interfaces
import type { Session } from "@supabase/supabase-js";
import type { PropsWithChildren } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);

  // initial session fetch and subscribe to auth state changes
  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.log("getSession Error: ", error);
      console.log("getSession Data: ", data);
      if (!error) setSession(data.session);
      setIsLoading(false);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event, session);
      setSession(session);

      // handle password recovery session(forgot password)
      // if a recovery session exists, allow access to update-password flow only
      if (session && session.user.recovery_sent_at) {
        setIsRecoveringPassword(true);
      }

      // handle sign-out (manual or forced)
      // this also covers expired/invalid recovery links where we explicitly sign out
      if (event === "SIGNED_OUT") {
        console.log("SIGNED_OUT");
        setIsRecoveringPassword(false);
        router.replace("/(auth)/signin");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // fetch profile
  useEffect(() => {
    if (!session) {
      setProfile(null);
      return;
    }

    supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id)
      .single()
      .then(({ data }) => setProfile(data));
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        session,
        profile,
        isLoading,
        isAuthenticated: !!session,
        isRecoveringPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

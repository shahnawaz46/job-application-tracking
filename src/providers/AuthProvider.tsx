import { AuthContext } from "@/hooks/useAuthContext";
import useNetworkInfo from "@/hooks/useNetworkInfo";
import { supabase } from "@/lib/supabase";
import { isRecoverySession } from "@/utils/auth";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

// types/interfaces
import type { IUserProfile } from "@/types/interface";
import type { Session } from "@supabase/supabase-js";
import type { PropsWithChildren } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isOnline } = useNetworkInfo();

  // initial session fetch and subscribe to auth state changes
  useEffect(() => {
    let initialCheckDone: boolean = false;
    // runs the recovery check against a session
    // called for both direct getSession() call and the onAuthStateChange(INITIAL_SESSION) event
    const resolveInitialSession = async (session: Session | null) => {
      if (initialCheckDone) return; // don't double-process if both paths fire
      initialCheckDone = true;

      // when user reopened the app with a leftover recovery session
      // (they verified OTP earlier but closed the app before setting a new password)
      //
      // this check only runs on "INITIAL_SESSION" event when Supabase restores a saved session on app start
      // so this only catches the specific case: app was closed mid-recovery,
      // then reopened, without the password ever being updated
      if (session && isRecoverySession(session.access_token)) {
        // kill stale recovery session and send them back to sign in and user have to restart "forgot password" again
        // this keeps the flow simple and avoids trusting an old, unused recovery token
        await supabase.auth.signOut();
        setSession(null);
      } else {
        setSession(session);
      }

      setIsLoading(false);
    };

    const init = async () => {
      const { data, error } = await supabase.auth.getSession();
      // console.log("getSession: ", { data, error });
      if (!error) resolveInitialSession(data.session);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // console.log("Auth event:", event);

      if (event === "INITIAL_SESSION") {
        await resolveInitialSession(session);
        return;
      }

      // all events AFTER initial load handled normally
      setSession(session);

      // user verified OTP for password recovery, supabase fires this event after verifyOtp() succeeds
      // then redirecting user to the update-password screen
      if (event === "PASSWORD_RECOVERY") {
        router.replace("/(protected)/update-password");
        return;
      }

      // user signed out
      if (event === "SIGNED_OUT") {
        router.replace("/(auth)/signin");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // fetch profile whenever session changes
  useEffect(() => {
    // no internet then skip fetching
    if (!isOnline) return;

    if (!session) {
      setProfile(null);
      return;
    }

    if (!profile) {
      supabase
        .from("user_profiles")
        .select("*")
        .eq("id", session.user.id)
        .single()
        .then(({ data }) => {
          setProfile(data);
        });
    }
  }, [session, isOnline]);

  // called after a successful profile update (e.g. edit profile screen)
  // so the rest of the app immediately sees the new data without refetching
  const updateProfileData = (newValue: IUserProfile) => {
    setProfile(newValue);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        profile,
        isLoading,
        isAuthenticated: !!session,
        updateProfileData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

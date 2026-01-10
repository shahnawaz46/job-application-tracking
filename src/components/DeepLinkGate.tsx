import { supabase } from "@/lib/supabase";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";
import { useEffect, useRef } from "react";

// types/interfaces
import type { PropsWithChildren } from "react";

const DeepLinkGate = ({ children }: PropsWithChildren) => {
  const handled = useRef(false);

  useEffect(() => {
    const handle = async (url: string) => {
      if (handled.current) return;
      handled.current = true;

      const { params } = QueryParams.getQueryParams(url);
      if (!params) return;

      console.log("URL: ", url);

      if (params.error || params.error_code) {
        await supabase.auth.signOut();
      }

      if (params.type === "recovery") {
        await supabase.auth.setSession({
          access_token: params.access_token,
          refresh_token: params.refresh_token,
        });
      }
    };

    Linking.getInitialURL().then((url) => {
      if (url) handle(url);
    });

    const sub = Linking.addEventListener("url", (e) => handle(e.url));
    return () => sub.remove();
  }, []);

  return children;
};

export default DeepLinkGate;

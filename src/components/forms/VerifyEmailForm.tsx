import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import useAsyncAction from "@/hooks/useAsyncAction";
import useCountdown from "@/hooks/useCountdown";
import { supabase } from "@/lib/supabase";
import { otpSchema } from "@/validation/auth.yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import ReactHookFormError from "./../fallback/ReactHookFormError";
import ButtonLoading from "./../loaders/ButtonLoading";
import { ToastMessage } from "./../Toast";

const RESEND_CODE_INTERVAL_SECONDS = 30;

const VerifyEmailForm = () => {
  const { countdown, restartCountdown } = useCountdown({
    seconds: RESEND_CODE_INTERVAL_SECONDS,
  });
  const { isPending, execute } = useAsyncAction();
  const { email } = useLocalSearchParams<{ email: string }>();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { otp: undefined },
    resolver: yupResolver(otpSchema),
  });

  const onSubmit = ({ otp }: { otp: string }) => {
    if (!email) {
      ToastMessage({
        type: "error",
        text1: "Something went wrong please create account again",
      });

      return;
    }

    execute(async () => {
      const { error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: "email",
      });

      if (error) {
        ToastMessage({
          type: "error",
          text1: error?.message || "Otp verification failed",
        });
        return;
      }

      router.push("/(tabs)");
    });
  };

  return (
    <View className="gap-6 flex-1 justify-center">
      <Card className="border-border/0  pb-4 shadow-none">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Verify your email
          </CardTitle>
          <CardDescription className="text-center">
            Enter the verification code sent to {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="code">Verification code</Label>

              <Controller
                control={control}
                name="otp"
                render={({ field: { value, onChange } }) => (
                  <Input
                    id="code"
                    autoCapitalize="none"
                    returnKeyType="send"
                    keyboardType="numeric"
                    autoComplete="sms-otp"
                    textContentType="oneTimeCode"
                    maxLength={6}
                    value={value}
                    onChangeText={onChange}
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                )}
              />

              <ReactHookFormError errorMessage={errors?.otp?.message} />

              <Button
                variant="link"
                size="xs"
                disabled={countdown > 0}
                onPress={() => {
                  restartCountdown();
                  console.log("clicked");
                }}
              >
                <Text className="text-center">
                  Didn&apos;t receive the code? Resend{" "}
                  {countdown > 0 ? <Text>({countdown})</Text> : null}
                </Text>
              </Button>
            </View>
            <View className="gap-3">
              <Button
                className="w-full"
                onPress={handleSubmit(onSubmit)}
                disabled={isPending}
              >
                {isPending ? (
                  <ButtonLoading text="Verifying..." />
                ) : (
                  <Text>Continue</Text>
                )}
              </Button>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
};

export default VerifyEmailForm;

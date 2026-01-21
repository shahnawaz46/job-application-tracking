import { ToastMessage } from "@/components/Toast";
import ReactHookFormError from "@/components/fallback/ReactHookFormError";
import ButtonLoading from "@/components/loaders/ButtonLoading";
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
import FormWrapper from "@/components/wrapper/FormWrapper";
import PageWrapper from "@/components/wrapper/PageWrapper";
import useAsyncAction from "@/hooks/useAsyncAction";
import useCountdown from "@/hooks/useCountdown";
import { supabase } from "@/lib/supabase";
import { otpSchema } from "@/validation/auth.yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";

const VerifyEmail = () => {
  const resendOtpRef = useRef(30);
  const { countdown, restartCountdown } = useCountdown({
    seconds: resendOtpRef.current,
  });
  const { isPending, execute } = useAsyncAction();
  const { isPending: isOTPPending, execute: otpExecute } = useAsyncAction();
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

  const resendOTP = () => {
    otpExecute(async () => {
      const { error, data } = await supabase.auth.resend({
        type: "signup",
        email: email,
      });

      if (error) {
        ToastMessage({
          type: "error",
          text1:
            error?.message ||
            "We couldn't resend the verification code right now. Please try again shortly.",
        });
        return;
      }

      ToastMessage({
        type: "success",
        text1:
          "We've sent you a new verification code. Please check your email.",
      });

      resendOtpRef.current *= 3;
      restartCountdown(resendOtpRef.current);
    });
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <Card className="border-border/0 pb-4 shadow-none">
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
                  disabled={countdown > 0 || isOTPPending}
                  onPress={resendOTP}
                >
                  {isOTPPending ? (
                    <Text className="text-center">
                      Resending verification code...
                    </Text>
                  ) : (
                    <Text className="text-center">
                      Didn&apos;t receive the code? Resend{" "}
                      {countdown > 0 ? <Text>({countdown})</Text> : null}
                    </Text>
                  )}
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

            {/* text for navigation */}
            <View className="text-center flex-row justify-center items-center">
              <Text variant={"small"}>Already have an account? </Text>
              <Pressable
                className="items-center"
                onPress={() => router.push("/signin")}
              >
                <Text
                  variant={"small"}
                  className="underline underline-offset-4"
                >
                  Sign in
                </Text>
              </Pressable>
            </View>
          </CardContent>
        </Card>
      </FormWrapper>
    </PageWrapper>
  );
};

export default VerifyEmail;

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
import { supabase } from "@/lib/supabase";
import {
  forgotPasswordInitialState,
  forgotPasswordSchema,
} from "@/validation/auth.yup";
import { EMAIL_REGEX } from "@/validation/regex";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import ReactHookFormError from "./../fallback/ReactHookFormError";
import ButtonLoading from "./../loaders/ButtonLoading";
import { ToastMessage } from "./../Toast";

// types/interfaces
import type { IForgotPasswordState } from "@/validation/auth.yup";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const { isPending: isOtpPending, execute: otpExecute } = useAsyncAction();
  const { isPending, execute } = useAsyncAction();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: forgotPasswordInitialState,
    resolver: yupResolver(forgotPasswordSchema),
  });

  const handleOTP = () => {
    otpExecute(async () => {
      const email = getValues("email");

      if (!email) {
        setError("email", { message: "Email is required" });
        return;
      }

      if (!EMAIL_REGEX.test(email)) {
        setError("email", { message: "Please provide a valid email address" });
        return;
      }

      clearErrors("email");
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        ToastMessage({
          type: "error",
          text1: error?.message || "Something went wrong. Please try again",
        });
        return;
      }

      ToastMessage({
        type: "success",
        text1:
          "We've sent a verification code to your email. Please check your inbox",
      });
    });
  };

  const onSubmit = ({ email, otp }: IForgotPasswordState) => {
    execute(async () => {
      const { error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: "recovery",
      });

      if (error) {
        ToastMessage({
          type: "error",
          text1: error?.message || "Something went wrong. Please try again",
        });
      }

      router.replace("/update-password");
    });
  };

  return (
    <View className="gap-6 flex-1 justify-center">
      <Card className="border-border/0 shadow-none">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Forgot your password?
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we'll send you a one-time code to reset
            your password
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          {/* form */}

          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange } }) => (
                  <Input
                    id="email"
                    placeholder="m@example.com"
                    keyboardType="email-address"
                    autoComplete="email"
                    autoCapitalize="none"
                    returnKeyType="send"
                    onSubmitEditing={handleOTP}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />

              <ReactHookFormError errorMessage={errors?.email?.message} />
            </View>

            <Button
              className="w-full"
              onPress={handleOTP}
              disabled={isOtpPending}
            >
              {isOtpPending ? (
                <ButtonLoading text="Sending code..." />
              ) : (
                <Text>Send reset code</Text>
              )}
            </Button>

            <View className="gap-1.5">
              <Label htmlFor="code">Enter verification code</Label>

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
            </View>

            <Button
              className="w-full"
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
            >
              {isPending ? (
                <ButtonLoading text="Verifying..." />
              ) : (
                <Text>Verify code</Text>
              )}
            </Button>
          </View>

          {/* text for navigation */}
          <View className="text-center flex-row justify-center items-center">
            <Text variant={"small"}>Already have an account? </Text>
            <Pressable
              className="items-center"
              onPress={() => router.push("/signin")}
            >
              <Text variant={"small"} className="underline underline-offset-4">
                Sign in
              </Text>
            </Pressable>
          </View>
        </CardContent>
      </Card>
    </View>
  );
};

export default ForgotPasswordForm;

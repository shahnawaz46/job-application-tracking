import { resetPassword, verifyAccount } from "@/api/auth.api";
import ReactHookFormError from "@/components/fallback/ReactHookFormError";
import ButtonLoading from "@/components/loaders/ButtonLoading";
import { ToastMessage } from "@/components/Toast";
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
import { forgotPasswordSchema } from "@/validation/auth.yup";
import { EMAIL_REGEX } from "@/validation/regex";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";

// types/interfaces
import type { IForgotPasswordState } from "@/types/interface";

export const forgotPasswordInitialState: IForgotPasswordState = {
  email: "",
  otp: "",
};

const ForgotPassword = () => {
  const router = useRouter();

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

  const { mutate: resetPasswordMutate, isPending: isResetPasswordPending } =
    useMutation({
      mutationFn: resetPassword,
      onSuccess: () => {
        ToastMessage({
          type: "success",
          text1:
            "We've sent a verification code to your email. Please check your inbox",
        });
      },
      onError: (error) => {
        ToastMessage({
          type: "error",
          text1: error?.message || "Something went wrong. Please try again",
        });
      },
    });

  // reset password otp handler (pre-mutation validation)
  const handleOTP = () => {
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

    resetPasswordMutate(email);
  };

  const { mutate: verifyAccountMutate, isPending: isVerifyAccountPending } =
    useMutation({
      mutationFn: verifyAccount,
      onSuccess: () => {
        router.replace("/(protected)/update-password");
      },
      onError: (error) => {
        ToastMessage({
          type: "error",
          text1: error?.message || "Something went wrong. Please try again",
        });
      },
    });

  return (
    <PageWrapper>
      <FormWrapper>
        <Card className="border-0 shadow-none bg-background">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Forgot your password?
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you a one-time code to
              reset your password
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-6">
            {/* form */}

            <View className="gap-6">
              {/* resent password input */}
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
                disabled={isResetPasswordPending}
              >
                {isResetPasswordPending ? (
                  <ButtonLoading text="Sending code..." />
                ) : (
                  <Text>Send reset code</Text>
                )}
              </Button>

              {/* verification otp input */}
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
                      onSubmitEditing={handleSubmit((data) =>
                        verifyAccountMutate({ ...data, type: "recovery" }),
                      )}
                    />
                  )}
                />

                <ReactHookFormError errorMessage={errors?.otp?.message} />
              </View>

              <Button
                className="w-full"
                onPress={handleSubmit((data) =>
                  verifyAccountMutate({ ...data, type: "recovery" }),
                )}
                disabled={isVerifyAccountPending}
              >
                {isVerifyAccountPending ? (
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

export default ForgotPassword;

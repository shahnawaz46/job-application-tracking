import ReactHookFormError from "@/components/fallback/ReactHookFormError";
import ButtonLoading from "@/components/loaders/ButtonLoading";
import { SocialConnections } from "@/components/social-signin/SocialConnections";
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
import { InputWithIcon } from "@/components/ui/inputwithicon";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import FormWrapper from "@/components/wrapper/FormWrapper";
import PageWrapper from "@/components/wrapper/PageWrapper";
import useAsyncAction from "@/hooks/useAsyncAction";
import { supabase } from "@/lib/supabase";
import { signUpInitialState, signUpSchema } from "@/validation/auth.yup";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";

// types/interfaces
import type { ISignUp } from "@/validation/auth.yup";
import type { TextInput } from "react-native";

const Signup = () => {
  const router = useRouter();
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const { isPending, execute } = useAsyncAction();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: signUpInitialState,
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (userData: ISignUp) => {
    execute(async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: { data: { full_name: userData.full_name } },
      });

      if (error) {
        ToastMessage({
          type: "error",
          text1:
            error?.message ||
            "Signup failed, please try again after some time!",
        });
        return;
      }

      ToastMessage({
        type: "success",
        text1:
          "If no account exists for this email, you'll receive a verification code shortly.",
      });
      router.push({
        pathname: "/(auth)/verify-email",
        params: { email: user?.user_metadata?.email || userData.email },
      });
    });
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <Card className="border-border/0 shadow-none bg-background">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Create your account
            </CardTitle>
            <CardDescription className="text-center">
              Welcome! Please fill in the details to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-4">
            {/* Signup form */}
            <View className="gap-4">
              <View className="gap-1.5">
                <Label htmlFor="full_name">Full Name</Label>
                <Controller
                  control={control}
                  name="full_name"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      id="full_name"
                      placeholder="Your Name"
                      autoCapitalize="words"
                      returnKeyType="next"
                      submitBehavior="submit"
                      onSubmitEditing={() => emailInputRef.current?.focus()}
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />

                <ReactHookFormError errorMessage={errors?.full_name?.message} />
              </View>

              <View className="gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      ref={emailInputRef}
                      id="email"
                      placeholder="m@example.com"
                      keyboardType="email-address"
                      autoComplete="email"
                      autoCapitalize="none"
                      returnKeyType="next"
                      submitBehavior="submit"
                      onSubmitEditing={() => passwordInputRef.current?.focus()}
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />

                <ReactHookFormError errorMessage={errors?.email?.message} />
              </View>

              <View className="gap-1.5">
                <View className="flex-row items-center">
                  <Label htmlFor="password">Password</Label>
                </View>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      ref={passwordInputRef}
                      id="password"
                      secureTextEntry={!showPassword}
                      returnKeyType="next"
                      submitBehavior="submit"
                      onSubmitEditing={() =>
                        confirmPasswordInputRef.current?.focus()
                      }
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />

                <ReactHookFormError errorMessage={errors?.password?.message} />
              </View>

              <View className="gap-1.5">
                <View className="flex-row items-center">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                </View>
                <Controller
                  control={control}
                  name="confirm_password"
                  render={({ field: { value, onChange } }) => (
                    <InputWithIcon
                      ref={confirmPasswordInputRef}
                      id="confirm_password"
                      secureTextEntry={!showPassword}
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit(onSubmit)}
                      value={value}
                      onChangeText={onChange}
                      rightIcon={
                        <Ionicons
                          name={showPassword ? "eye-off" : "eye"}
                          size={18}
                        />
                      }
                      onRightIconPress={() => setShowPassword((prev) => !prev)}
                    />
                  )}
                />

                <ReactHookFormError
                  errorMessage={errors?.confirm_password?.message}
                />
              </View>
              <Button
                className="w-full"
                onPress={handleSubmit(onSubmit)}
                disabled={isPending}
              >
                {isPending ? (
                  <ButtonLoading text="Creating account..." />
                ) : (
                  <Text>Continue</Text>
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

            {/* or separator */}
            <View className="flex-row items-center">
              <Separator className="flex-1" />
              <Text variant={"small"} className="text-muted-foreground px-4">
                or
              </Text>
              <Separator className="flex-1" />
            </View>

            {/* social logins */}
            <SocialConnections />
          </CardContent>
        </Card>
      </FormWrapper>
    </PageWrapper>
  );
};

export default Signup;

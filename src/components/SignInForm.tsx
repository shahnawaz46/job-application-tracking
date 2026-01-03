import { SocialConnections } from "@/components/SocialConnections";
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
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import {
  authSchema,
  type IInitialState,
  initialState,
} from "@/validation/auth.yup";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, type TextInput, View } from "react-native";
import ReactHookFormError from "./fallback/ReactHookFormError";
import { InputWithIcon } from "./ui/inputwithicon";

const SignInForm = () => {
  const passwordInputRef = useRef<TextInput>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
    resolver: yupResolver(authSchema),
  });

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  const onSubmit = async (data: IInitialState) => {
    console.log("Sign in onSubmit data: ", data);
  };

  return (
    <View className="gap-6 flex-1 justify-center">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">
            Sign in to your app
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          {/* Signin form */}

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
                    onSubmitEditing={onEmailSubmitEditing}
                    returnKeyType="next"
                    submitBehavior="submit"
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
                <Button
                  variant="link"
                  size="sm"
                  className="web:h-fit ml-auto h-4 px-1 py-0 sm:h-4"
                  onPress={() => {
                    console.log("redirect to forgot password screen");
                    // TODO: Navigate to forgot password screen
                  }}
                >
                  <Text className="font-normal leading-4 text-xs">
                    Forgot your password?
                  </Text>
                </Button>
              </View>

              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange } }) => (
                  <InputWithIcon
                    ref={passwordInputRef}
                    id="password"
                    secureTextEntry={!showPassword}
                    returnKeyType="send"
                    value={value}
                    onChangeText={onChange}
                    onSubmitEditing={handleSubmit(onSubmit)}
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

              <ReactHookFormError errorMessage={errors?.password?.message} />
            </View>
            <Button className="w-full" onPress={handleSubmit(onSubmit)}>
              <Text>Continue</Text>
            </Button>
          </View>

          {/* text for navigation */}
          <View className="text-center flex-row justify-center items-center">
            <Text className="text-sm">Don&apos;t have an account? </Text>
            <Pressable
              className="items-center"
              onPress={() => router.push("/signup")}
            >
              <Text className="text-sm underline underline-offset-4">
                Sign up
              </Text>
            </Pressable>
          </View>

          {/* or separator */}
          <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="text-muted-foreground px-4 text-sm">or</Text>
            <Separator className="flex-1" />
          </View>

          {/* social logins */}
          <SocialConnections />
        </CardContent>
      </Card>
    </View>
  );
};

export default SignInForm;

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
import useAsyncAction from "@/hooks/useAsyncAction";
import {
  type IInitialState,
  initialState,
  signUpSchema,
} from "@/validation/auth.yup";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, type TextInput, View } from "react-native";
import ReactHookFormError from "./fallback/ReactHookFormError";
import ButtonLoading from "./loaders/ButtonLoading";
import { InputWithIcon } from "./ui/inputwithicon";

const SignUpForm = () => {
  const router = useRouter();
  const passwordInputRef = useRef<TextInput>(null);
  const { isPending, execute } = useAsyncAction();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialState,
    resolver: yupResolver(signUpSchema),
  });

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  const onSubmit = (userData: IInitialState) => {
    execute(async () => {
      // console.log("user", data);
      await new Promise((resolve, reject) =>
        setTimeout(() => resolve("done"), 3000)
      );
      router.push({
        pathname: "/(auth)/verify-email",
        params: { email: userData.email, id: "adasdr" },
      });
    });
  };

  return (
    <View className="gap-6 flex-1 justify-center">
      <Card className="border-border/0 shadow-none">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Create your account
          </CardTitle>
          <CardDescription className="text-center">
            Welcome! Please fill in the details to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          {/* Signup form */}
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
            <Text className="text-sm">Already have an account? </Text>
            <Pressable
              className="items-center"
              onPress={() => router.push("/signin")}
            >
              <Text className="text-sm underline underline-offset-4">
                Sign in
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

export default SignUpForm;

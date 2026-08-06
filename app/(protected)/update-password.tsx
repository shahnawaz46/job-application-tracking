import { updatePassword } from "@/api/auth.api";
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
import { InputWithIcon } from "@/components/ui/inputwithicon";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import FormWrapper from "@/components/wrapper/FormWrapper";
import PageWrapper from "@/components/wrapper/PageWrapper";
import { supabase } from "@/lib/supabase";
import { updatePasswordSchema } from "@/validation/auth.yup";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

// types/interfaces
import type { IUpdatePassword } from "@/types/interface";
import type { TextInput } from "react-native";

export const updatePasswordInitialState: IUpdatePassword = {
  newPassword: "",
  confirmPassword: "",
};

const UpdatePassword = () => {
  const router = useRouter();
  const passwordInputRef = useRef<TextInput>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: updatePasswordInitialState,
    resolver: yupResolver(updatePasswordSchema),
  });

  const onPasswordSubmit = () => {
    passwordInputRef.current?.focus();
  };

  const { mutate: updatePasswordMutate, isPending } = useMutation({
    mutationFn: updatePassword,
    onSuccess: async () => {
      ToastMessage({
        type: "success",
        text1: "Your password has been updated. Please sign in again.",
      });
      await supabase.auth.signOut();

      router.replace("/(auth)/signin");
    },
    onError: (error) => {
      ToastMessage({
        type: "error",
        text1: error.message || "Unable to update password. Try again.",
      });

      router.replace("/(auth)/signin");
    },
  });

  return (
    <PageWrapper>
      <FormWrapper>
        <Card className="border-0 shadow-none bg-background">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Update your password
            </CardTitle>
            <CardDescription className="text-center">
              Choose a new password for your account. Make sure it's strong and
              secure
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-6">
            <View className="gap-6">
              <View className="gap-1.5">
                <View className="flex-row items-center">
                  <Label htmlFor="password">New password</Label>
                </View>
                <Controller
                  control={control}
                  name="newPassword"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      id="password"
                      secureTextEntry={!showPassword}
                      returnKeyType="next"
                      submitBehavior="submit"
                      onSubmitEditing={onPasswordSubmit}
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />

                <ReactHookFormError
                  errorMessage={errors.newPassword?.message}
                />
              </View>
              <View className="gap-1.5">
                <Label htmlFor="c-password">Confirm new password</Label>

                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { value, onChange } }) => (
                    <InputWithIcon
                      ref={passwordInputRef}
                      id="c-password"
                      secureTextEntry={!showPassword}
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit((data) =>
                        updatePasswordMutate(data.confirmPassword),
                      )}
                      rightIcon={
                        <Ionicons
                          name={showPassword ? "eye-off" : "eye"}
                          size={18}
                        />
                      }
                      onRightIconPress={() => setShowPassword((prev) => !prev)}
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />

                <ReactHookFormError
                  errorMessage={errors.confirmPassword?.message}
                />
              </View>
              <Button
                className="w-full"
                onPress={handleSubmit((data) =>
                  updatePasswordMutate(data.confirmPassword),
                )}
                disabled={isPending}
              >
                {isPending ? (
                  <ButtonLoading text="Updating..." />
                ) : (
                  <Text className="text-white">Update password</Text>
                )}
              </Button>
            </View>
          </CardContent>
        </Card>
      </FormWrapper>
    </PageWrapper>
  );
};

export default UpdatePassword;

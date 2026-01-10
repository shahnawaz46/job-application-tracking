import useAsyncAction from "@/hooks/useAsyncAction";
import { supabase } from "@/lib/supabase";
import {
  updatePasswordInitialState,
  updatePasswordSchema,
} from "@/validation/auth.yup";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import ReactHookFormError from "./fallback/ReactHookFormError";
import ButtonLoading from "./loaders/ButtonLoading";
import { ToastMessage } from "./Toast";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { InputWithIcon } from "./ui/inputwithicon";
import { Label } from "./ui/label";

// types/interfaces
import type { IUpdatePassword } from "@/validation/auth.yup";
import type { TextInput } from "react-native";

const UpdatePasswordForm = () => {
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
  const { isPending, execute } = useAsyncAction();

  const onPasswordSubmit = () => {
    passwordInputRef.current?.focus();
  };

  const onSubmit = ({ newPassword }: IUpdatePassword) => {
    execute(async () => {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        ToastMessage({
          type: "error",
          text1: error.message || "Unable to update password. Try again.",
        });
      }

      if (!error) {
        ToastMessage({
          type: "success",
          text1: "Your password has been updated. Please sign in again.",
        });
        await supabase.auth.signOut();
      }

      router.replace("/(auth)/signin");
    });
  };

  return (
    <View className="gap-6 flex-1 justify-center">
      <Card className="border-border/0 shadow-none">
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

              <ReactHookFormError errorMessage={errors.newPassword?.message} />
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
                    onSubmitEditing={handleSubmit(onSubmit)}
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
              onPress={handleSubmit(onSubmit)}
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
    </View>
  );
};

export default UpdatePasswordForm;

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
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, type TextInput, View } from "react-native";
import { InputWithIcon } from "./ui/inputwithicon";

const SignUpForm = () => {
  const passwordInputRef = useRef<TextInput>(null);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  function onSubmit() {
    console.log(email, password);
    // TODO: Submit form and navigate to protected screen if successful
  }

  return (
    <View className="gap-6 flex-1 justify-center">
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">
            Create your account
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            Welcome! Please fill in the details to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          {/* login form */}
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                onSubmitEditing={onEmailSubmitEditing}
                returnKeyType="next"
                submitBehavior="submit"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Password</Label>
              </View>

              <InputWithIcon
                ref={passwordInputRef}
                id="password"
                secureTextEntry={!showPassword}
                returnKeyType="send"
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={onSubmit}
                rightIcon={
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={18} />
                }
                onRightIconPress={() => setShowPassword((prev) => !prev)}
              />
            </View>
            <Button className="w-full" onPress={onSubmit}>
              <Text>Continue</Text>
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

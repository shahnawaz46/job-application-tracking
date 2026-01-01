import CustomStatusBar from "@/components/CustomStatusBar";
import { SignInForm } from "@/components/SignInForm";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <CustomStatusBar style="dark" />
      <SignInForm />
    </SafeAreaView>
  );
};

export default Login;

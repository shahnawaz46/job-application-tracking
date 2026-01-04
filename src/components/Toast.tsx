import Toast, {
  BaseToast,
  type ToastProps,
  type ToastType,
} from "react-native-toast-message";

const CustomBaseToast = ({
  props,
  color,
}: {
  props: ToastProps;
  color: string;
}) => {
  return (
    <BaseToast
      {...props}
      style={{ borderLeftColor: color }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: "600",
      }}
      text2Style={{
        fontSize: 12,
        color: "#444",
      }}
      text1NumberOfLines={3}
      text2NumberOfLines={3}
    />
  );
};

const toastConfig = {
  success: (props: ToastProps) => (
    <CustomBaseToast props={props} color="#16a34a" />
  ), // green
  error: (props: ToastProps) => (
    <CustomBaseToast props={props} color="#dc2626" />
  ), // red
  info: (props: ToastProps) => (
    <CustomBaseToast props={props} color="#2563eb" />
  ), // blue
};

const ToastSetup = () => {
  return <Toast position="top" config={toastConfig} />;
};

export default ToastSetup;

export const ToastMessage = ({
  type = "success",
  text1,
  text2,
  topOffset = 50,
}: {
  type?: ToastType;
  text1: string;
  text2?: string;
  topOffset?: number;
}) => {
  return Toast.show({ type, text1, text2, topOffset });
};

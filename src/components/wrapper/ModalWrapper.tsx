import { cn } from "@/lib/utils";
import { View } from "react-native";

// types/interface
import type { PropsWithChildren } from "react";

interface IModalWrapperProps extends PropsWithChildren {
  containerClassName?: string;
}

const ModalWrapper = ({ containerClassName, children }: IModalWrapperProps) => {
  return (
    <View className="absolute inset-0 bg-black/50 items-center justify-center z-50">
      <View
        className={cn(
          "bg-white rounded-2xl p-6 mx-6 border border-border",
          containerClassName,
        )}
      >
        {children}
      </View>
    </View>
  );
};

export default ModalWrapper;

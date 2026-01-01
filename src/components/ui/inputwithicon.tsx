import { cn } from "@/lib/utils";
import React from "react";
import {
  Platform,
  Pressable,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

type TInputWithIconProps = TextInputProps &
  React.RefAttributes<TextInput> & {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onLeftIconPress?: () => void;
    onRightIconPress?: () => void;
  };

const InputWithIcon = ({
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  className,
  ...props
}: TInputWithIconProps) => {
  return (
    <View
      className={cn(
        "dark:bg-input/30 border-input bg-background flex h-10 w-full min-w-0 flex-row items-center rounded-md border shadow-sm shadow-black/5 sm:h-9",
        props.editable === false && "opacity-50",
        Platform.select({
          web: cn(
            "transition-[color,box-shadow]",
            "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
            "has-[:invalid]:ring-destructive/20 dark:has-[:invalid]:ring-destructive/40 has-[:invalid]:border-destructive"
          ),
        })
      )}
    >
      {leftIcon && (
        <Pressable
          onPress={onLeftIconPress}
          className="pl-3"
          style={{ pointerEvents: onLeftIconPress ? "auto" : "none" }}
        >
          {leftIcon}
        </Pressable>
      )}

      <TextInput
        className={cn(
          "text-foreground flex-1 px-3 py-1 text-base leading-5",
          !leftIcon && "pl-3",
          !rightIcon && "pr-3",
          Platform.select({
            web: cn(
              "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground outline-none md:text-sm"
            ),
            native: "placeholder:text-muted-foreground/50",
          }),
          className
        )}
        {...props}
      />

      {rightIcon && (
        <Pressable
          onPress={onRightIconPress}
          className="pr-3"
          style={{ pointerEvents: onRightIconPress ? "auto" : "none" }}
        >
          {rightIcon}
        </Pressable>
      )}
    </View>
  );
};

export { InputWithIcon };

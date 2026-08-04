import { cn } from "@/lib/utils";
import React from "react";
import {
  Platform,
  Pressable,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";
import { Text } from "./text";

interface IInputCustomProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  asText?: boolean;
  onPress?: () => void;
}

const InputWithIcon = ({
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  asText = false,
  onPress,
  className,
  ...props
}: TextInputProps & React.RefAttributes<TextInput> & IInputCustomProps) => {
  const Wrapper = asText ? Pressable : View;

  return (
    <Wrapper
      onPress={asText ? onPress : undefined}
      className={cn(
        "flex h-11 w-full min-w-0 flex-row items-center rounded-md border border-border bg-input",
        props.editable === false && "opacity-50",
        Platform.select({
          web: cn(
            "transition-colors duration-200",
            "has-[:invalid]:border-destructive",
            "has-[:invalid]:ring-2",
            "has-[:invalid]:ring-destructive/20",
          ),
        }),
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

      {!asText ? (
        <TextInput
          className={cn(
            "flex-1 text-sm text-foreground px-3",
            Platform.select({
              web: cn(
                "outline-none",
                "placeholder:text-muted-foreground",
                "selection:bg-primary",
                "selection:text-primary-foreground",
                "md:text-sm",
              ),
              native: "placeholder:text-muted-foreground",
            }),
            className,
          )}
          {...props}
        />
      ) : (
        <Text
          className={cn(
            "flex-1 text-sm text-foreground px-3",
            !props.value && "text-muted-foreground",
            className,
          )}
        >
          {props.value || props.placeholder}
        </Text>
      )}

      {rightIcon && (
        <Pressable
          onPress={onRightIconPress}
          className="pr-3"
          style={{ pointerEvents: onRightIconPress ? "auto" : "none" }}
        >
          {rightIcon}
        </Pressable>
      )}
    </Wrapper>
  );
};

export { InputWithIcon };

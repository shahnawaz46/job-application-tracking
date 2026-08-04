import { cn } from "@/lib/utils";
import { Platform, Pressable, TextInput, View } from "react-native";
import { Text } from "./text";

// types/interfaces
import type { TextInputProps } from "react-native";

interface IInputCustomProps {
  containerClassName?: string;
  asText?: boolean;
  onPress?: () => void;
}

function Input({
  containerClassName,
  className,
  asText = false,
  onPress,
  ...props
}: TextInputProps & React.RefAttributes<TextInput> & IInputCustomProps) {
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
        containerClassName,
      )}
    >
      {!asText ? (
        <TextInput
          className={cn(
            "flex-1 px-3 text-sm text-foreground",
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
            "flex-1 px-3 text-sm text-foreground",
            !props.value && "text-muted-foreground",
            className,
          )}
        >
          {props.value || props.placeholder}
        </Text>
      )}
    </Wrapper>
  );
}

export { Input };

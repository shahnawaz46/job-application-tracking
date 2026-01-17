import { cn } from "@/lib/utils";
import {
  Platform,
  Pressable,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";
import { Text } from "./text";

interface IInputCustomProps {
  asText?: boolean;
  onPress?: () => void;
}

function Input({
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
      {!asText ? (
        <TextInput
          className={cn(
            "text-foreground flex-1 px-3 py-1 text-base leading-5",
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
      ) : (
        <Text
          className={cn(
            "text-foreground flex-1 px-3 py-1 text-base leading-5",
            !props.value && "text-muted-foreground/50",
            className
          )}
        >
          {props.value || props.placeholder}
        </Text>
      )}
    </Wrapper>
  );
}

export { Input };

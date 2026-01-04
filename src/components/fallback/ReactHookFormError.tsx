import { Text } from "react-native";

const ReactHookFormError = ({ errorMessage }: { errorMessage?: string }) => {
  return errorMessage ? (
    <Text className="text-red-400 text-xs">{errorMessage}</Text>
  ) : null;
};

export default ReactHookFormError;

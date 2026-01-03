import { Text } from "react-native";

const ReactHookFormError = ({ errorMessage }: { errorMessage?: string }) => {
  return <Text className="text-red-400 text-xs">{errorMessage}</Text>;
};

export default ReactHookFormError;

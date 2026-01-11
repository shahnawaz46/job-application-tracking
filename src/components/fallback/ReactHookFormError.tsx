import { Text } from "../ui/text";

const ReactHookFormError = ({ errorMessage }: { errorMessage?: string }) => {
  return errorMessage ? (
    <Text className="text-red-400" variant={"xs"}>
      {errorMessage}
    </Text>
  ) : null;
};

export default ReactHookFormError;

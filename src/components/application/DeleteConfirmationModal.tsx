import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import ModalWrapper from "../wrapper/ModalWrapper";

// types/interface
import type { IJobApplicationRes } from "../../../app/(tabs)/application";

interface IDeleteConfirmationModalProps {
  open: boolean;
  job: IJobApplicationRes | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal = ({
  open,
  job,
  onConfirm,
  onCancel,
}: IDeleteConfirmationModalProps) => {
  if (!open) return null;

  if (!job) return;

  return (
    <ModalWrapper>
      {/* icon */}
      <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center self-center mb-4">
        <Ionicons name="warning" size={32} color="#EF4444" />
      </View>

      {/* title */}
      <Text variant={"xl"} className="text-foreground text-center mb-2">
        Delete Application?
      </Text>

      {/* description */}
      <Text
        variant={"small"}
        className="text-muted-foreground text-center mb-6"
      >
        Are you sure you want to delete the application for{" "}
        <Text className="font-semibold">{job?.job_title}</Text> at{" "}
        <Text className="font-semibold">{job?.company_name}? </Text>
        This action cannot be undone.
      </Text>

      {/* buttons */}
      <View className="flex-row gap-3">
        <Button
          size={"lg"}
          variant={"outline"}
          className="flex-1"
          onPress={onCancel}
        >
          <Text>Cancel</Text>
        </Button>
        <Button
          size={"lg"}
          variant={"destructive"}
          className="flex-1"
          onPress={onConfirm}
        >
          <Text>Delete</Text>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default DeleteConfirmationModal;

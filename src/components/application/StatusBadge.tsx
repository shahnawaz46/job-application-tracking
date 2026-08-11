import { COLORS } from "@/theme/color";
import { textTransform } from "@/utils/text-transform";
import { APPLICATION_STATUS } from "@/validation/constants";
import { ScrollView, View } from "react-native";
import { Text } from "../ui/text";

// types/interface
import type { TApplicationStatus } from "@/types/type";

const getStatusStyle = (status: TApplicationStatus) => {
  if (status === "applied")
    return {
      backgroundColor: COLORS.primary + 40,
      color: COLORS.primary,
    };
  else if (status === "interview" || status === "telephonic interview")
    return {
      backgroundColor: COLORS.warning + 40,
      color: COLORS.warning,
    };
  else if (status === "rejected")
    return { backgroundColor: COLORS.danger + 40, color: COLORS.danger };
  else if (status === "offer received")
    return { backgroundColor: COLORS.success + 40, color: COLORS.success };
  //  else if(status === "shortlisted") return "bg-purple-100 text-purple-700";
  else
    return {
      backgroundColor: COLORS.mutedForeground + 40,
      color: COLORS.mutedForeground,
    };
};

const getCurrentStatus = (status: TApplicationStatus) => {
  if (status === "applied") return textTransform(status);
  else if (status === "telephonic interview") {
    if (APPLICATION_STATUS[0] === "applied") {
      return [textTransform(APPLICATION_STATUS[0]), textTransform(status)].join(
        " → ",
      );
    }
  } else if (status === "interview") {
    if (
      APPLICATION_STATUS[0] === "applied" &&
      APPLICATION_STATUS[1] === "telephonic interview"
    ) {
      return [
        textTransform(APPLICATION_STATUS[0]),
        textTransform(APPLICATION_STATUS[1]),
        textTransform(status),
      ].join(" → ");
    }
  } else if (status === "rejected" || status === "offer received") {
    if (
      APPLICATION_STATUS[0] === "applied" &&
      APPLICATION_STATUS[1] === "telephonic interview" &&
      APPLICATION_STATUS[2] === "interview"
    ) {
      return [
        textTransform(APPLICATION_STATUS[0]),
        textTransform(APPLICATION_STATUS[1]),
        textTransform(APPLICATION_STATUS[2]),
        textTransform(status),
      ].join(" → ");
    }
  }
};

const StatusBadge = ({ status }: { status: TApplicationStatus }) => {
  return (
    <View className={`px-3 py-2 rounded-md`} style={getStatusStyle(status)}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-1">
          <Text
            variant={"xs"}
            className={`font-semibold ${getStatusStyle(status)}`}
          >
            {getCurrentStatus(status)}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default StatusBadge;

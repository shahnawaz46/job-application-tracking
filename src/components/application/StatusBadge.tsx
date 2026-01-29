import { textTransform } from "@/utils/text-transform";
import { APPLICATION_STATUS } from "@/validation/constants";
import { TApplicationStatus } from "@/validation/jobApplication.yup";
import { ScrollView, View } from "react-native";
import { Text } from "../ui/text";

const getStatusStyle = (status: TApplicationStatus) => {
  if (status === "applied") return "bg-blue-100 text-blue-700";
  else if (status === "interview" || status === "telephonic interview")
    return "bg-yellow-100 text-yellow-700";
  else if (status === "rejected") return "bg-red-100 text-red-700";
  else if (status === "offer received") return "bg-green-100 text-green-700";
  //  else if(status === "shortlisted") return "bg-purple-100 text-purple-700";
  else return "bg-gray-100 text-gray-700";
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
    <View className={`px-3 py-2 rounded-md ${getStatusStyle(status)}`}>
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

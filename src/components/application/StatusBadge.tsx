import { textTransform } from "@/utils/text-transform";
import { TApplicationStatus } from "@/validation/jobApplication.yup";
import { View } from "react-native";
import { Text } from "../ui/text";

const getStatusStyle = (status: TApplicationStatus) => {
  if (status === "applied") return "bg-blue-100 text-blue-700";
  else if (status === "interview") return "bg-yellow-100 text-yellow-700";
  else if (status === "rejected") return "bg-red-100 text-red-700";
  else if (status === "offer received") return "bg-green-100 text-green-700";
  //  else if(status === "shortlisted") return "bg-purple-100 text-purple-700";
  else return "bg-gray-100 text-gray-700";
};

const StatusBadge = ({ status }: { status: TApplicationStatus }) => {
  return (
    <View className={`px-3 py-1.5 rounded-full ${getStatusStyle(status)}`}>
      <Text
        variant={"xs"}
        className={`font-semibold ${getStatusStyle(status)}`}
      >
        {textTransform(status)}
      </Text>
    </View>
  );
};

export default StatusBadge;

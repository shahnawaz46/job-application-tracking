import { formatDate } from "@/utils/date";
import { lightHaptic } from "@/utils/haptics";
import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";
import { Pressable, View } from "react-native";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Text } from "../ui/text";
import LabelCard from "./LabelCard";
import StatusBadge from "./StatusBadge";

// types/interface
import type { IJobApplicationRes } from "../../../app/(tabs)/application";

interface IJobCardProps {
  item: IJobApplicationRes;
  onDelete: (job: IJobApplicationRes) => void;
}

const JobCard = ({ item, onDelete }: IJobCardProps) => {
  return (
    <Card className="py-3 gap-3">
      {/* header */}
      <CardHeader className="flex-row justify-between items-start px-4 gap-3">
        <View className="items-start flex-1">
          <Text variant={"default"} className="font-medium" numberOfLines={1}>
            {item.company_name}
          </Text>

          <Text
            variant={"small"}
            className="text-muted-foreground"
            numberOfLines={1}
          >
            {item.job_title}
          </Text>
        </View>
        <View className="items-end">
          <Text variant={"xs"} className="text-muted-foreground mb-1">
            Applied on
          </Text>
          <Text variant={"xs"} className="font-semibold">
            {formatDate(item.applied_date)}
          </Text>
        </View>
      </CardHeader>

      <CardContent className="px-4 gap-3">
        {/* status badge */}
        <StatusBadge status={item.application_status} />

        <View className="flex-row flex-wrap gap-2">
          <LabelCard
            iconName="desktop-outline"
            label={item.work_mode}
            textClassName="text-muted-foreground"
          />

          {/* optional details */}
          {item.job_location && (
            <LabelCard
              iconName="location-outline"
              label={item.job_location}
              textClassName="text-muted-foreground"
            />
          )}

          {item.job_type && (
            <LabelCard
              iconName="briefcase-outline"
              label={item.job_type}
              textClassName="text-muted-foreground"
            />
          )}
        </View>

        {item.application_source && (
          <View className="items-end">
            {item.application_source && (
              <LabelCard
                label={`via ${item.application_source}`}
                isTransform={false}
                containerClassName="bg-primary/10"
                textClassName="font-medium"
              />
            )}
          </View>
        )}
      </CardContent>

      <CardFooter className="px-4 pt-3 flex-row gap-3 justify-between items-center border-t border-border/50">
        {/* salray range */}
        {item.salary_range ? (
          <LabelCard
            iconName="cash-outline"
            iconColor={"#10B981"}
            label={item.salary_range}
            isTransform={false}
            textVariant={"small"}
            containerClassName="bg-white px-0 py-0"
            textClassName="font-semibold"
          />
        ) : (
          <View />
        )}

        {/* edit and delete icons */}
        <View className="flex-row gap-3 justify-end">
          <Pressable
            onPress={() => {
              console.log("edit");
            }}
            className="w-7 h-7 bg-blue-100 rounded-md items-center justify-center"
          >
            <Ionicons name="create-outline" size={16} color="#6366F1" />
          </Pressable>
          <Pressable
            onPress={() => {
              lightHaptic();
              onDelete(item);
            }}
            className="w-7 h-7 bg-red-100 rounded-md items-center justify-center"
          >
            <Ionicons name="trash-outline" size={16} color="#EF4444" />
          </Pressable>
        </View>
      </CardFooter>
    </Card>
  );
};

export default memo(JobCard);

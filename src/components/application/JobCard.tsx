import { formatDate } from "@/utils/date";
import { memo } from "react";
import { View } from "react-native";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Text } from "../ui/text";
import LabelCard from "./LabelCard";
import StatusBadge from "./StatusBadge";

// types/interface
import type { IJobApplication } from "@/validation/jobApplication.yup";

interface IJobCardProps {
  item: IJobApplication;
}

const JobCard = ({ item }: IJobCardProps) => {
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
      </CardContent>

      {/* additional info */}
      {(item.salary_range || item.application_source) && (
        <CardFooter className="px-4 pt-3 flex-row justify-between items-center border-t border-border/50">
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
          {item.application_source && (
            <LabelCard
              label={`via ${item.application_source}`}
              isTransform={false}
              containerClassName="bg-primary/10"
              textClassName="font-medium"
            />
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default memo(JobCard);

import { cn } from "@/lib/utils";
import { View } from "react-native";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const JobCardLoading = ({
  containerClassName,
}: {
  containerClassName?: string;
}) => {
  return (
    <Card className={cn("py-3 gap-3 mb-3", containerClassName)}>
      {/* header skeleton */}
      <CardHeader className="flex-row justify-between items-start px-4 gap-3">
        <View className="items-start flex-1 gap-1">
          <Skeleton className="w-full h-6" />

          <Skeleton className="w-full h-5" />
        </View>
        <View className="items-end gap-1 w-16">
          <Skeleton className="w-full h-6" />

          <Skeleton className="w-full h-5" />
        </View>
      </CardHeader>

      <CardContent className="px-4 gap-3">
        {/* status badge and  optional details skeleton */}
        <Skeleton className="w-full h-[67px]" />
      </CardContent>

      {/* additional info skeleton */}
      <CardFooter className="px-4 pt-3 flex-row justify-between items-center border-t border-border/50">
        <Skeleton className="w-28 h-6" />

        <Skeleton className="w-28 h-6" />
      </CardFooter>
    </Card>
  );
};

export default JobCardLoading;

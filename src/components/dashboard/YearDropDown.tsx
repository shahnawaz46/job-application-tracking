import { useAuthContext } from "@/hooks/useAuthContext";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import { Text } from "../ui/text";

interface IYearDropDown {
  totalApplications: number;
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}

const YearDropDown = ({
  totalApplications,
  selectedYear,
  setSelectedYear,
  isLoading,
}: IYearDropDown) => {
  const { profile } = useAuthContext();

  const currentYear = new Date().getFullYear();
  const createdYear = new Date(profile?.created_at).getFullYear();

  const yearLength = currentYear - createdYear + 1;

  const yearOptions = Array.from({ length: yearLength }, (_, index) => {
    const year = currentYear - index;

    return {
      label: year.toString(),
      value: year.toString(),
    };
  });
  // safe area spacing for the Select dropdown so it doesn't overlap screen edges or the bottom navigation
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({
      ios: insets.bottom,
      android: insets.bottom + 24, // extra space for Android navigation bar
    }),
    left: 16,
    right: 16,
  };

  return (
    <View className="flex-row items-center justify-between gap-3 mb-4">
      {isLoading ? (
        <Skeleton className="h-10 flex-1" />
      ) : (
        <>
          {/* year dropdown */}
          <View className="flex-row items-center justify-between">
            <Select
              value={{
                label: selectedYear.toString(),
                value: selectedYear.toString(),
              }}
              onValueChange={(option) => {
                setSelectedYear(Number(option?.value));
              }}
            >
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Year" />
              </SelectTrigger>

              <SelectContent insets={contentInsets} className="w-28 min-w-28">
                <SelectGroup>
                  {yearOptions.map((item) => (
                    <SelectItem
                      key={item.value}
                      label={item.label}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </View>

          {/* total applied */}
          <Text variant={"small"} className="font-medium">
            Total Applications: {totalApplications ?? 0}
          </Text>
        </>
      )}
    </View>
  );
};

export default YearDropDown;

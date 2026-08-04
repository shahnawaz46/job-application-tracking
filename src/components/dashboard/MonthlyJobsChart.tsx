import { getMonthlyApplicationStats } from "@/api/query";
import useQuery from "@/hooks/useQuery";
import { COLORS } from "@/theme/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import StateMessage from "../fallback/StateMessge";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Text } from "../ui/text";
import YearDropDown from "./YearDropDown";

interface IMonthlyApplicationStats {
  month_number: number;
  month_name: string;
  total: number;
}

const MonthlyJobsChart = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const { isLoading, data, error } = useQuery<IMonthlyApplicationStats[]>({
    queryKey: getMonthlyApplicationStats.QUERY_KEY(selectedYear),
    queryFn: () => getMonthlyApplicationStats.QUERY_FN(selectedYear),
  });

  const [selected, setSelected] = useState<number | null>(null);

  const chartData =
    data?.map((item) => ({
      value: item.total,
      label: item.month_name,
    })) ?? [];

  const totalApplications = chartData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  if (error) {
    return (
      <StateMessage
        iconName="warning-outline"
        iconColor={COLORS.danger}
        title="Something went wrong"
        description="We couldn't load your stats. Please try again."
        containerClass="px-0"
      />
    );
  }

  return (
    <Card className="p-3">
      <CardContent className="p-0">
        {/* card header */}
        <CardHeader className="px-0 gap-4">
          <View className="flex-row items-center gap-3">
            <View
              className="h-10 w-10 items-center justify-center rounded-xl"
              style={{
                backgroundColor: COLORS.primary + 20,
              }}
            >
              <MaterialCommunityIcons
                name="chart-bar"
                size={22}
                color={COLORS.primary}
              />
            </View>

            <View>
              <Text variant="large">Monthly Applications</Text>

              <Text variant="small" className="mt-[-2px] text-muted-foreground">
                Job applications by month
              </Text>
            </View>
          </View>

          <YearDropDown
            totalApplications={totalApplications}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            isLoading={isLoading}
          />
        </CardHeader>

        {isLoading ? (
          <Skeleton className="h-[14.57rem]" />
        ) : (
          <BarChart
            key={JSON.stringify(chartData)}
            data={chartData.map((item, index) => ({
              ...item,
              frontColor: COLORS.primary,
              onPress: () => setSelected(index),
            }))}
            barWidth={22}
            spacing={18}
            barBorderTopLeftRadius={6}
            barBorderTopRightRadius={6}
            barBorderBottomLeftRadius={2}
            barBorderBottomRightRadius={2}
            hideRules
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{
              color: COLORS.mutedForeground,
            }}
            xAxisLabelTextStyle={{
              color: COLORS.mutedForeground,
              fontSize: 12,
            }}
            noOfSections={5}
            isAnimated
            animationDuration={900}
            showValuesAsTopLabel
            topLabelTextStyle={{
              color: COLORS.foreground,
              fontWeight: "600",
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default MonthlyJobsChart;

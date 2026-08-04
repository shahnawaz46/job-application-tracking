import { getApplicationStats } from "@/api/query";
import AnalyticsCard from "@/components/dashboard/AnalyticsCard";
import Header from "@/components/dashboard/Header";
import MonthlyJobsChart from "@/components/dashboard/MonthlyJobsChart";
import StatCard from "@/components/dashboard/StatCard";
import WorkModeCard from "@/components/dashboard/WorkModeCard";
import StateMessage from "@/components/fallback/StateMessge";
import { Text } from "@/components/ui/text";
import PageWrapper from "@/components/wrapper/PageWrapper";
import { useAuthContext } from "@/hooks/useAuthContext";
import useQuery from "@/hooks/useQuery";
import { COLORS } from "@/theme/color";
import { percent } from "@/utils/number";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ScrollView, View } from "react-native";

// types/interface
import type {
  TApplicationStatus,
  TWorkMode,
} from "@/validation/jobApplication.yup";

// convert strings with spaces into snake_case.
// Example: "In Review" -> "In_Review"
type ToSnakeCase<T> = T extends `${infer A} ${infer B}` ? `${A}_${B}` : T;

// build the application stats object automatically
// TWorkMode keys (Remote, Hybrid, Onsite, etc.) -> number
// TApplicationStatus keys are converted to snake_case
type TApplicationStats = { [J in TWorkMode]: number } & {
  [K in ToSnakeCase<TApplicationStatus>]: number;
};

const DashboardScreen = () => {
  const { profile } = useAuthContext();
  const { isLoading, data, error } = useQuery<TApplicationStats[]>({
    queryKey: getApplicationStats.QUERY_KEY,
    queryFn: getApplicationStats.QUERY_FN,
  });

  const applicationStatusStatsData = data?.[0];

  if (error) {
    return (
      <StateMessage
        iconName="warning-outline"
        iconColor={COLORS.danger}
        title="Something went wrong"
        description="We couldn't load your stats. Please try again."
      />
    );
  }

  return (
    <PageWrapper safeAreaViewClassName="wrapper-space wrapper-space-x">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-12"
      >
        {/* Header */}
        <Header
          text={`Welcome back, ${profile?.full_name}`}
          subText={"Track and manage your job applications"}
        />

        {/* Stats Cards */}
        <View className="my-4 gap-3">
          <View className="flex-row gap-3">
            <StatCard
              icon={
                <Ionicons name={"briefcase"} size={15} color={COLORS.primary} />
              }
              label="Applied"
              value={applicationStatusStatsData?.applied ?? 0}
              bgColor={COLORS.primary + 20}
              isLoading={isLoading}
            />
          </View>
          <View className="flex-row gap-3">
            <StatCard
              icon={
                <Ionicons name={"call-outline"} size={15} color={COLORS.info} />
              }
              label="Phone/HR"
              value={applicationStatusStatsData?.telephonic_interview ?? 0}
              bgColor={COLORS.info + 20}
              isLoading={isLoading}
            />
            <StatCard
              icon={
                <Ionicons
                  name={"calendar-outline"}
                  size={15}
                  color={COLORS.warning}
                />
              }
              label="Interviews"
              value={applicationStatusStatsData?.interview ?? 0}
              bgColor={COLORS.warning + 20}
              isLoading={isLoading}
            />
          </View>

          <View className="flex-row gap-3">
            <StatCard
              icon={
                <Ionicons name={"checkmark"} size={15} color={COLORS.success} />
              }
              label="Offers"
              value={applicationStatusStatsData?.offer_received ?? 0}
              bgColor={COLORS.success + 20}
              isLoading={isLoading}
            />
            <StatCard
              icon={
                <Ionicons
                  name={"alert-circle-outline"}
                  size={15}
                  color={COLORS.danger}
                />
              }
              label="Rejected"
              value={applicationStatusStatsData?.rejected ?? 0}
              bgColor={COLORS.danger + 20}
              isLoading={isLoading}
            />
          </View>
        </View>

        {/* analytics & insights */}
        <View>
          <Text variant={"large"} className="mb-2 mt-1">
            Analytics & Insights
          </Text>
        </View>

        {/* success and offer rate cards */}
        <View className="flex-row gap-3 mb-3">
          <AnalyticsCard
            icon={
              <AntDesign name={"bar-chart"} size={18} color={COLORS.success} />
            }
            label="Success Rate"
            value={percent(
              applicationStatusStatsData?.interview ?? 0,
              applicationStatusStatsData?.applied ?? 0,
            )}
            bottomText="Applied to Interviews"
            isLoading={isLoading}
          />
          <AnalyticsCard
            icon={
              <AntDesign name={"bar-chart"} size={18} color={COLORS.success} />
            }
            label="Offer Rate"
            value={percent(
              applicationStatusStatsData?.offer_received ?? 0,
              applicationStatusStatsData?.interview ?? 0,
            )}
            bottomText="Interviews to Offers"
            isLoading={isLoading}
          />
        </View>

        {/* work mode card */}
        <View className="mb-3">
          <WorkModeCard
            onsite={applicationStatusStatsData?.onsite ?? 0}
            hybrid={applicationStatusStatsData?.hybrid ?? 0}
            remote={applicationStatusStatsData?.remote ?? 0}
            isLoading={isLoading}
          />
        </View>

        {/* monthly bar chart */}
        <MonthlyJobsChart />
      </ScrollView>
    </PageWrapper>
  );
};

export default DashboardScreen;

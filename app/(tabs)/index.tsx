import { getApplicationStats } from "@/api/query";
import AnalyticsCard from "@/components/dashboard/AnalyticsCard";
import Header from "@/components/dashboard/Header";
import StatCard from "@/components/dashboard/StatCard";
import WorkModeCard from "@/components/dashboard/WorkModeCard";
import StateMessage from "@/components/fallback/StateMessge";
import { Text } from "@/components/ui/text";
import PageWrapper from "@/components/wrapper/PageWrapper";
import { useAuthContext } from "@/hooks/useAuthContext";
import useQuery from "@/hooks/useQuery";
import { percent } from "@/utils/number";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ScrollView, View } from "react-native";

// types/interface
import type {
  TApplicationStatus,
  TWorkMode,
} from "@/validation/jobApplication.yup";

type ToSnakeCase<T> = T extends `${infer A} ${infer B}` ? `${A}_${B}` : T;

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
        iconColor="#EF4444"
        title="Something went wrong"
        description="We couldn't load your stats. Please try again."
      />
    );
  }

  return (
    <PageWrapper safeAreaViewClassName="wrapper-space wrapper-space-x">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-8"
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
              icon={<Ionicons name={"briefcase"} size={15} color={"#6366F1"} />}
              label="Applied"
              value={applicationStatusStatsData?.applied ?? 0}
              bgColor="bg-blue-100"
              isLoading={isLoading}
            />
          </View>
          <View className="flex-row gap-3">
            <StatCard
              icon={
                <Ionicons name={"call-outline"} size={15} color={"#0EA5E9"} />
              }
              label="Phone/HR"
              value={applicationStatusStatsData?.telephonic_interview ?? 0}
              bgColor="bg-sky-100"
              isLoading={isLoading}
            />
            <StatCard
              icon={
                <Ionicons
                  name={"calendar-outline"}
                  size={15}
                  color={"#F59E0B"}
                />
              }
              label="Interviews"
              value={applicationStatusStatsData?.interview ?? 0}
              bgColor="bg-yellow-100"
              isLoading={isLoading}
            />
          </View>

          <View className="flex-row gap-3">
            <StatCard
              icon={
                <Ionicons
                  name={"alert-circle-outline"}
                  size={15}
                  color={"#8B5CF6"}
                />
              }
              label="Rejected"
              value={applicationStatusStatsData?.rejected ?? 0}
              bgColor="bg-purple-100"
              isLoading={isLoading}
            />
            <StatCard
              icon={<Ionicons name={"checkmark"} size={15} color={"#10B981"} />}
              label="Offers"
              value={applicationStatusStatsData?.offer_received ?? 0}
              bgColor="bg-green-100"
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
            icon={<AntDesign name={"bar-chart"} size={18} color={"#10B981"} />}
            label="Success Rate"
            value={percent(
              applicationStatusStatsData?.interview ?? 0,
              applicationStatusStatsData?.applied ?? 0,
            )}
            bottomText="Applied to Interviews"
            isLoading={isLoading}
          />
          <AnalyticsCard
            icon={<AntDesign name={"bar-chart"} size={18} color={"#10B981"} />}
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
        <WorkModeCard
          onsite={applicationStatusStatsData?.onsite ?? 0}
          hybrid={applicationStatusStatsData?.hybrid ?? 0}
          remote={applicationStatusStatsData?.remote ?? 0}
          isLoading={isLoading}
        />
      </ScrollView>
    </PageWrapper>
  );
};

export default DashboardScreen;

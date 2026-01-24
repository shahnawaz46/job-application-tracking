import DebounceSearch from "@/components/application/DebounceSearch";
import JobCard from "@/components/application/JobCard";
import Header from "@/components/dashboard/Header";
import StateMessage from "@/components/fallback/StateMessge";
import JobCardLoading from "@/components/loaders/JobCardLoading";
import PageWrapper from "@/components/wrapper/PageWrapper";
import { useAuthContext } from "@/hooks/useAuthContext";
import useQuery from "@/hooks/useQuery";
import { supabase } from "@/lib/supabase";
import { DATA_LIMIT } from "@/validation/constants";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, View } from "react-native";

// types/interface
import type { IJobApplication } from "@/validation/jobApplication.yup";

export interface IJobApplicationRes extends IJobApplication {
  id: string;
  user_id: string;
}

const QUERY_KEY = "job-application";
const QUERY_FNC = (profileId: string, range: number[]) => async () => {
  return supabase
    .from("job_applications")
    .select("*")
    .eq("user_id", profileId)
    .range(range[0], range[1] - 1) // i have to do (-1) because supabase return 0-12 (13 items, 0 and 12 both are included)
    .order("created_at", { ascending: false });
};

const ApplicationScreen = () => {
  const { profile } = useAuthContext();
  const router = useRouter();
  const pageRef = useRef<number>(0);

  const {
    isLoading: isJobLoading,
    data: jobData,
    error: jobError,
    fetchMoreData,
    hasMore: jobHasMore,
  } = useQuery<IJobApplicationRes[]>({
    queryKey: QUERY_KEY,
    queryFn: QUERY_FNC(profile.id, [
      pageRef.current * DATA_LIMIT,
      pageRef.current * DATA_LIMIT + DATA_LIMIT,
    ]),
  });
  const [searchResult, setSearchResult] = useState<{
    isSearching: boolean;
    isLoading: boolean;
    data: IJobApplicationRes[];
  }>({ isSearching: false, isLoading: false, data: [] });

  // conditionally variables
  const listData = searchResult.isSearching ? searchResult.data : jobData;
  const isLoading = isJobLoading || searchResult.isLoading;
  const hasMore = searchResult.isSearching ? false : jobHasMore;

  if (jobError) {
    return (
      <StateMessage
        iconName="warning-outline"
        iconColor="#EF4444"
        title="Something went wrong"
        description="We couldn't load your applications. Please try again."
      />
    );
  }

  const fetchMoreApplication = () => {
    pageRef.current += 1;
    fetchMoreData(
      QUERY_KEY,
      QUERY_FNC(profile.id, [
        pageRef.current * DATA_LIMIT,
        pageRef.current * DATA_LIMIT + DATA_LIMIT,
      ]),
    );
  };

  const ListEmtpy = () => {
    if (isLoading)
      return Array.from({ length: 5 }).map((_, index) => (
        <JobCardLoading key={index} />
      ));

    return (
      <StateMessage
        iconName="document-text-outline"
        title="No Applications Yet"
        description="Start tracking your job applications by adding your first entry"
        actionLabel="Add Application"
        onActionPress={() => router.navigate("/(tabs)/add-application")}
      />
    );
  };

  return (
    <PageWrapper safeAreaViewClassName="px-4 pt-3">
      <View className="flex-1">
        <Header
          text="Job Applications"
          subText="All the jobs you've applied to, in one place"
        />

        <View className="mt-2 mb-3">
          <DebounceSearch setSearchResult={setSearchResult} />
        </View>

        <FlatList
          contentContainerClassName="flex-grow pb-24"
          data={listData ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <JobCard item={item} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-3" />}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={100}
          ListEmptyComponent={ListEmtpy}
          ListFooterComponent={
            hasMore ? <JobCardLoading containerClassName="mt-3" /> : null
          }
          onEndReached={hasMore ? fetchMoreApplication : null}
          onEndReachedThreshold={0.5}
        />
      </View>
    </PageWrapper>
  );
};

export default ApplicationScreen;

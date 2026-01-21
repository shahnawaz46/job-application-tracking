import JobCard from "@/components/application/JobCard";
import Header from "@/components/dashboard/Header";
import NoApplication from "@/components/fallback/NoApplication";
import PageHeader from "@/components/headers/PageHeader";
import JobCardLoading from "@/components/loaders/JobCardLoading";
import { useAuthContext } from "@/hooks/useAuthContext";
import useQuery from "@/hooks/useQuery";
import { supabase } from "@/lib/supabase";
import { DATA_LIMIT } from "@/validation/constants";
import { useRef } from "react";
import { FlatList, View } from "react-native";

// types/interface
import type { IJobApplication } from "@/validation/jobApplication.yup";

interface IJobApplicationRes extends IJobApplication {
  id: string;
  user_id: string;
}

const QUERY_KEY = "job-application";
const QUERY_FNC = (profileId: string, range: number[]) => async () => {
  return supabase
    .from("job_applications")
    .select("*")
    .eq("user_id", profileId)
    .range(range[0], range[1] - 1); // i have to do (-1) because supabase return 0-12 (13 items, 0 and 12 both are included)
};

const ApplicationScreen = () => {
  const { profile } = useAuthContext();
  const pageRef = useRef<number>(0);

  const { isLoading, data, error, fetchMoreData, hasMore } = useQuery<
    IJobApplicationRes[]
  >({
    queryKey: QUERY_KEY,
    queryFn: QUERY_FNC(profile.id, [
      pageRef.current * DATA_LIMIT,
      pageRef.current * DATA_LIMIT + DATA_LIMIT,
    ]),
  });

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

    return <NoApplication />;
  };

  return (
    <PageHeader safeAreaViewClassName="px-4 pt-3">
      <View className="flex-1">
        <Header
          text="Job Applications"
          subText="All the jobs you've applied to, in one place"
        />

        <FlatList
          contentContainerClassName="flex-grow pb-24"
          data={data ?? []}
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
    </PageHeader>
  );
};

export default ApplicationScreen;

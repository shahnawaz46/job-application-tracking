import { getAllApplications } from "@/api/query";
import DebounceSearch from "@/components/application/DebounceSearch";
import DeleteConfirmationModal from "@/components/application/DeleteConfirmationModal";
import JobCard from "@/components/application/JobCard";
import Header from "@/components/dashboard/Header";
import StateMessage from "@/components/fallback/StateMessge";
import JobCardLoading from "@/components/loaders/JobCardLoading";
import { ToastMessage } from "@/components/Toast";
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
  created_at: string;
  updated_at: string;
  search_text: string;
}

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
    onDelete: onDeleteJob,
  } = useQuery<IJobApplicationRes[]>({
    queryKey: getAllApplications.QUERY_KEY,
    queryFn: getAllApplications.QUERY_FN(profile.id, [
      pageRef.current * DATA_LIMIT,
      pageRef.current * DATA_LIMIT + DATA_LIMIT,
    ]),
  });

  // search date
  const [searchResult, setSearchResult] = useState<{
    isSearching: boolean;
    isLoading: boolean;
    data: IJobApplicationRes[];
  }>({ isSearching: false, isLoading: false, data: [] });

  // state for model
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<IJobApplicationRes | null>(
    null,
  );

  const handleDelete = async () => {
    if (!selectedJob) return;

    onDeleteJob(
      getAllApplications.QUERY_KEY,
      async () =>
        supabase.from("job_applications").delete().eq("id", selectedJob?.id),
      selectedJob.id,
    );

    setShowDeleteModal(false);
    setSelectedJob(null);
    ToastMessage({
      type: "success",
      text1: "Job Application deleted successfully",
    });
  };

  const handleEdit = (job: IJobApplicationRes) => {
    router.navigate({
      pathname: "/(tabs)/add-application",
      params: { id: job.id, job: JSON.stringify(job) },
    });
  };

  // conditionally variables
  const listData = searchResult.isSearching ? searchResult.data : jobData;
  const isLoading = isJobLoading || searchResult.isLoading;
  const hasMore = searchResult.isSearching ? false : jobHasMore;

  const fetchMoreApplication = () => {
    pageRef.current += 1;
    fetchMoreData(
      getAllApplications.QUERY_KEY,
      getAllApplications.QUERY_FN(profile.id, [
        pageRef.current * DATA_LIMIT,
        pageRef.current * DATA_LIMIT + DATA_LIMIT,
      ]),
    );
  };

  // for loading and empty message
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

  // for show error
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

  return (
    <PageWrapper safeAreaViewClassName="px-4 pt-3 pb-10">
      <View className="flex-1">
        <Header
          text="Job Applications"
          subText="All the jobs you've applied to, in one place"
        />

        <View className="mt-2 mb-3">
          <DebounceSearch setSearchResult={setSearchResult} />
        </View>

        <FlatList
          contentContainerClassName="flex-grow pb-12"
          data={listData ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <JobCard
              item={item}
              onDelete={(job: IJobApplicationRes) => {
                setShowDeleteModal(true);
                setSelectedJob(job);
              }}
              onEdit={handleEdit}
            />
          )}
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

      <DeleteConfirmationModal
        open={showDeleteModal}
        job={selectedJob}
        onConfirm={handleDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedJob(null);
        }}
      />
    </PageWrapper>
  );
};

export default ApplicationScreen;

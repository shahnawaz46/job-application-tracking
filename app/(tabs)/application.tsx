import {
  deleteJobApplication,
  getAllApplications,
  getApplicationStats,
  getMonthlyApplicationStats,
  searchApplications,
} from "@/api/application.api";
import { ToastMessage } from "@/components/Toast";
import DeleteConfirmationModal from "@/components/application/DeleteConfirmationModal";
import JobCard from "@/components/application/JobCard";
import Header from "@/components/dashboard/Header";
import StateMessage from "@/components/fallback/StateMessge";
import JobCardLoading from "@/components/loaders/JobCardLoading";
import { Input } from "@/components/ui/input";
import PageWrapper from "@/components/wrapper/PageWrapper";
import useDebounce from "@/hooks/useDebounce";
import { useProfile } from "@/hooks/useProfile";
import { COLORS } from "@/theme/color";
import { DATA_LIMIT } from "@/validation/constants";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList, View } from "react-native";

// types/interface
import type { IJobApplicationRes, IParams } from "@/types/interface";
import type { TApplicationStatus } from "@/types/type";

const ApplicationScreen = () => {
  const { data: profile } = useProfile();
  const router = useRouter();

  // showing the same data when navigating from the dashboard (status is "applied")
  // or opening the screen from the tab bar (status is "undefined")
  // replacing "undefined" to "applied" so both use the same query and cache
  const { status } = useLocalSearchParams<IParams>();
  const currentStatus: TApplicationStatus = status ?? "applied";

  const {
    isLoading: isJobLoading,
    data,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<IJobApplicationRes[]>({
    queryKey: [getAllApplications.QUERY_KEY, currentStatus],
    queryFn: ({ pageParam }) =>
      getAllApplications.QUERY_FN(
        profile!.id, // non-null assertion (`!`) is safe here because `enabled` guarantees profile is available
        currentStatus,
        pageParam as number,
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPage) => {
      return lastPage.length < DATA_LIMIT ? undefined : allPage.length;
    },
    enabled: !!profile, // run only when the profile is loaded
  });

  const applications = useMemo(() => data?.pages.flat() ?? [], [data]);

  const queryClient = useQueryClient();

  // delete job application
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<IJobApplicationRes | null>(
    null,
  );

  const {
    mutate: deleteJobApplicationMutate,
    isPending: isDeleteJobApplicationPending,
  } = useMutation({
    mutationFn: deleteJobApplication,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [getAllApplications.QUERY_KEY],
        }),
        queryClient.invalidateQueries({
          queryKey: [getApplicationStats.QUERY_KEY],
        }),
        queryClient.invalidateQueries({
          queryKey: [getMonthlyApplicationStats.QUERY_KEY],
        }),
      ]);

      setShowDeleteModal(false);
      setSelectedJob(null);
      ToastMessage({
        type: "success",
        text1: "Job Application deleted successfully",
      });
    },
    onError: (error) => {
      ToastMessage({ type: "error", text1: error.message });
    },
  });

  // search query
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 600);
  const isSearching = debouncedSearch.trim().length > 0;

  const { data: searchData, isLoading: isSearchLoading } = useQuery<
    IJobApplicationRes[]
  >({
    queryKey: [searchApplications.QUERY_KEY, currentStatus, debouncedSearch],
    queryFn: () =>
      searchApplications.QUERY_FN(profile!.id, debouncedSearch, currentStatus), // non-null assertion (`!`) is safe here because `enabled` guarantees profile is available
    enabled: !!profile && isSearching, // run only when the profile is loaded and the user is searching
  });

  // conditionally variables
  const listData = isSearching ? (searchData ?? []) : applications;
  const isLoading = isJobLoading || isSearchLoading;

  const handleEdit = (job: IJobApplicationRes) => {
    router.navigate({
      pathname: "/(tabs)/add-application",
      params: { jobId: job.id, job: JSON.stringify(job) },
    });
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
        title={isSearching ? "No results found" : "No Applications Yet"}
        description={
          isSearching
            ? "We couldn't find any applications matching your search. Try different keywords or add a new application."
            : "Start tracking your job applications by adding your first entry"
        }
        iconColor={COLORS.info}
        actionLabel="Add Application"
        onActionPress={() => router.navigate("/(tabs)/add-application")}
      />
    );
  };

  // for show error
  if (isError) {
    return (
      <StateMessage
        iconName="warning-outline"
        iconColor={COLORS.danger}
        title="Something went wrong"
        description="We couldn't load your applications. Please try again."
      />
    );
  }

  // clearning search text when leaving the screen to prevent search results
  // when returning with a different application status(from dashboard)
  useFocusEffect(
    useCallback(() => {
      // cleanup function
      return () => setSearch("");
    }, []),
  );
  return (
    <PageWrapper safeAreaViewClassName="wrapper-space wrapper-space-x">
      <View className="flex-1">
        <Header
          text="Job Applications"
          subText="All the jobs you've applied to, in one place"
        />

        <View className="mt-2 mb-3">
          <Input
            placeholder="Enter Company name, job title, location..."
            value={search}
            onChangeText={setSearch}
            className="text-sm"
          />
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
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          windowSize={11}
          updateCellsBatchingPeriod={100}
          ListEmptyComponent={ListEmtpy}
          ListFooterComponent={
            !isSearching && hasNextPage ? (
              <JobCardLoading containerClassName="mt-3" />
            ) : null
          }

          onEndReached={() => {
            if (!isSearching && hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
        />
      </View>

      <DeleteConfirmationModal
        open={showDeleteModal}
        job={selectedJob}
        onConfirm={() =>
          selectedJob?.id && deleteJobApplicationMutate(selectedJob?.id)
        }
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedJob(null);
        }}
        isPending={isDeleteJobApplicationPending}
      />
    </PageWrapper>
  );
};

export default ApplicationScreen;

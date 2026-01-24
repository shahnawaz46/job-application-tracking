import ReactHookFormError from "@/components/fallback/ReactHookFormError";
import ButtonLoading from "@/components/loaders/ButtonLoading";
import { ToastMessage } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputWithIcon } from "@/components/ui/inputwithicon";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import FormWrapper from "@/components/wrapper/FormWrapper";
import PageWrapper from "@/components/wrapper/PageWrapper";
import useAsyncAction from "@/hooks/useAsyncAction";
import { invalidateQuery } from "@/hooks/useQuery";
import { supabase } from "@/lib/supabase";
import {
  APPLICATION_STATUS,
  JOB_TYPE,
  WORK_MODE,
} from "@/validation/constants";
import {
  jobApplicationInitialState,
  jobApplicationSchema,
} from "@/validation/jobApplication.yup";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useCallback, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// types/interfaces
import type { IJobApplication } from "@/validation/jobApplication.yup";
import type { TextInput } from "react-native";

const AddApplicationScreen = () => {
  const { isPending, execute } = useAsyncAction();

  // refs for input focus management
  const jobTitleInputRef = useRef<TextInput>(null);
  const jobLocationInputRef = useRef<TextInput>(null);
  const applicationSourceInputRef = useRef<TextInput>(null);
  const salaryRangeInputRef = useRef<TextInput>(null);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const params = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: jobApplicationInitialState,
    resolver: yupResolver(jobApplicationSchema),
  });

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({
      ios: insets.bottom,
      android: insets.bottom + 24,
    }),
    left: 16,
    right: 16,
  };

  const onSubmit = (applicationData: IJobApplication) => {
    execute(async () => {
      const { data: authDate } = await supabase.auth.getUser();
      const { error } = await supabase
        .from("job_applications")
        .insert({ user_id: authDate.user?.id, ...applicationData });

      if (error) {
        ToastMessage({
          type: "error",
          text1:
            error?.message ||
            "Something went wrong while saving your job application. Please try again.",
        });
        return;
      }

      ToastMessage({
        type: "success",
        text1: "Your job application has been added successfully.",
      });

      reset(jobApplicationInitialState); // reset form data
      invalidateQuery("application-stats");
      invalidateQuery("job-application");
    });
  };

  const onEditing = (applicationData: IJobApplication) => {
    execute(async () => {
      const { data: authDate } = await supabase.auth.getUser();
      const { error } = await supabase
        .from("job_applications")
        .update({ ...applicationData })
        .eq("id", params.id);

      if (error) {
        ToastMessage({
          type: "error",
          text1:
            error?.message ||
            "Something went wrong while saving your job application. Please try again.",
        });
        return;
      }

      ToastMessage({
        type: "success",
        text1: "Your job application has been edited successfully.",
      });

      reset(jobApplicationInitialState); // reset form data
      invalidateQuery("application-stats");
      invalidateQuery("job-application");
    });
  };

  // defaultValues in useForm are only applied on mount, so we call reset() here
  // to update the form with the desired values when the screen get focus
  const isEditing = typeof params?.job === "string";
  useFocusEffect(
    useCallback(() => {
      if (isEditing) {
        try {
          const parsed = JSON.parse(params.job as string);
          let {
            id,
            user_id,
            created_at,
            updated_at,
            search_text,
            ...desiredValues
          } = parsed;

          // tranform data for validation
          for (let key in desiredValues) {
            const k = key as keyof IJobApplication;
            if (!desiredValues[k]) {
              desiredValues[k] = "";
            }
          }

          reset(desiredValues as IJobApplication);
        } catch {
          reset(jobApplicationInitialState);
        }
      } else {
        reset(jobApplicationInitialState);
      }
    }, [params.job, reset]),
  );

  // convert array into object for Select Options
  const applicationStatusDropDown = useMemo(
    () =>
      APPLICATION_STATUS.map((item) => ({
        label: item.charAt(0).toUpperCase() + item.slice(1),
        value: item,
      })),
    [],
  );

  // convert array into object for Select Options
  const jobTypeDropDown = useMemo(
    () =>
      JOB_TYPE.map((item) => ({
        label: item.charAt(0).toUpperCase() + item.slice(1),
        value: item,
      })),
    [],
  );

  // convert array into object for Select Options
  const workModeDropDown = useMemo(
    () =>
      WORK_MODE.map((item) => ({
        label: item.charAt(0).toUpperCase() + item.slice(1),
        value: item,
      })),
    [],
  );

  return (
    <PageWrapper safeAreaViewClassName="pt-3 pb-20">
      <FormWrapper>
        <Card className="border-border/0 shadow-none">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Add Job Application
            </CardTitle>
            <CardDescription className="text-center">
              Track your job applications easily
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-4">
            {/* Add Job Application form */}
            <View className="gap-4">
              <View className="gap-1.5">
                <Label htmlFor="company_name">Company Name *</Label>
                <Controller
                  control={control}
                  name="company_name"
                  rules={{ required: "Company name is required" }}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      id="company_name"
                      placeholder="e.g. Zoho, Wipro"
                      autoCapitalize="words"
                      returnKeyType="next"
                      submitBehavior="submit"
                      onSubmitEditing={() => jobTitleInputRef.current?.focus()}
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                <ReactHookFormError
                  errorMessage={errors?.company_name?.message}
                />
              </View>

              <View className="gap-1.5">
                <Label htmlFor="job_title">Job Title / Role *</Label>
                <Controller
                  control={control}
                  name="job_title"
                  rules={{ required: "Job title is required" }}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      ref={jobTitleInputRef}
                      id="job_title"
                      placeholder="e.g. Software Engineer, Product Manager"
                      autoCapitalize="words"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                <ReactHookFormError errorMessage={errors?.job_title?.message} />
              </View>

              <View className="gap-1.5">
                <Label htmlFor="applied_date">Applied Date *</Label>
                <Controller
                  control={control}
                  name="applied_date"
                  rules={{ required: "Applied date is required" }}
                  render={({ field: { value, onChange } }) => {
                    const newValue = value
                      ? new Date(value).toLocaleString()
                      : "";
                    return (
                      <View>
                        <InputWithIcon
                          id="applied_date"
                          placeholder="DD/MM/YYYY"
                          value={newValue}
                          asText={true}
                          onPress={() => setShowDatePicker(true)}
                          rightIcon={
                            <Ionicons name="calendar-outline" size={20} />
                          }
                        />
                        {showDatePicker && (
                          <RNDateTimePicker
                            value={new Date()}
                            display={
                              Platform.OS === "ios" ? "spinner" : "default"
                            }
                            onChange={(_event, selectedDate) => {
                              onChange(selectedDate?.toISOString());
                              setShowDatePicker(false);
                            }}
                          />
                        )}
                      </View>
                    );
                  }}
                />
                <ReactHookFormError
                  errorMessage={errors?.applied_date?.message}
                />

                <Text className="text-xs text-muted-foreground">
                  Format: DD/MM/YYYY
                </Text>
              </View>

              <View className="gap-1.5">
                <Label htmlFor="application_status">Application Status *</Label>
                <Controller
                  control={control}
                  name="application_status"
                  rules={{ required: "Application status is required" }}
                  render={({ field: { value, onChange } }) => {
                    const optionValue = applicationStatusDropDown.find(
                      (val) => val.value === value,
                    );

                    return (
                      <Select
                        value={optionValue}
                        onValueChange={(val) => onChange(val?.value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a application status" />
                        </SelectTrigger>
                        <SelectContent
                          insets={contentInsets}
                          className="w-full"
                        >
                          <SelectGroup>
                            {applicationStatusDropDown.map((item, index) => (
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
                    );
                  }}
                />

                <ReactHookFormError
                  errorMessage={errors?.application_status?.message}
                />
              </View>

              <View className="gap-1.5">
                <Label htmlFor="job_location">Job Location</Label>
                <Controller
                  control={control}
                  name="job_location"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      ref={jobLocationInputRef}
                      id="job_location"
                      placeholder="e.g. Bangalore, Remote, Delhi"
                      autoCapitalize="words"
                      returnKeyType="next"
                      submitBehavior="submit"
                      onSubmitEditing={() =>
                        applicationSourceInputRef.current?.focus()
                      }
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                <ReactHookFormError
                  errorMessage={errors?.job_location?.message}
                />
              </View>

              <View className="gap-1.5">
                <Label htmlFor="job_type">Job Type</Label>
                <Controller
                  control={control}
                  name="job_type"
                  render={({ field: { value, onChange } }) => {
                    const optionValue = jobTypeDropDown.find(
                      (val) => val.value === value,
                    );

                    return (
                      <Select
                        value={optionValue}
                        onValueChange={(val) => onChange(val?.value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent
                          insets={contentInsets}
                          className="w-full"
                        >
                          <SelectGroup>
                            {jobTypeDropDown.map((item, index) => (
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
                    );
                  }}
                />
                <ReactHookFormError errorMessage={errors?.job_type?.message} />
              </View>

              <View className="gap-1.5">
                <Label htmlFor="work_mode">Work Mode</Label>
                <Controller
                  control={control}
                  name="work_mode"
                  render={({ field: { value, onChange } }) => {
                    const optionValue = workModeDropDown.find(
                      (val) => val.value === value,
                    );

                    return (
                      <Select
                        value={optionValue}
                        onValueChange={(val) => onChange(val?.value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select work mode" />
                        </SelectTrigger>
                        <SelectContent
                          insets={contentInsets}
                          className="w-full"
                        >
                          <SelectGroup>
                            {workModeDropDown.map((item, index) => (
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
                    );
                  }}
                />
                <ReactHookFormError errorMessage={errors?.work_mode?.message} />
              </View>

              <View className="gap-1.5">
                <Label htmlFor="application_source">Application Source</Label>
                <Controller
                  control={control}
                  name="application_source"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      ref={applicationSourceInputRef}
                      id="application_source"
                      placeholder="e.g. Naukri, Email, LinkedIn"
                      returnKeyType="next"
                      submitBehavior="submit"
                      onSubmitEditing={() =>
                        salaryRangeInputRef.current?.focus()
                      }
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                <ReactHookFormError
                  errorMessage={errors?.application_source?.message}
                />
              </View>

              <View className="gap-1.5">
                <Label htmlFor="salary_range">
                  Salary Range (Expected / Offered)
                </Label>
                <Controller
                  control={control}
                  name="salary_range"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      ref={salaryRangeInputRef}
                      id="salary_range"
                      placeholder="e.g. 10-15 LPA, ₹8-12 LPA"
                      returnKeyType="send"
                      submitBehavior="submit"
                      onSubmitEditing={
                        isEditing
                          ? handleSubmit(onEditing)
                          : handleSubmit(onSubmit)
                      }
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
                <ReactHookFormError
                  errorMessage={errors?.salary_range?.message}
                />
              </View>

              <Button
                className="w-full"
                onPress={
                  isEditing ? handleSubmit(onEditing) : handleSubmit(onSubmit)
                }
                disabled={isPending}
              >
                {isPending ? (
                  <ButtonLoading
                    text={
                      isEditing
                        ? "Editing application..."
                        : "Adding application..."
                    }
                  />
                ) : (
                  <Text>
                    {isEditing ? "Edit Application" : "Add Application"}
                  </Text>
                )}
              </Button>
            </View>
          </CardContent>
        </Card>
      </FormWrapper>
    </PageWrapper>
  );
};

export default AddApplicationScreen;

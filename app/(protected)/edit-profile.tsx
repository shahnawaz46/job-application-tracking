import { getUserProfile, updateUserProfile } from "@/api/user.api";
import ReactHookFormError from "@/components/fallback/ReactHookFormError";
import ButtonLoading from "@/components/loaders/ButtonLoading";
import Header from "@/components/profile/Header";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfilePic from "@/components/profile/ProfilePic";
import { ToastMessage } from "@/components/Toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useProfile } from "@/hooks/useProfile";
import { IUserProfile } from "@/types/interface";
import { GENDER_OPTIONS } from "@/validation/constants";
import { profileSchema } from "@/validation/profile.yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// types/interface
import type { IEditUserProfile, TGender } from "@/types/type";
import type { TextInput } from "react-native";

const EditProfile = () => {
  const { data: profile } = useProfile();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditUserProfile>({
    defaultValues: {
      full_name: profile?.full_name ?? "",
      phone_no: profile?.phone_no ?? "",
      gender: profile?.gender ?? "other",
    },
    resolver: yupResolver(profileSchema),
  });
  const phoneNoRef = useRef<TextInput>(null);

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

  const { mutate: updateUserProfileMutate, isPending } = useMutation<
    IUserProfile,
    Error,
    { values: IEditUserProfile; profileId: string }
  >({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      // update authContext profile state
      queryClient.setQueryData([getUserProfile.QUERY_KEY, data.id], data);

      ToastMessage({ type: "success", text1: "Profile updated successfully" });
    },
    onError: (error) => {
      ToastMessage({ type: "error", text1: error?.message });
    },
  });

  // submit handler (pre-mutation validation)
  const onSubmit = (values: IEditUserProfile) => {
    if (!profile) return;

    // if all of these fields are same as Input then not calling API
    if (
      profile.full_name === values.full_name &&
      profile.phone_no === values.phone_no &&
      profile.gender === values.gender
    ) {
      return;
    }

    updateUserProfileMutate({ values, profileId: profile.id });
  };

  // convert array into object for Select Options
  const genderDropdown: { label: string; value: TGender }[] = useMemo(
    () =>
      GENDER_OPTIONS.map((item) => ({
        label: item.charAt(0).toUpperCase() + item.slice(1),
        value: item,
      })),
    [],
  );

  return (
    <PageWrapper safeAreaViewClassName="wrapper-space wrapper-space-x">
      <FormWrapper>
        <View className="flex-1">
          {/* Header */}
          <Header title="Edit Profile" />

          {/* Proflie Picture */}
          <ProfilePic />

          {/* Profile Info */}
          <ProfileInfo />

          <View className="gap-4">
            <View className="gap-1.5">
              <Label htmlFor="full_name">Full Name</Label>
              <Controller
                control={control}
                name="full_name"
                render={({ field: { value, onChange } }) => (
                  <Input
                    id="full_name"
                    placeholder="Your Name"
                    autoCapitalize="words"
                    returnKeyType="next"
                    submitBehavior="submit"
                    onSubmitEditing={() => phoneNoRef.current?.focus()}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />

              <ReactHookFormError errorMessage={errors?.full_name?.message} />
            </View>

            <View className="gap-1.5">
              <Label htmlFor="phone_no">Phone No</Label>
              <Controller
                control={control}
                name="phone_no"
                render={({ field: { value, onChange } }) => (
                  <Input
                    ref={phoneNoRef}
                    id="phone_no"
                    placeholder="+1234567890"
                    autoCapitalize="words"
                    returnKeyType="send"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />

              <ReactHookFormError errorMessage={errors?.phone_no?.message} />
            </View>

            <View className="gap-1.5">
              <Label htmlFor="gender">Gender</Label>
              <Controller
                control={control}
                name="gender"
                render={({ field: { value, onChange } }) => {
                  const optionValue = genderDropdown.find(
                    (val) => val.value === value,
                  );

                  return (
                    <Select
                      value={optionValue}
                      onValueChange={(val) => onChange(val?.value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                      <SelectContent insets={contentInsets} className="w-full">
                        <SelectGroup>
                          {genderDropdown.map((item, index) => (
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

              <ReactHookFormError errorMessage={errors?.gender?.message} />
            </View>
          </View>

          <Button
            className="w-full mt-8"
            size={"lg"}
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
          >
            {isPending ? (
              <ButtonLoading text="Saving..." />
            ) : (
              <Text>Save Changes</Text>
            )}
          </Button>
        </View>
      </FormWrapper>
    </PageWrapper>
  );
};

export default EditProfile;

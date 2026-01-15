import CustomStatusBar from "@/components/CustomStatusBar";
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
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import useAsyncAction from "@/hooks/useAsyncAction";
import { useAuthContext } from "@/hooks/useAuthContext";
import { supabase } from "@/lib/supabase";
import { GENDER_OPTIONS } from "@/validation/constants";
import { profileSchema, TGender } from "@/validation/profile.yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Platform, ScrollView, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// types/interface
import type { IInitialState } from "@/validation/profile.yup";
import type { TextInput } from "react-native";

const EditProfile = () => {
  const { profile, updateProfileData } = useAuthContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IInitialState>({
    defaultValues: {
      full_name: profile.full_name,
      phone_no: profile.phone_no || "",
      gender: profile.gender ?? "other",
    },
    resolver: yupResolver(profileSchema),
  });

  const { isPending, execute } = useAsyncAction();
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

  const onSubmit = (values: IInitialState) => {
    execute(async () => {
      // if all of these fields are same as Input then not calling API
      if (
        profile.full_name === values.full_name &&
        profile.phone_no === values.phone_no &&
        profile.gender === values.gender
      )
        return;

      const { error, data } = await supabase
        .from("user_profiles")
        .update({ ...values })
        .eq("id", profile.id)
        .select()
        .single();

      if (error) {
        ToastMessage({ type: "error", text1: error?.message });
        return;
      }
      // update authContext profile state
      updateProfileData(data);

      ToastMessage({ type: "success", text1: "Profile updated successfully" });
    });
  };

  // convert array into object for Select Options
  const genderDropdown: { label: string; value: TGender }[] = useMemo(
    () =>
      GENDER_OPTIONS.map((value) => ({
        label: value.charAt(0).toUpperCase() + value.slice(1),
        value,
      })),
    []
  );

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white px-4 pt-3 pb-10">
      <CustomStatusBar style="dark" />
      <ScrollView>
        <View className="flex-1 bg-white">
          {/* Header */}
          <Header title="Edit Profile" />

          {/* Proflie Picture */}
          <ProfilePic
            full_name={profile.full_name}
            profile_pic={profile.profile_pic}
          />

          {/* Profile Info */}
          <ProfileInfo
            full_name={profile.full_name}
            email={profile.email}
            joined={profile.created_at}
          />

          <Separator />

          <View className="gap-6 mt-4">
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
                    (val) => val.value === value
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
            {isPending ? <ButtonLoading text="Saving..." /> : <Text>Save</Text>}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";

// types/interface
import type { IJobApplicationRes } from "../../../app/(tabs)/application";

interface IDebounceSearchProps {
  setSearchResult: React.Dispatch<
    React.SetStateAction<{
      isSearching: boolean;
      isLoading: boolean;
      data: IJobApplicationRes[];
    }>
  >;
}

const DebounceSearch = ({ setSearchResult }: IDebounceSearchProps) => {
  const [value, setValue] = useState<string>("");

  const getSearchResult = async () => {
    const input = value
      .trim()
      .split(/\s+/)
      .map((word) => `${word}:*`)
      .join(" & ");

    const { data } = await supabase
      .from("job_applications")
      .select("*")
      .textSearch("search_text", input)
      .limit(16); // for now only show 16 result, if user want accurate result then search by company name

    setSearchResult((prev) => ({
      ...prev,
      isLoading: false,
      data: data ?? [],
    }));
  };

  useEffect(() => {
    if (!value) {
      setSearchResult({
        isSearching: false,
        isLoading: false,
        data: [],
      });
      return;
    }

    setSearchResult((prev) =>
      prev.isLoading && prev.isSearching
        ? prev
        : { ...prev, isLoading: true, isSearching: true },
    );

    const timer = setTimeout(() => {
      getSearchResult();
    }, 1000);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Input
      placeholder="Enter Company name, job title, work mode, location"
      containerClassName="h-9"
      className="text-sm"
      onChangeText={setValue}
    />
  );
};

export default React.memo(DebounceSearch);

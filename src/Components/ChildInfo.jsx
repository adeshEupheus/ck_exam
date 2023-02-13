import { Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GetChildInfo } from "../apis/fetcher/GetChildInfo";

const ChildInfo = () => {
  const childInfo = useQuery({
    queryKey: ["child_info"],
    queryFn: () => GetChildInfo(),

    cacheTime: 0,
    onSuccess: (data) => {
      console.log(data);
    },
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {childInfo.isLoading ? (
        <div className="w-full flex flex-col gap-1 items-end">
          <Skeleton animation="wave" variant="text" width={200} />
          <Skeleton animation="wave" variant="text" width={200} />
          <Skeleton animation="wave" variant="text" width={200} />
        </div>
      ) : (
        <div className="w-full flex text-sm font-semibold bg-gray-200 text-gray-600 justify-end">
          <div className="flex flex-col px-4 cursor-pointer py-4 items-start gap-[1px]">
            <span>{childInfo.data.schoolName}</span>
            <span>
              {childInfo.data.schoolName.split(" ")[0]} [
              {childInfo.data.academicYear}]
            </span>
            <span>{childInfo.data.fullName}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChildInfo;

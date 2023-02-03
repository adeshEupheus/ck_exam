import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { GetChildList } from "../apis/fetcher/GetChildList";
import Loader from "../Components/Material/Loader";
import SelectChildCard from "../Components/SelectChildCard";

const SelectChild = () => {
  //   const [schoolList, setSchoolList] = useState({});

  const { data: ChildList, isLoading } = useQuery({
    queryKey: ["child_list"],
    queryFn: () => GetChildList(),
  });

  return (
    <div className="flex flex-col items-center justify-center">
      {isLoading ? (
        <Loader loading={true} />
      ) : (
        <>
          <div className=" p-5 mb-4 text-xl lg:text-2xl font-bold text-slate-600">
            Select Child for Login
          </div>

          <div className="bg-slate-200 p-3 lg:w-1/3 ">
            <div className="flex items-center justify-center p-3 font-bold text-slate-600">
              Select Child
            </div>
            {ChildList.map((item) => {
              return <SelectChildCard details={item} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SelectChild;

import React from "react";
import { Button } from "@mui/material";

const RevisionBar = ({ data }) => {
  return (
    <div className="flex w-full gap-2 p-2">
      <div className="flex flex-col w-full">
        <div className="text-xs sm:text-base font-semibold ">
          {data.studentName}'S PERSONAL REVISION SHEET
        </div>
        <div className="text-xs sm:text-base ">
          {data.subject}-({data.examType})
        </div>
      </div>
      <div className=" flex !flex-col  sm:flex sm:!flex-row gap-2 sm:justify-end w-full">
        <a href={data.pdfUrl} target="_blank">
          <Button
            variant="contained"
            className="w-full mt-2 sm:mt-0 sm:w-[150px] sm:h-[40px] !p-1 !text-xs sm:!text-base"
          >
            VIEW PDF
          </Button>
        </a>
        <Button
          variant="contained"
          className="w-full  sm:w-[200px] sm:h-[40px] !p-1 !text-xs sm:!text-base"
        >
          MARK COMPLETE
        </Button>
      </div>
    </div>
  );
};

export default RevisionBar;

import React from "react";
import { Button } from "@mui/material";

const RevisionBar = () => {
  return (
    <div className="flex w-full gap-2 p-2">
      <div className="flex flex-col w-full">
        <div className="text-xs sm:text-base font-semibold ">
          SANTOSH K'S PERSONAL REVISION SHEET
        </div>
        <div className="text-xs sm:text-base ">Maths-(Revision SA1)</div>
      </div>
      <div className=" flex !flex-col  sm:flex sm:!flex-row gap-2 sm:justify-end w-full">
        <Button
          variant="contained"
          className="w-full mt-2 sm:mt-0 sm:w-[150px] sm:h-[40px] !p-1 !text-xs sm:!text-base"
        >
          VIEW PDF
        </Button>
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

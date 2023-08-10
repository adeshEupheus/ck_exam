import React from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { saveAs } from "file-saver";

const RevisionBar = ({ data, mutationButton }) => {
  const downloadPdf = async (pdfUrl) => {
    const url = pdfUrl;
    const response = await axios.get(url, { responseType: "blob" });
    saveAs(
      response.data,
      `${pdfUrl
        .split("studentPDFs")[1]
        .slice(1, pdfUrl.split("studentPDFs")[1].length)}`
    );
  };

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
        <div onClick={() => downloadPdf(data?.pdfUrl)}>
          <Button
            variant="contained"
            className="w-full mt-2 sm:mt-0 sm:w-[150px] sm:h-[40px] !p-1 !text-xs sm:!text-base"
          >
            VIEW PDF
          </Button>
        </div>

        <Button
          onClick={() =>
            mutationButton({ type: "markComplete", prsId: data.studentPrsId })
          }
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

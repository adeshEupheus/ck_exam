import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Sidebar from "../../Components/Sidebar";

import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import { Menu } from "@mui/icons-material";
import {  useQuery } from "@tanstack/react-query";

import Snackbars from "../../Components/Material/Snackbar";
import Loader from "../../Components/Material/Loader";
import { GetOnlineExamData } from "../../apis/fetcher/GetOnlineExamData";
import BasicButton from "../../Components/Material/Button";
import { Card } from "@mui/material";
import { optionGroupUnstyledClasses, OptionUnstyled } from "@mui/base";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";

// import logo from "../../assets/classklap_logo";
let Logo =require('../../assets/classklap_logo.png');
console.log(Logo);
const ExamPage= () => {
  

  
  useEffect(() => {
    document.title = "Exam Set Up - ClassKlap";
    const handleWidth = () => {
      if (window.innerWidth > 1024) {
        
      } else {
        
      }
    };
    window.addEventListener("resize", handleWidth);
    handleWidth();
    window.scroll(0, 0);

    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);
  const Options=["A)4","B)5","C)6","D)8"];
  const[active,setactive]=useState([]);
  const [isSelected,setSelected]=useState(false);


  const handleClick=()=>{

  }

  
  

  return (
    <>
      
        <div
          className={`flex flex-col w-full min-h-screen bg-gray-200 relative transition-all overflow-hidden ease-linear duration-300`}
        >
          
          <div className="w-full flex text-sm font-semibold text-gray-600 justify-between">
            
            <div><img src={Logo} width="200px" height="200px" className="p-4  sm:ml-2"/></div>
            <div className="flex flex-col px-6 cursor-pointer py-8 items-end gap-[1px] mr-6">
              <span>Time Remaining</span>
              <span>50:00</span>
            
            </div>
          </div>

          <div className="relative flex flex-col w-full justify-center items-start mt-20 gap-4 ">
            <div className="sm:px-16 px-4 w-full flex flex-col gap-4 mb-4">
            
              <h1 className="text-slate-500 font-semibold sm:text-2xl text-xl">ENGLISH-RSA1</h1>
              
              <p className="text-slate-400">Reading Comprehension(5marks) </p>
               <p className="text-slate-400 ">Question 11 of 22</p>
               <p className="text-slate-400">Reading Comprehension </p>

               <div className="box-border w-50 h-50 border-4 sm:p-8 px-2 py-4 m-8 border-yellow-300 rounded-lg shadow-red-400 shadow-2xl sm:m-2">
               {/* < span className="inline grid grid-cols-2 gap-4"> */}
               
                <p>1) How many Children are swimming?</p><br></br>

          
                <div className="grid sm:grid-cols-2 sm:grid-rows-2 grid-cols-1 gap-4">
                {Options.map((item,index)=>{
                  // console.log(Options);
                  // const data=[...Options];
                  // console.log("Hello",data.index);
                  return(
                    // < span className="flex flex-col">
                     
                      <Card className={`!transition-all !mx-4 !p-4 !duration-200 !ease-linear ${active === index ? '!bg-purple-400' : "!bg-slate-100"}`} key={index} onClick={()=>setactive(index)}>{item}</Card>
                    //  <Card2 item={item}/>
                  
                  )
                  // console.log(data);
                  })}
                 
                </div>
                 
               </div>
               <div className="mt-4 flex w-full gap-3 justify-end pr-4">
                {/* <Stack spacing={5} direction="row" > */}
               <Button variant="contained">Previous</Button>
               <Button variant="contained">Next</Button>
               {/* </Stack> */}
</div>
            </div>
            </div>
          
    </div>
      </>
    
  );
};

const Card2 = ({item}) => {
  const [s, setS] = useState(false)
  return (
    <div onClick={() => setS(prev => !prev)} className={`px-4 py-2 ${s ? "bg-red-600" : "bg-slate-600"} text-white`}>
      {item}
    </div>
  )
}

export default ExamPage;

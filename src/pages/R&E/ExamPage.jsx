import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import QuestionSidebar from "../../Components/Material/QuestionSidebar";
import { PanToolAlt, TouchApp } from "@mui/icons-material";
let Logo =require('../../assets/classklap_logo.png');

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
  const[active,setactive]=useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

const handleclick=(index)=>{
  if(index === active){
    setactive(null)
  } else {
    setactive(index);
  }
  
  }
  const sidebarRef = useRef();

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
    setSidebarCollapsed(true);
  };
const show = null;

let arr=[];
let i=0;
for(i=6;i<26;i++){
  arr.push(i);
}

  return (
    <>
      
        <div
          className={`flex flex-col w-full min-h-screen bg-gray-200 relative transition-all overflow-hidden ease-linear duration-300`}
        >
          
          <div className="w-full flex text-sm font-semibold text-gray-600 sm:justify-between justify-around items-center">
            
            <div className="sm:px-8"><img src={Logo} className="p-2 h-auto w-[9rem] sm:w-[17rem] sm:ml-2 sm:p-4"/></div>
            <div className="flex flex-col px-2 sm:px-6  py-8 items-end gap-[1px] mr-2 sm:mr-6">
              <span>Time Remaining</span>
              <span>50:00</span>
              <Button className="!bg-blue-500 !font-semibold !text-white !mt-3" 
              onClick={handleSidebarCollapsed} >MCQs Done</Button>
              
            <div>
          <QuestionSidebar
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
           />

        </div>
            
            </div>
           
            
            
          </div>

          <div className="relative flex flex-col w-full justify-center items-start mt-20 gap-4 ">
            <div className="sm:px-16 px-4 w-full flex flex-col gap-4 mb-4">
            
              <h1 className="text-slate-500 font-semibold sm:text-2xl text-xl">ENGLISH-RSA1</h1>
              
              <p className="text-slate-400">Reading Comprehension(5marks) </p>
               <p className="text-slate-400 ">Question 11 of 22</p>
               <p className="text-slate-400">Reading Comprehension </p>

               <div className="box-border w-50 h-50 border-4 sm:p-8 px-2 py-4  border-yellow-300 rounded-lg shadow-red-400 shadow-2xl sm:m-2">
               {/* < span className="inline grid grid-cols-2 gap-4"> */}
               
                {/* <p>1) How many Children are swimming?</p><br></br>

          
                <div className="grid sm:grid-cols-2 sm:grid-rows-2 grid-cols-1 gap-4">
                {Options.map((item,index)=>{
                  // console.log(Options);
                  let data=[...Options];
                  console.log(data);
                  
                  return(
                  
                     
                      <Card className={`!transition-all !cursor-pointer !mx-4 !p-4 !duration-200 !ease-linear ${active === index ? '!bg-purple-400' : "!bg-slate-100"}`} key={index} onClick={()=>handleclick(index)}>{item}</Card>
                    //  <Card2 item={item}/>
                  
                  )
                  
                  })}
                 
                </div>
                 
               </div> */} 
               <div>
  
  <h1 className="!mt-3 !font-extrabold text-lg text-pink-600"> NOT ANSWERED</h1>
  
  <div className="relative w-fit">
      <PanToolAlt className="!text-[3rem] !text-gray-600 !absolute !-rotate-45 !top-7 -right-16"/>
      
  </div>
  <div className="flex">
  <div className="!w-[3rem] !h-[3rem] !p-3 !m-3 !bg-pink-600 !text-gray-200 mb-2 rounded-md">Q.1</div>
  <p className="m-4">Tap the question number to <b>add</b> your answers before submitting</p>
</div>
</div>
               <div className="flex flex-wrap"> 
              {arr.map((item)=>{
                return(
               <Card2 item={item} bgColor={'pink'}/>
                )
})}
</div>

<div>
  
  <h1 className="!mt-3 !font-extrabold text-lg text-green-500">ANSWERED</h1>
  
  <div className="relative w-fit">
      <PanToolAlt className="!text-[3rem] !text-gray-600 !absolute !-rotate-45 !top-7 -right-16"/>
      
  </div>
  <div className="flex">
  <div className="!w-[3rem] !h-[3rem] !p-3 !mt-2 !ml-3 !bg-green-500 !text-gray-200 rounded-md">Q.1</div>
  <p className="m-4">Tap the question number to <b>check</b> your answers before submitting</p>
</div>
<div className="flex flex-wrap mt-4"> 
              {[1,2,3,4,5].map((item)=>{
                return(
               <Card2 item={item} bgColor={'green'}/>
                )
})}
</div>
</div>
<div className="flex justify-center items-center mt-4">
<Button variant="contained">Submit</Button>
</div>
               {/* <div className="mt-4 flex w-full gap-3 justify-end pr-4">
                {/* <Stack spacing={5} direction="row" > */}
               {/* <Button variant="contained">Previous</Button>
               <Button variant="contained">Next</Button> */}
               {/* </Stack> */}
{/* </div>  */}

            </div>
            </div>
          </div>
    </div>
      </>
    
  );
};


const Card2 = ({item, bgColor}) => {
  return (
  <Card variant="outlined" className={`!p-2 !m-1 !bg-${bgColor}-600 font-medium !cursor-pointer !text-gray-100`}>Q.{item}</Card>
  )
}

export default ExamPage;

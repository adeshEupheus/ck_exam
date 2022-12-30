import { Button } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate()
  return (
    <div className='!bg-teal-300 w-full h-screen !flex flex-col justify-center items-center'>
        <div className= " text-[8rem] sm:text-[15rem] text-white font-extrabold underline underline-offset-8 ">
            <h1>404</h1>
            </div>
            <div className=' text-2xl sm:text-4xl text-white font-semibold'>PAGE NOT FOUND</div>
            

            <Button onClick={() => navigate('revision_and_exam/online_exam')} variant='contained' className=' !bg-white !text-teal-300 !font-bold !mt-6'>Back to Home</Button>
            
           
        </div>
  )
}

export default PageNotFound
// import React from 'react'
import { CiSearch } from "react-icons/ci";

export default function MainPage() {
  return (
    <div className="mainPage max-w-[1000px] w-full mx-auto flex flex-col gap-[15px] " >
        <h1 className=" text-center  " >TODO LIST</h1>
        <div>
            <div className="formPartID border-1 rounded-[15px] py-[5px] px-[15px] border-indigo-700 flex items-center ">
                <form action="" >
                <input type="text" className=" text-gray-300 text-[18px] border-0 " placeholder="Search note..."  />
                </form>
                <button className=" bg-white border-0 bg-white text-[18px] text-indigo-800 " ><CiSearch /></button>
            </div>

        </div>
    </div>
  )
}

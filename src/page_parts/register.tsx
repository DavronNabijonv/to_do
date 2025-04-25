import React, { useState } from "react";
import { useRegister } from "../hooks/useAuth"; 
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

interface LoginProps {
  changeTogle: () => void;
}

export default function Register({ changeTogle }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync  } = useRegister(); 
  const navigate = useNavigate();

  const handleSubmit = async  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    mutateAsync({ username, password })
    .then((res)=>{
        console.log(res)
        toast.success('Successfuly!');
        navigate('/main')
    }) 
    .catch(()=>{
        toast.error('Error')
    })
  };

  return (
    <div>
      <div data-aos="fade-up">
        <div className="formPart flex flex-col gap-[20px] max-w-[500px] w-full m-auto p-[10px] pt-[20px] rounded-[10px] mt-[10%] border-indigo-700 border-4 ">
          <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="p-[10px] rounded-[10px] text-gray-600 text-[18px] border-[1px] border-indigo-700 shadow-lg"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-[10px] rounded-[10px] text-gray-600 text-[18px] border-[1px] border-indigo-700"
              required
            />
            <input
              type="submit"
              value="Register"
              className="bg-indigo-700 p-[10px] rounded-[10px] text-white text-[18px] border-0 border-purple w-[200px] m-auto cursor-pointer"
            />
          </form>
          <div className="toRegister flex flex-row w-full justify-center items-center gap-[20px] ">
            <p className="text-[18px]">Tizimga kirish.</p>
            <button onClick={changeTogle} className=" text-[14px] hover:text-[18px] text-indigi underline " >Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

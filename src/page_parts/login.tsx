import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLogin } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  changeTogle: () => void;
}

export default function Login({ changeTogle }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync({ username, password })
      .then((res) => {
        console.log(res);
        toast.success("Successfuly!");
        navigate("/main");
      })
      .catch(() => {
        toast.error("Error");
      });
  };

  // aos animation 
  useEffect(() => {
    AOS.init({
      duration: 1000, // animatsiya davomiyligi (ms)
      once: true, // har doim emas, faqat birinchi ko‘rinishda
    });
  }, []);

  return (
    <div>
      <div data-aos="fade-up">
        <div className="formPart flex flex-col gap-[20px] max-w-[500px] w-full m-auto p-[10px] pt-[20px] rounded-[10px] mt-[10%] border-indigo-700 border-2 ">
          <form onSubmit={handleSubmit} className=" flex flex-col gap-[20px]  ">
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Username"
              className=" p-[10px] rounded-[10px] tex-gray-600 text-[18px] border-[1px] border-indigo-700 shadow-lg shadow-purple "
              required
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              className=" p-[10px] rounded-[10px] tex-gray-600 text-[18px] border-[1px] border-indigo-700 "
              required
            />
            <input
              type="submit"
              value="Login"
              className=" p-[10px] bg-indigo-700 bordr-0 text-white hover:bg-indigo-500 hover:pointer rounded-[10px] tex-gray-600 text-[18px] border-[1px] border-purple w-[200px] m-auto "
              onSubmit={() => {}}
            />
          </form>
          <div className="toRegister flex flex-row w-full justify-center items-center gap-[20px] ">
            <p className=" text-[18px]  ">Ro`yhatdan o`tish.</p>
            <button onClick={changeTogle} className=" text-[14px] hover:text-[18px] text-indigi underline " >register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

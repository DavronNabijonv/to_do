import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa";
import { TbSunLow } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import Modal from "../modal/modal";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import notfound from "../assets/Detective-check-footprint 1.png";
import { languageList } from "./language";

// get request for all information hook
import { useDeleteTodo, useTodos } from "../hooks/useTodo";
// byId request hook
import { useTodoById } from "../hooks/useTodo";
import { toast } from "react-toastify";

export default function MainPage() {

  const [lang,setLang] = useState<keyof typeof languageList>('uz');

  // request get all information
  const { data: todos, isLoading, error } = useTodos();

  // const all todos
  const AllTodo = todos;

  // get id number from user
  const [searchNum, setSearchNum] = useState<number>(0);

  // get id of todo tasks for search by id
  // let selectedId = todos?.[searchNum - 1]?._id;
  const [selectedId,setSelectedId] = useState(todos?.[searchNum - 1]?._id);

  const { data: todoById } = useTodoById(selectedId ?? "");

  // Update propsTodos only when selectedId changes
  useEffect(() => {
    if (todoById) {
      setPropsTodos([todoById]);
    }
  }, [todoById]);

  // reuqest get information by ID only if selectedId exists
  useEffect(() => {
    if (todos) {
      setPropsTodos(todos);
    }
  }, [todos]);

  // togle for dark light mode
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement; // ✅ TO‘G‘RI
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);
  

  // modal togle
  const [tog, setTog] = useState(false);

  // for show all todos
  const [propsTodos, setPropsTodos] = useState<ToDo[]>([]);

  // get uncomplated todo tasks
  const uncomplatedTodos = (todos ?? []).filter(
    (old: ToDo) => old.completed === false
  );

  // get complated todo tasks
  const complatedTodos = (todos ?? []).filter(
    (old: ToDo) => old.completed === true
  );

  // handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = searchNum > 0 ? todos?.[searchNum - 1]?._id : "";
    if (id) {
      setSelectedId(id); // update selectedId to fetch the todoById
    }
  };

  return (
    <div className="mainPage bg-white dark:bg-indigo-700 max-w-[900px] w-full mx-auto flex flex-col flex-wrap gap-[15px] h-[100%] relative mt-[100px] ">
      <h1 className=" text-center font-[700] text-[24px] ">{languageList[lang].todolist}</h1>

      <div className=" flex flex-wrap justify-around items-center ">
        <form
          onSubmit={handleSearchSubmit}
          className=" border-1 rounded-[15px] py-[5px] px-[15px] border-indigo-700 flex items-center max-w-[450px]  w-full justify-between "
        >
          <input
            type="text"
            value={searchNum}
            onChange={(e) => setSearchNum(Number(e.target.value))}
            className=" text-gray-400 text-[18px] w-[90%] p-[5px] border-0 "
            placeholder="Search note..."
          />
          <button className=" bg-white border-0 bg-white text-[25px] text-indigo-800 ">
            <CiSearch />
          </button>
        </form>
        <select 
        onChange={(e)=>{
          const value = e.target.value as keyof typeof languageList;
          setLang(value);
        }}
        className=" bg-indigo-700 text-white text-[22px] rounded-[8px] p-[5px] ">
          <option
            value="uz"
            className=" bg-white text-indigo-700 hover:bg-indigo-400 "
          >
            Uzbek
          </option>
          <option
            value="ru"
            className=" bg-white text-indigo-700 hover:bg-indigo-400 "
          >
            Russian
          </option>
          <option
            value="eng"
            className=" bg-white text-indigo-700 hover:bg-indigo-400 "
          >
            English
          </option>
        </select>
        <select
          onChange={(e) => {
            const value = e.target.value;
            if (value === "ALL") setPropsTodos(AllTodo ?? []);
            else if (value === "complate") setPropsTodos(complatedTodos);
            else if (value === "incomplate") setPropsTodos(uncomplatedTodos);
          }}
          className=" max-w-[180px] bg-indigo-700 text-white text-[18px] rounded-[8px] p-[8px] "
        >
          <option
            value="ALL"
            className=" bg-white text-indigo-700 hover:bg-indigo-400 text-[19px] "
          >
            {languageList[lang].all}
          </option>
          <option
            value="complate"
            className=" bg-white text-indigo-700 hover:bg-indigo-400 text-[19px] "
          >
            {languageList[lang].complated}
          </option>
          <option
            value="incomplate"
            className=" bg-white text-indigo-700 hover:bg-indigo-400 text-[19px] "
          >
            {languageList[lang].uncomplated}
          </option>
        </select>
        <button
          className=" p-[10px] flex justify-center items-center text-[18px] rounded-[8px] bg-indigo-700 hover:bg-indigo-400 text-white  "
          onClick={() => {
            setDarkMode(!darkMode);
            console.log('salom')
          }}
        >
          {darkMode ? <TbSunLow /> : <FaRegMoon />}
        </button>
      </div>

      {isLoading ? (
        <p className="text-[25px] text-indigo-700 ">{languageList[lang].load}</p>
      ) : error ? (
        <p className="text-[25px]">{languageList[lang].error}</p>
      ) : !todos || !todoById ? (
        <img
          src={notfound}
          loading="lazy"
          className="  object-contain"
          alt="not found information"
        />
      ) : (
        <AllData byIdTodos={propsTodos} togleFunc={() => setTog(true)} />
      )}

      <div className=" w-full flex justify-end ">
        <button
          onClick={() => {
            setTog(!tog);
            alert("salom");
          }}
          className=" bg-indigo-700 text-white rounded-[100%] p-[10px] text-[20px] w-[60px] h-[60px] bottom-0 right-0 border-0 flex justify-center items-center "
        >
          <FaPlus />
        </button>
      </div>
      {/* {tog && (
        <Modal
          togModal={() => {
            setTog(false);
          }}
          language={languageList[lang]}
          editModal={}
        />
      )} */}
    </div>
  );
}


// get todo items
interface TodoById {
  byIdTodos: ToDo[];
  togleFunc:()=>void;
}

// todo requeriments
interface ToDo {
  title: String;
  completed: boolean;
  description: String;
  user: String;
  __v: Number;
  _id: string;
}

function AllData({ byIdTodos , togleFunc }: TodoById ) {

  const [editTodo,setEditTodo] = useState<ToDo | null>(null);

    

  const {mutateAsync} = useDeleteTodo();

  const delRequest = async (id: string) => {
    mutateAsync(id)
      .then((res) => {
        console.log("Modal succes:", res);
        toast.success("Successfully!");
      })
      .catch(() => {
        toast.error("Error");
      });
  };

  return (
    <>
      <div>
        {(byIdTodos ?? []).map((item: ToDo) => (
          <form
            key={item._id}
            className="border-b-[1px] border-b-indigo-700 mt-[20px] pb-[10px] flex justify-between items-center  "
          >
            <div className=" flex items-center gap-[20px] " >
              <input type="checkbox" checked={item.completed} />
              <p
                className={`${
                  item.completed ? "line-through text-gray-500 " : "text-black "
                } text-[20px] `}
              >
                {item.title}
              </p>
            </div>
            <div className=" flex gap-[15px] items-center ">
              <button onClick={(e)=>{
                e.preventDefault();
                togleFunc();
                setEditTodo(item);
              }} className="border-0 bg-none text-gray-500 text-[22px] hover:cursor-pointer hover:text-indigo-700 ">
                <CiEdit />
              </button>
              <button
               onClick={() => delRequest(item._id)}
              className="border-0 bg-none text-gray-500 text-[18px] hover:cursor-pointer hover:text-red-700 ">
                <FaRegTrashAlt />
              </button>
            </div>
          </form>
        ))}
      </div>
    </>
  );
}

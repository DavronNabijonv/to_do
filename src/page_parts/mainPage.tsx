import { useCallback, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa";
import { TbSunLow } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import Modal from "../modal/modal";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import notfound from "../assets/Detective-check-footprint 1.png";

// get request for all information hook
import { useTodos } from "../hooks/useTodo";
// byId request hook
import { useTodoById } from "../hooks/useTodo";

export default function MainPage() {


  // request get all information
  const { data: todos, isLoading, error } = useTodos();

  // const all todos
  const AllTodo = todos;

  // get id number from user
  const [searchNum, setSearchNum] = useState<number>(0);

  // get id of todo tasks for search by id
  let selectedId = todos?.[searchNum - 1]?._id;

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
    <div className="mainPage max-w-[900px] w-full mx-auto flex flex-col flex-wrap gap-[15px] h-[100%] relative mt-[100px] ">
      <h1 className=" text-center font-[700] text-[24px] ">TODO LIST</h1>

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
        <select className=" bg-indigo-700 text-white text-[22px] rounded-[8px] p-[5px] ">
          <option
            value="uz"
            className=" bg-white text-indigo-700 hover:bg-indigo-400 "
          >
            English
          </option>
          <option
            value="ru"
            className=" bg-white text-indigo-700 hover:bg-indigo-400 "
          >
            Russian
          </option>
          <option
            value="en"
            className=" bg-white text-indigo-700 hover:bg-indigo-400 "
          >
            Uzbek
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
            ALL
          </option>
          <option
            value="complate"
            className=" bg-white text-indigo-700 hover:bg-indigo-400 text-[19px] "
          >
            Complate
          </option>
          <option
            value="incomplate"
            className=" bg-white text-indigo-700 hover:bg-indigo-400 text-[19px] "
          >
            Incomplate
          </option>
        </select>
        <button
          className=" p-[10px] flex justify-center items-center text-[18px] rounded-[8px] bg-indigo-700 hover:bg-indigo-400 text-white  "
          onClick={() => {
            setDarkMode(!darkMode);
          }}
        >
          {darkMode ? <TbSunLow /> : <FaRegMoon />}
        </button>
      </div>

      {isLoading ? (
        <p className="text-[25px] text-indigo-700 ">Yuklanmoqda</p>
      ) : error ? (
        <p className="text-[25px]">Xatolik</p>
      ) : !todos || !todoById ? (
        <img src={notfound} loading="lazy" className="  object-contain" alt="not found information" />
      ) : (
        <AllData byIdTodo={{ byIdTodos: propsTodos }} />
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
      {tog && (
        <Modal
          togModal={() => {
            setTog(false);
            alert("salom");
          }}
        />
      )}
    </div>
  );
}

interface TodoById {
  byIdTodos: ToDo[];
}

interface ToDo {
  title: String;
  completed: boolean;
  description: String;
  user: String;
  __v: Number;
  _id: string;
}

function AllData({ byIdTodo }: { byIdTodo: TodoById }) {
  return (
    <>
      <div>
        {(byIdTodo.byIdTodos ?? []).map((item: ToDo) => (
          <div key={item._id} className="border-b-1px border-b-indigo-700  ">
            <input type="checkbox" checked={item.completed} />
            <p
              className={`${
                item.completed ? "line-through text-gray-500 " : "text-black "
              }`}
            >
              {item.title}
            </p>
            <div className=" flex gap-[15px] items-center ">
              <button className="border-0 bg-none text-gray-500 text-[18px]">
                <CiEdit />
              </button>
              <button className="border-0 bg-none text-gray-500 text-[18px]">
                <FaRegTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

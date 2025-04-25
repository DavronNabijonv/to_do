import React, { useState } from "react";
import { useAddTodo } from "../hooks/useTodo";
import { toast } from "react-toastify";


  // todo requeriments
interface ToDo {
  title: String;
  completed: boolean;
  description: String;
  user: String;
  __v: Number;
  _id: string;
}


  interface TogleModal {
    togModal: () => void;
    language:Record<string,string>;
  }

  interface EditModal{
    togleEdit:boolean;
    editTodo:{};
  }

export default function Modal({ togModal , language }: TogleModal,) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [compCheck, setCompCheck] = useState(false);
  const {mutateAsync} = useAddTodo();

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompCheck(e.target.checked);
  };

  const sendRequest = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    mutateAsync({title,description})
    .then((res)=>{
        console.log('Modal succes:',res);
        toast.success("Successfuly!");
        togModal();
    })
    .catch(() => {
        toast.error("Error");
      });
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
      {/* Modal Overlay */}
      <div
        className="absolute w-full h-full bg-gray-300 opacity-[0.5] bg-opacity-50 z-40"
        onClick={togModal}
      ></div>

      {/* Modal Body */}
      <div className="relative z-50 bg-white rounded-lg p-6  shadow-lg w-full max-w-[500px]">
        <h2 className="text-xl font-bold mb-4 text-center">{language.newnote}</h2>
        <form className="flex flex-col gap-[20px]" onSubmit={sendRequest} > 
          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded bg-white"
          />
          <textarea
            placeholder="Note text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded bg-white"
          ></textarea>

          <div className="flex justify-between w-full items-center">
                <span>{language.complated}</span>
              <input
                type="checkbox"
                checked={compCheck}
                onChange={handleCheckbox}
              />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={togModal}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              {language.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {language.apply}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

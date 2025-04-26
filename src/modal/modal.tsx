import { useEffect, useState } from "react";
import { useAddTodo, useUpdateTodo } from "../hooks/useTodo";
import { toast } from "react-toastify";

interface Props {
  togModal: () => void;
  language:Record<string,string>;
  editModal: EditToDo | null;
}

interface EditToDo {
  title: string;
  completed: boolean;
  description: string;
  user: string;
  __v: number;
  _id: string;
}

export default function Modal({ togModal, language, editModal }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [compCheck, setCompCheck] = useState(false);

  const { mutateAsync: createTodo } = useAddTodo();
  const { mutateAsync: updateTodo } = useUpdateTodo();

  // Tahrirlash rejimida inputlarni to‘ldirish
  useEffect(() => {
    if (editModal) {
      setTitle(editModal.title as string);
      setDescription(editModal.description as string);
      setCompCheck(editModal.completed);
    }
  }, [editModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo = {
      title,
      description,
      completed: compCheck,
    };

    try {
      if (editModal) {
        await updateTodo({
          id: editModal._id,
          update: newTodo,
        });
        toast.success("Successfully updated!");
      } else {
        await createTodo(newTodo);
        toast.success("Successfully created!");
      }
      togModal(); // Modalni yopish
    } catch (err) {
      toast.error("Error occurred");
    }
  };

  return (
    <div className=" fixed top-0 left-0 w-full h-full bg-black/40 z-[100] flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className=" bg-white dark:bg-slate-800 w-[90%] max-w-[500px] p-[30px] rounded-xl flex flex-col gap-4 shadow-xl "
      >
        <h2 className=" text-center text-2xl font-bold text-indigo-700 ">
          {editModal ? language.editnote : language.newnote}
        </h2>

        <input
          type="text"
          className=" border p-2 rounded-md text-[18px] "
          placeholder={language.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className=" border p-2 rounded-md text-[18px] "
          placeholder={language.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label className=" flex items-center gap-3 text-[18px] ">
          <input
            type="checkbox"
            checked={compCheck}
            onChange={(e) => setCompCheck(e.target.checked)}
          />
          {language.complated}
        </label>
        <div className=" flex justify-between gap-4">
          <button
            type="button"
            onClick={togModal}
            className=" bg-gray-400 hover:bg-gray-500 text-white p-2 px-4 rounded-md w-full "
          >
            {language.cancel}
          </button>
          <button
            type="submit"
            className=" bg-indigo-700 hover:bg-indigo-500 text-white p-2 px-4 rounded-md w-full "
          >
            {editModal ? language.edit : language.apply}
          </button>
        </div>
      </form>
    </div>
  );
}

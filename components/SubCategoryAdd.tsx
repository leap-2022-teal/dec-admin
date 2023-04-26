import React, { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import CategorySelector from "./CategorySelector";
import axios from "axios";

interface PropType {
  handleReload: () => void;
}

export default function SubCategoryAdd({ handleReload }: PropType) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");

  function createSubCategory() {
    if (parentId) {
      axios.post(`http://localhost:8000/categories`, { name, parentId }).then((res) => {
        const { status } = res;
        if (status === 200) {
          setShowModal(false);
          setName("");
          handleReload();
        }
      });
    }
  }

  function handleParent(e: any) {
    setParentId(e);
  }

  return (
    <>
      <button onClick={() => setShowModal(true)} className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded" />
      <ShareIcon className="mr-2" />
      Дэд ангилал нэмэх
      {showModal ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <span className=" font-bold">Дэд ангилал нэмэх</span>
                </div>
                {/*body*/}
                <CategorySelector value={parentId} handleSelected={handleParent} />
                <div className="relative p-6 flex-auto">
                  <div className="mb-6">
                    <input
                      placeholder="Ангилалаа оруулана уу?"
                      type="text"
                      id="default-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    хаах
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded block  focus:ring-4 focus:outline-none focus:ring-blue-300  text-sm  text-center "
                    type="button"
                    onClick={createSubCategory}
                  >
                    хадгалах
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </>
  );
}

import CategoryEditModal from "@/components/modals/categoryEditModal";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useRouter } from "next/router";
import ClearIcon from "@mui/icons-material/Clear";

export function SingleCategory({ category }: any) {
  console.log(category);
  function handleDelete() {
    if (window.confirm("Aнгилал устгах уу ?")) {
      axios
        .delete(
          `http://localhost:8000/categories/${
            category._id || category.subCategories.title._id
          } `
        )
        .then((res) => {
          const { status } = res;
          if (status === 200) {
          }
        });
      // console.log("deleted");
      // setIsUpdated(!isUpdated);
    }
  }

  return (
    <>
      <div
        key={category._id}
        className=" hover:bg-gray-100 flex justify-between p-10 my-2 w-[100%] "
      >
        <div className=" flex items-center font-bold ">{category.name}</div>

        <div className="">
          {category.subCategories?.map((subTitle: any) => (
            <div className=" bg-gray-100 rounded-[5px] border-solid border-1 hover:bg-gray-200 mb-2 p-2 flex justify-between">
              {subTitle.title}
              <div className=" hover:bg-gray-300 rounded-[5px] ml-3">
                <button onClick={handleDelete}>
                  <ClearIcon className=" text-red-500 hover:text-red-400 " />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className=" flex items-center">
          <CategoryEditModal category={category} />

          <button
            onClick={handleDelete}
            className=" hover:bg-gray-200 rounded-[5px] w-9 h-9 "
          >
            <DeleteIcon className="text-red-500 " />
          </button>
        </div>
      </div>
    </>
  );
}

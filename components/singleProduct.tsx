import axios from "axios";
import ProductEditModal from "./ProductEditModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "@/pages/products";
import Highlighter from "react-highlight-words";
interface Size {
  size: number;
  stock: number;
}
interface PropType {
  product: Product | undefined;
  onEdit: () => void;
  searchedQuery: string;
}

export function SingleProduct({ product, onEdit, searchedQuery }: PropType) {
  function handleDelete() {
    if (window.confirm(`${product?.name}-г  бүтээгдэхүүн устгах уу ?`)) {
      axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${product?._id}`).then((res) => {
        const { status } = res;
        if (status === 200) {
          onEdit();
        }
      });
    }
  }
  if (!product) return null;

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td>
          <img src={product.image.path} alt="" className=" w-32 py-3 rounded-[5px] object-cover object-center" />
        </td>
        <td className=" text-left font-bold">
          {" "}
          <Highlighter highlightClassName="p-0 bg-red" searchWords={[searchedQuery]} autoEscape={true} textToHighlight={product.name} />
        </td>
        <td className="text-left">${product.price}</td>
        <td className="text-left ">
          {product.sizes.map((size: Size) => {
            return <div>{size.size}</div>;
          })}
        </td>
        <td className="text-left ">
          {product.sizes.map((size: Size) => {
            return <div>{size.stock}</div>;
          })}
        </td>

        <td className="text-left">
          <div className=" pr-20 flex justify-end gap-4">
            <ProductEditModal product={product} key={product._id} onEdit={onEdit} />
            <button onClick={handleDelete} className=" hover:bg-gray-300 rounded-[5px] w-9 h-9 ">
              <DeleteIcon className=" text-red-600" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

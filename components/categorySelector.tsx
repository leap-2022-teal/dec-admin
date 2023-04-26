import React, { useEffect, useState } from "react";
interface Categories {
  name: string;
  parentId?: string;
  _id: string;
}
interface Props {
  handleSelected: (e: any) => void;
  value: any;
}

export default function CategorySelector({ handleSelected, value }: Props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  function handleChange(e: any) {
    handleSelected(e.target.value);
    console.log(e.target.value);
  }

  return (
    <>
      <select onChange={handleChange} className="mb-4 border-2 rounded-[5px] border-gray-300">
        <option value="">Ангилалаа сонгоно уу?</option>
        {categories.map((category: Categories) => {
          if (!category.parentId) {
            return (
              <option key={category._id} value={category._id} label={category.name}>
                {category.name}
              </option>
            );
          }
        })}
      </select>
    </>
  );
}
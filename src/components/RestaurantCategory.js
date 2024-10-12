import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowItems }) => {
  const handleClick = () => {
    setShowItems();
  };
  return (
    <div>
      <div className="w-6/12 mx-auto bg-gray-50 shadow-lg p-4 my-4 ">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="text-lg font-bold">
            {data.title}({data.itemCards.length})
          </span>
          <span>{"⬇️"}</span>
        </div>
        {showItems && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;

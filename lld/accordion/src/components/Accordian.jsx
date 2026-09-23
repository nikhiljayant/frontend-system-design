import { useState } from "react";

import AccordianItem from "./AccordianItem";

import { accordionData } from "../constants/constants";

// ----------------------------------------------------

const Accordian = () => {
  const [openItem, setOpenItem] = useState(1);

  return (
    <div className="w-[50%] m-auto mt-10">
      <h1 className="text-center font-bold text-3xl mb-5">Accordian</h1>

      <div className="flex flex-col gap-[5px]">
        {accordionData.map((item) => (
          <AccordianItem
            key={item.id}
            item={item}
            isOpen={item.id === openItem}
            setIsOpen={() =>
              item.id === openItem ? setOpenItem(null) : setOpenItem(item.id)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Accordian;

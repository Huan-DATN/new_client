import React from "react";
import HighlightCarousel from "./highlight-carousel";
import GroupProductCarousel from "./group-product-carousel";

function MainSection() {
  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <div className='flex flex-row gap-3 mt-5'>
        <HighlightCarousel data={undefined} />
        <HighlightCarousel data={undefined} />
      </div>

      <div className='flex flex-col justify-center items-center w-full mt-5'>
        <h4 className="text-center text-green-700 font-bold">Các danh mục</h4>
        <GroupProductCarousel />
      </div>
    </div>
  );
}

export default MainSection;

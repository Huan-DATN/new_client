import React from "react";
import TopHeader from "./top-header";
import BottomHeader from "./bottom-header";

function Header() {
  return (
    <div className='flex flex-col w-full shadow-md'>
      <TopHeader />
      <BottomHeader />
    </div>
  );
}

export default Header;

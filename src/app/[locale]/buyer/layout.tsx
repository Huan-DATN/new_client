import Header from "@/features/buyer/main/header/header";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen bg-gray-100'>
      <Header />
      <div className="flex">{children}</div>
    </div>
  );
}

export default layout;

import React from "react";
import { useState } from "react";

const ScrollTop = () => {
  const [open, setOpen] = useState(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) setOpen(true);
    else setOpen(false);
  });

  const handleClick = () => {
    //console.log(scrollY)
    const moveTostart = setInterval(() => {
      //console.log(scrollY)
      const y = window.scrollY;
      window.scrollTo(0, y - 200);
      if (y < 100) {
        window.scrollTo(0, 0);
        clearTimeout(moveTostart);
      }
    }, 4);
  };

  if (open)
    return (
      <div
        className="h-8 w-8 z-50 rounded border hover:border-black text-red-500 fixed bottom-8 tablet:right-8 right-3 flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lightRounder hover:-translate-y-1"
        onClick={() => handleClick()}
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      </div>
    );
  else return <></>;
};

export default ScrollTop;

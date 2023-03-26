import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const TopManga = ({ dataTopManga }) => {
  const data = dataTopManga;
  const frame = useRef(null);
  const [widthImg, setWidthImg] = useState(0);
  const [current, setCurrent] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let width = window.innerWidth;
    let num = 5;
    let margin = 96;
    if (width < 1024 && width > 767) {
      num = 4;
      margin = 80;
    }
    if (width < 768 && width > 375) {
      num = 2;
      margin = 48;
    }
    if (width <= 375) {
      num = 1;
      margin = 0;
    }
    setWidthImg((frame.current.offsetWidth - margin) / num);
  }, [data]);

  useEffect(() => {
    const handleWindowResize = () => {
      let width = window.innerWidth;
      let num = 5;
      let margin = 96;
      if (width < 1024 && width > 767) {
        num = 4;
        margin = 80;
      }
      if (width < 768 && width > 375) {
        num = 2;
        margin = 48;
      }
      if (width <= 375) {
        num = 1;
        margin = 0;
      }
      setWidthImg((frame.current.offsetWidth - margin) / num);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  useEffect(() => {
    const auto = setInterval(() => {
      if (!hover && data !== null) {
        if (current < 7) setCurrent((current) => current + 1);
        else setCurrent(0);
      }
    }, 5000);

    return () => clearInterval(auto);
  }, [data, current, hover]);

  return (
    <div
      ref={frame}
      className="bg-white relative overflow-hidden px-4"
      onMouseEnter={() => setHover((hover) => true)}
      onMouseLeave={() => setHover((hover) => false)}
    >
      <div className=" text-lg flex items-center font-semibold text-blue-500 py-2">
        <p>Truyện đề cử</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-right"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
      <div className="flex items-center relative mobile-L:max-h-none max-h-[30vh] overflow-hidden">
        <div
          className=" flex transition-all ease-in duration-300 relative mobile-L:max-h-none max-h-[30vh]"
          style={{ transform: `translateX(-${current * (widthImg + 16)}px)` }}
        >
          {data !== null && (
            <div className="flex absolute top-0 left-0 h-full">
              {data.map((item, index) => {
                return (
                  <a
                    key={index}
                    href={item.href_manga}
                    className={
                      index === 0
                        ? "mr-2 text-white relative w-full h-full"
                        : index === data.length - 1
                        ? "ml-2 text-white relative w-full h-full"
                        : "mx-2 text-white relative w-full h-full"
                    }
                    style={{ width: `${widthImg}px` }}
                  >
                    <div className="w-full absolute bottom-0 left-0  mobile-L:h-16 h-12 bg-[rgba(0,0,0,0.8)] text-white flex flex-col justify-between mobile-L:py-2 py-1 overflow-hidden">
                      <p className=" whitespace-nowrap text-center">
                        {item.name}
                      </p>
                      <div className="flex items-center justify-center desktop:text-sm tablet:text-xs mobile-S:text-sm text-xs">
                        <a
                          className="hover:text-blue-500"
                          href={item.href_chapter}
                        >
                          {item.chapter}
                        </a>
                        <div className=" mobile-L:ml-2 ml-6 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-stopwatch mr-1"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                            <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
                          </svg>
                          <p>{item.timeUpdate}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
          {data !== null &&
            data.map((item, index) => {
              return (
                <div
                  alt=""
                  key={index}
                  className={
                    index === 0
                      ? "mr-2 "
                      : index === data.length - 1
                      ? "ml-2 "
                      : "mx-2 "
                  }
                  style={{ width: `${widthImg}px` }}
                >
                  <img src={item.image} className="w-full h-full" alt="" />
                </div>
              );
            })}
        </div>
        <div className=" absolute top-1/2 -translate-y-1/2 left-0 w-full  flex items-center justify-between px-2">
          <div
            onClick={() =>
              current === 0
                ? setCurrent((current) => current + 7)
                : setCurrent((current) => current - 1)
            }
            className="p-4 rounded-full bg-[rgba(0,0,0,0.4)] shadow-lightRounder cursor-pointer flex items-center justify-center transition-all duration-200 ease-linear hover:scale-125"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-chevron-left text-white"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </div>
          <div
            onClick={() =>
              current === 7
                ? setCurrent((current) => 0)
                : setCurrent((current) => current + 1)
            }
            className="p-4 rounded-full bg-[rgba(0,0,0,0.4)] shadow-lightRounder cursor-pointer flex items-center justify-center transition-all duration-200 ease-linear hover:scale-125"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-chevron-right text-white"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

TopManga.prototype = {
  dataTopManga: PropTypes.array.isRequired,
};

export default TopManga;

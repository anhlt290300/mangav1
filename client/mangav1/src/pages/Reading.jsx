import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

const Reading = ({ data, chapters }) => {
  const navigate = useNavigate();

  const { pages, detail } = data;
  const { name, chapter, update_time } = detail;
  const { name_detail, href } = name;

  const path = useLocation().pathname;
  const currentChapter = chapters?.filter((el) => el.href === path)[0];

  const [preChapter, setPreChapter] = useState(null);
  const [posChapter, setPosChapter] = useState(null);
  const [listChapter, setListChapter] = useState(chapters);

  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    if (inputSearch.length !== 0) {
      if (inputSearch <= 0 || inputSearch > chapters.length)
        setListChapter(null);
      else {
        setListChapter([chapters[chapters.length - inputSearch]]);
      }
    } else setListChapter(chapters);
    //console.log(listChapter);
  }, [inputSearch, chapter, chapters]);

  useEffect(() => {
    chapters.forEach((element, index) => {
      if (element.href === path) {
        //console.log(index);
        if (index === chapters.length - 1)
          setPosChapter(chapters[chapters.length - 2]);
        else if (index === 0) setPreChapter(chapters[1]);
        else {
          setPosChapter(chapters[index - 1]);
          setPreChapter(chapters[index + 1]);
        }
      }
    });
  }, [chapters, path]);

  const [openChapters, setOpenChapters] = useState(false);

  return (
    <div className="">
      <div className=" bg-white pt-2">
        <div className="text-center">
          <div className=" text-center flex items-center justify-center text-xl">
            <div>
              <a
                href={href}
                className=" font-semibold text-blue-500 hover:text-purple-500 hover:border-b-purple-500 border-b-2 border-white"
              >
                {name_detail}
              </a>
              <p>{chapter}</p>
            </div>
          </div>
          <div className="text-center">
            <p>{update_time}</p>
          </div>
        </div>

        <div className="flex items-center justify-center py-4">
          <div
            onClick={() => {
              if (preChapter !== null) {
                navigate(`${preChapter.href}`);
                window.location.reload();
              }
            }}
            className={
              preChapter !== null
                ? "rounded rounded-r-none cursor-pointer w-8 h-8 bg-red-400 hover:bg-red-700 text-white flex items-center justify-center"
                : "rounded rounded-r-none cursor-pointer w-8 h-8 bg-gray-400 text-white flex items-center justify-center"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-caret-left-fill"
              viewBox="0 0 16 16"
            >
              <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg>
          </div>

          <div
            className="border border-black h-8 w-52 mx-1 flex items-center justify-between px-1 cursor-pointer"
            onClick={() => setOpenChapters((openChapters) => true)}
          >
            <p>{currentChapter.chapter}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-compact-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
              />
            </svg>
          </div>

          <div
            onClick={() => {
              if (posChapter !== null) {
                navigate(`${posChapter.href}`);
                window.location.reload();
              }
            }}
            className={
              posChapter !== null
                ? " rounded rounded-l-none cursor-pointer w-8 h-8 bg-red-400 hover:bg-red-700 text-white flex items-center justify-center"
                : " rounded rounded-l-none cursor-pointer w-8 h-8 bg-gray-400  text-white flex items-center justify-center"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-caret-right-fill"
              viewBox="0 0 16 16"
            >
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
          </div>
        </div>

        {openChapters ? (
          <div className="h-screen w-screen absolute top-0 left-0">
            <div className=" w-[40rem] shadow-black shadow-xl h-5/6 rounded overflow-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-black flex flex-col">
              <div className=" border-b border-gray-400 p-4 flex items-center justify-between">
                <input
                  className="w-4/5 outline-none border border-gray-400 py-1 rounded px-4 text-lg text-gray-400 focus:border-blue-500 focus:shadow-xl"
                  placeholder="Nhập số chap, ví dụ: 100"
                  type="number"
                  value={inputSearch}
                  onChange={(el) => setInputSearch(el.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-x font-semibold transition-all duration-150 ease-in hover:scale-110 hover:text-gray-500"
                  viewBox="0 0 16 16"
                  onClick={() => setOpenChapters((openChapters) => false)}
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </div>
              <div className="px-4 overflow-y-auto flex items-center justify-start">
                <div className=" grid grid-cols-4 gap-2 w-4/5 h-full py-4">
                  {listChapter &&
                    listChapter.map((item, index) => {
                      return (
                        <a
                          key={index}
                          href={item.href}
                          className={
                            currentChapter.chapter !== item.chapter
                              ? "py-4 px-2 flex items-center justify-center border border-gray-400 overflow-y-hidden hover:border-black cursor-pointer"
                              : "py-4 px-2 flex items-center justify-center border-2 border-red-500 text-red-500 overflow-y-hidden cursor-pointer"
                          }
                        >
                          {item.chapter}
                        </a>
                      );
                    })}
                </div>
              </div>
              <div className=" border-t border-gray-400 p-4 flex items-center justify-end">
                <div
                  className="py-1 px-2 rounded border border-gray-400 cursor-pointer hover:bg-gray-400"
                  onClick={() => setOpenChapters((openChapters) => false)}
                >
                  <p>Đóng</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="w-full py-2 bg-black flex flex-col items-center desktop:px-32">
        {pages &&
          pages.map((item, index) => {
            return (
              <img
                className={index % 2 === 0 ? "w-full" : "w-[90%]"}
                key={index}
                src={item.img}
                alt=""
              />
            );
          })}
      </div>

      <div className="flex items-center justify-center bg-white py-4">
        <div
          onClick={() => {
            if (preChapter !== null) {
              navigate(`${preChapter.href}`);
              window.location.reload();
            }
          }}
          className={
            preChapter !== null
              ? "mx-1 flex items-center justify-center h-8 px-2 rounded bg-red-400 hover:bg-red-700 text-white cursor-pointer"
              : "mx-1 flex items-center justify-center h-8 px-2 rounded bg-red-200  text-white cursor-pointer"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
          <p>Chap trước</p>
        </div>
        <div
          onClick={() => {
            if (posChapter !== null) {
              navigate(`${posChapter.href}`);
              window.location.reload();
            }
          }}
          className={
            posChapter !== null
              ? "mx-1 flex items-center justify-center h-8 px-2 rounded bg-red-400 hover:bg-red-700 text-white cursor-pointer"
              : "mx-1 flex items-center justify-center h-8 px-2 rounded bg-red-200 text-white cursor-pointer"
          }
        >
          <p>Chap Sau</p>
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
      </div>
    </div>
  );
};

Reading.propTypes = {
  data: PropTypes.object.isRequired,
  chapters: PropTypes.array.isRequired,
};

export default Reading;

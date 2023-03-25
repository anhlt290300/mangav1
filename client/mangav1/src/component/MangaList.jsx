import React from "react";
import PropTypes from "prop-types";

const MangaList = ({
  dataMangaUpdate,
  lastPage,
  pages,
  current,
  title,
  url,
}) => {
  const data = dataMangaUpdate;
  return (
    <div className="w-full bg-white">
      {title && (
        <div className=" text-lg flex items-center  font-semibold text-blue-500 pb-2">
          <p>{title}</p>
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
      )}
      <div className="grid tablet:grid-cols-4 mobile-M:grid-cols-2 grid-cols-1 gap-4">
        {data &&
          data.map((item, index) => {
            return (
              <div key={index} className=" font-semibold">
                <a href={item.href_manga}>
                  <img className="w-full h-[30vh]" src={item.image} alt="" />
                </a>
                <a
                  className="hover:text-blue-500 text-lg"
                  href={item.href_manga}
                >
                  <p className="mt-2">{item.name}</p>
                </a>
                <div className="text-sm">
                  {item.chapters.map((item_, index_) => {
                    return (
                      <div
                        className="w-full flex justify-between items-center my-2"
                        key={index_}
                      >
                        <a
                          className=" hover:text-blue-500"
                          href={item_.href_chapter}
                        >
                          {item_.chapter}
                        </a>
                        <p className=" text-xs text-gray-400 italic">
                          {item_.timeUpdate}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
      <div className=" tablet:flex w-full justify-center py-4 grid mobile-M:grid-cols-7 grid-cols-5 gap-2">
        {pages && current > 1 && (
          <a
            href={`${url}`}
            className="tablet:w-12 tablet:h-12 w-10 h-10 rounded border border-black flex items-center justify-center mx-1 cursor-pointer hover:bg-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-double-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
              <path
                fillRule="evenodd"
                d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </a>
        )}
        {pages && current !== 1 && (
          <a
            href={`${url}?page=${Number(current) - 1}`}
            className="tablet:w-12 tablet:h-12 w-10 h-10 rounded border border-black flex items-center justify-center mx-1 cursor-pointer hover:bg-gray-400"
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
          </a>
        )}
        {pages &&
          pages.map((item, index) => {
            return (
              <div
                className={
                  Number(item) === Number(current)
                    ? "tablet:w-12 tablet:h-12 w-10 h-10 rounded border bg-blue-500 text-white border-black flex items-center justify-center mx-1 cursor-pointer "
                    : "tablet:w-12 tablet:h-12 w-10 h-10 rounded border border-black flex items-center justify-center mx-1 cursor-pointer hover:bg-gray-400"
                }
                key={index}
              >
                <a
                  className="w-full h-full flex items-center justify-center"
                  href={`${url}?page=${item}`}
                >
                  <p>{item}</p>
                </a>
              </div>
            );
          })}
        {pages && current !== lastPage.page && (
          <a
            href={`${url}?page=${Number(current) + 1}`}
            alt="trang ke tiep"
            className="tablet:w-12 tablet:h-12 w-10 h-10 rounded border border-black flex items-center justify-center mx-1 cursor-pointer hover:bg-gray-400"
          >
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
          </a>
        )}
        {pages && current < lastPage.page - 1 && (
          <a
            href={`${url}?page=${lastPage.page}`}
            alt="trang ke tiep"
            className="tablet:w-12 tablet:h-12 w-10 h-10 rounded border border-black flex items-center justify-center mx-1 cursor-pointer hover:bg-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-double-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
              />
              <path
                fillRule="evenodd"
                d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

MangaList.prototype = {
  dataMangaUpdate: PropTypes.array.isRequired,
  lastPage: PropTypes.number.isRequired,
  pages: PropTypes.array.isRequired,
  current: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default MangaList;

import PropTypes from "prop-types";
import React, { useState } from "react";

const MangaDetail = ({data}) => {
  const [seemore, setSeeMore] = useState(false);

  return (
    <div className="w-full text-gray-500 px-4">
      <h1 className=" text-center text-2xl text-black">{data.name}</h1>
      <p className=" text-center italic text-sm">{data.updateTime}</p>
      <div className=" grid grid-cols-3 gap-8 text-lg">
        <img src={data.image} alt="" className="w-full" />
        <div className=" w-full col-span-2 h-full flex flex-col justify-between items-start">
          <div className="  flex flex-col items-center justify-around h-full">
            <div className="w-full grid gap-4 grid-cols-3">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-person-fill"
                  className="mr-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>
                Tác giả
              </p>
              <div className=" col-span-2">
                {data.info.authors.map((item, index) => {
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className="text-blue-500 font-semibold hover:text-purple-500"
                    >
                      <span className="hover:border-b hover:border-b-purple-500">
                        {item.author}
                      </span>
                      {index !== data.info.authors.length - 1 ? <> - </> : ""}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="w-full grid gap-4 grid-cols-3">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-rss"
                  className="mr-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M5.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-3-8.5a1 1 0 0 1 1-1c5.523 0 10 4.477 10 10a1 1 0 1 1-2 0 8 8 0 0 0-8-8 1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1 6 6 0 0 1 6 6 1 1 0 1 1-2 0 4 4 0 0 0-4-4 1 1 0 0 1-1-1z" />
                </svg>
                Tình trạng
              </p>
              <div className=" col-span-2">{data.info.status}</div>
            </div>
            <div className="w-full grid gap-4 grid-cols-3">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-tags-fill"
                  className="mr-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                  <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                </svg>
                Thể loại{" "}
              </p>
              <div className=" col-span-2">
                {data.info.genres.map((item, index) => {
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className="text-blue-500 font-semibold hover:text-purple-500"
                    >
                      <span className="hover:border-b hover:border-b-purple-500">
                        {item.genre}
                      </span>
                      {index !== data.info.genres.length - 1 ? <> - </> : ""}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="w-full grid gap-4 grid-cols-3">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-eye"
                  className="mr-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
                Lượt xem
              </p>
              <div className=" col-span-2">{data.info.view}</div>
            </div>
          </div>
          <div className="w-full flex items-end justify-start mt-8">
            <a
              className="px-4 py-1 rounded bg-yellow-500 text-white mr-2 hover:bg-yellow-600"
              href={data.chapters[data.chapters.length - 1]?.href}
            >
              Đọc từ đầu
            </a>
            <a
              className="px-4 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
              href={data.chapters[0]?.href}
            >
              Đọc mới nhất
            </a>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-start text-blue-500 text-lg font-semibold border-b-2 border-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-file-earmark-text mr-1"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
            <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
          </svg>
          <p>NỘI DUNG</p>
        </div>
        <p
          className={
            seemore
              ? "mt-2 text-black"
              : "mt-2 text-black max-h-[68px] overflow-hidden"
          }
        >
          {data.detail}
        </p>
        {seemore ? (
          <div className="w-full flex items-center justify-start text-blue-500 ">
            <div
              className=" cursor-pointer hover:text-purple-500 flex items-center justify-start "
              onClick={() => setSeeMore((seemore) => !seemore)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="currentColor"
                className="bi bi-chevron-left mr-[2px]"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
              <p>
                Rút gọn<nav></nav>
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-start relative text-blue-500 mb-2">
            <div
              className=" cursor-pointer hover:text-purple-500 flex items-center justify-start "
              onClick={() => setSeeMore((seemore) => !seemore)}
            >
              <p>Xem them</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="currentColor"
                className="bi bi-chevron-right ml-[2px]"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="w-full">
        <div className="flex items-center justify-start text-blue-500 text-lg font-semibold border-b-2 border-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-list-task mr-1"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"
            />
            <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
            <path
              fill-rule="evenodd"
              d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"
            />
          </svg>
          <p>DANH SÁCH CHƯƠNG</p>
        </div>
        <div className="grid-cols-4 grid text-black text-lg mt-4">
          <p className="col-span-2 ml-2">Số chương</p>
          <p className=" text-center">Cập nhập</p>
          <p className=" text-center">Xem</p>
        </div>
        <div className="p-2 rounded-md border border-gray-500 mt-1">
          {data.chaptersDetail.map((item, index) => {
            return (
              <div
                key={index}
                className={
                  index !== data.chaptersDetail.length - 2
                    ? "grid-cols-4 grid text-black border-b pb-1 border-dashed border-gray-500"
                    : "grid-cols-4 grid text-black"
                }
              >
                <a
                  className="col-span-2 text-black font-semibold hover:text-blue-500"
                  href={data.chapters[index].href}
                >
                  {data.chapters[index].chapter}
                </a>
                <p className=" text-center text-gray-500">{item.timeUpdate}</p>
                <p className=" text-center text-gray-500">{item.view}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

MangaDetail.propTypes = {
  data : PropTypes.object.isRequired
};

export default MangaDetail;

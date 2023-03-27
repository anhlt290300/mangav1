import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { deleteItem } from "../redux/historySlice";
const HistoryReading = ({ short }) => {
  const list = useSelector((state) => state.history.list);
  const dispatch = useDispatch();

  const delete_ = (manga) => {
    dispatch(deleteItem(manga));
  };
  if (short)
    return (
      <div className="w-full bg-white border border-gray-400 p-2 overflow-hidden">
        <div className="flex items-center justify-between w-full mb-2 ">
          <p className=" text-blue-500 font-semibold">Lịch sử đọc truyện</p>
          <a
            className=" italic hover:text-blue-500 hover:underline"
            href="/lich-su"
          >
            Xem tất cả
          </a>
        </div>
        <div>
          {list.map((item, index) => {
            return (
              <div
                key={index}
                className={
                  index < 3 ? "flex py-2 border-t border-gray-400" : "hidden"
                }
              >
                <a href={item.href_manga}>
                  <img
                    className=" min-w-[6rem] max-h-28"
                    src={item.image}
                    alt=""
                  />
                </a>
                <div className=" w-full overflow-hidden flex flex-col justify-start h-full pl-2 pt-2">
                  <a
                    className="w-full whitespace-nowrap hover:text-blue-500"
                    href={item.href_manga}
                  >
                    {item.manga}
                  </a>
                  <div className="flex items-center justify-between mt-2">
                    <a
                      className="flex items-center text-xs font-semibold text-gray-400 hover:text-blue-500 mobile-L:text-base mobile-M:text-sm"
                      href={
                        item.chapters[item.chapters.length - 1].href_chapter
                      }
                    >
                      Đọc tiếp{" "}
                      <span className="ml-1">
                        {item.chapters[item.chapters.length - 1].chapter}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
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
                    <div
                      onClick={() => delete_(item.manga)}
                      className="flex items-center font-semibold underline italic cursor-pointer hover:text-blue-500"
                    >
                      <p>Xóa</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  else return <div className="w-full bg-white cursor-pointer">123</div>;
};
HistoryReading.prototype = {
  short: PropTypes.bool,
};
export default HistoryReading;

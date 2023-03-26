import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { genres } from "../component/Header";
import MangaList from "../component/MangaList";
import Loading from "../component/Loading";

const chaptersList = [
  {
    chapter: 0,
  },
  {
    chapter: 50,
  },
  {
    chapter: 100,
  },
  {
    chapter: 200,
  },
  {
    chapter: 300,
  },
  {
    chapter: 400,
  },
  {
    chapter: 500,
  },
];

const statusList = [
  {
    status: "Tất cả",
    index: -1,
  },
  {
    status: "Đang tiến hành",
    index: 1,
  },
  {
    status: "Đã hoàn thành",
    index: 2,
  },
];

const genderList = [
  {
    status: "Tất cả",
    index: -1,
  },
  {
    status: "Con trai",
    index: 1,
  },
  {
    status: "Con gái",
    index: 2,
  },
];

const softByList = [
  {
    status: "Chapter mới",
    index: 0,
  },
  {
    status: "Truyện mới",
    index: 15,
  },
  {
    status: "Xem nhiều nhất",
    index: 10,
  },
  {
    status: "Xem nhiều nhất tháng",
    index: 11,
  },
  {
    status: "Xem nhiều nhất tuần",
    index: 12,
  },
  {
    status: "Xem nhiều nhất hôm nay",
    index: 13,
  },
  {
    status: "Số chapter nhiều nhất",
    index: 30,
  },
];

const AdvencedSearch = () => {
  const url = useLocation().pathname + useLocation().search;
  const param = useLocation().search;
  //console.log(param)
  const [data, setData] = useState(null);
  const [pages_, setPages_] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [current, setCurrent] = useState(1);
  const [openSearch, setOpenSearch] = useState(param === "" ? true : false);
  const [listCheck, setListCheck] = useState(
    genres.map((el) => {
      return {
        genre: el.genre,
        check: false,
      };
    })
  );

  const [minChapters, setMinChapters] = useState(0);
  const [status, setStatus] = useState(-1);
  const [gender, setGender] = useState(-1);
  const [softBy, setSoftBy] = useState(0);
  const [query, setQuery] = useState(
    `/tim-truyen-nang-cao?genres=&notgenres=&gender=-1&status=-1&minchapter=1&sort=0`
  );
  const toggleCheckbox = (genre) => {
    setListCheck((listCheck) =>
      listCheck.filter((el) => {
        if (el.genre === genre) {
          el.check = !el.check;
          return el;
        } else return el;
      })
    );
  };

  useEffect(() => {
    let list = listCheck.filter((el) => el.check);
    list = list.map((item) => {
      return Number(genres.findIndex((el) => el.genre === item.genre)) + 1;
    });
    let genres_ = "";
    list.forEach((el, index) =>
      index !== list.length - 1 ? (genres_ += `${el},`) : (genres_ += `${el}`)
    );
    let link = `/tim-truyen-nang-cao?genres=${list}&notgenres=&gender=${gender}&status=${status}&minchapter=${minChapters}&sort=${softBy}`;
    //console.log(link);
    setQuery((query) => link);
  }, [minChapters, status, gender, softBy, listCheck]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000${url}`)
      .then((res) => {
        let { mangas, pages } = res.data;
        let { page, href } = pages;
        setData(mangas);
        setLastPage({
          page: page,
          href: href,
        });
        let index =
          param === "" || Number(param.search("page")) === -1
            ? 1
            : param.slice(param.search("page") + 5);
        console.log(index);
        setCurrent(index);
        page = Number(page);
        index = Number(index);
        if (index <= page - 2 && index > 2)
          setPages_([
            index - 2,
            index - 1,
            index,
            Number(index) + 1,
            Number(index) + 2,
          ]);
        else if (index <= 2) setPages_([1, 2, 3, 4, 5]);
        else if (index > page - 2)
          setPages_([
            Number(page) - 4,
            Number(page) - 3,
            Number(page) - 2,
            Number(page) - 1,
            Number(page),
          ]);
        else console.log(`err`);
      })
      .catch((err) => {});
  }, [url, param]);

  if (data)
    return (
      <div className="text-center select-none bg-white px-4">
        <h1 className=" desktop:text-2xl text-xl font-semibold">
          Tìm truyện nâng cao
        </h1>
        {openSearch ? (
          <button
            onClick={() => setOpenSearch((openSearch) => !openSearch)}
            className="my-4 py-1 px-3 bg-cyan-500 inline-block text-white rounded cursor-pointer hover:bg-cyan-600 border-none border-black focus:border select-none w-[11.5rem]"
          >
            <div className="w-full flex items-center justify-between">
              <p>Ẩn khung tìm kiếm</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-double-up "
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"
                />
                <path
                  fillRule="evenodd"
                  d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                />
              </svg>
            </div>
          </button>
        ) : (
          <button
            onClick={() => setOpenSearch((openSearch) => !openSearch)}
            className="my-4 py-1 px-3 bg-cyan-500 inline-block text-white rounded cursor-pointer hover:bg-cyan-600 border-none border-black focus:border select-none w-[11.5rem]"
          >
            Hiện khung tìm kiếm
          </button>
        )}

        {openSearch && (
          <div>
            <div className="grid desktop:grid-cols-5 tablet:grid-cols-4 grid-cols-2 mb-4">
              <div className=" tablet:col-span-1 col-span-2 tablet:block tablet:mb-0 mb-2 flex items-center justify-between">
                <p className=" font-semibold select-none">Thể loại</p>
                <a
                  href="/tim-truyen-nang-cao"
                  className="flex items-center justify-center p-2 rounded text-white font-semibold bg-blue-500 hover:bg-blue-700 tablet:w-1/2 tablet:m-auto tablet:mt-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-clockwise mr-1"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                    />
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                  </svg>
                  <p>Reset</p>
                </a>
              </div>
              <div className=" desktop:col-span-4 tablet:col-span-3 col-span-2 grid desktop:grid-cols-4 tablet:grid-cols-3 grid-cols-2 tablet:gap-4 gap-2">
                {genres.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center select-none cursor-pointer"
                      onClick={() => toggleCheckbox(item.genre)}
                    >
                      <div className="flex items-center justify-center rounded border border-black mr-2 tablet:w-6 tablet:h-6 w-4 h-4">
                        {listCheck.filter((el) => el.genre === item.genre)[0]
                          .check ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-check"
                            viewBox="0 0 16 16"
                          >
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                          </svg>
                        ) : (
                          ""
                        )}
                      </div>
                      <span>{item.genre}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid tablet:grid-cols-2 grid-cols-1 tablet:gap-8 gap-2 tablet:mx-4">
              <div className="tablet:flex items-center justify-between">
                <p className="font-semibold w-64 text-left tablet:mb-0 mb-1">
                  Số lượng chapter
                </p>
                <select
                  onChange={(e) => setMinChapters(e.target.value)}
                  className="w-full pl-2 py-1 outline-none focus:border focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-700 rounded border border-gray-400"
                >
                  {chaptersList.map((item, index) => {
                    return (
                      <option key={index} value={item.chapter}>
                        {">"}&nbsp;{item.chapter}&nbsp;chapter
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="tablet:flex items-center justify-between">
                <p className="font-semibold w-64 text-left tablet:mb-0 mb-1">
                  Tình trạng
                </p>
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full pl-2 py-1 outline-none focus:border focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-700 rounded border border-gray-400"
                >
                  {statusList.map((item, index) => {
                    return (
                      <option key={index} value={item.index}>
                        {item.status}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="tablet:flex items-center justify-between">
                <p className="font-semibold w-64 text-left tablet:mb-0 mb-1">
                  Dành cho
                </p>
                <select
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full pl-2 py-1 outline-none focus:border focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-700 rounded border border-gray-400"
                >
                  {genderList.map((item, index) => {
                    return (
                      <option key={index} value={item.index}>
                        {item.status}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="tablet:flex items-center justify-between">
                <p className="font-semibold w-64 text-left tablet:mb-0 mb-1">
                  Sắp xếp theo
                </p>
                <select
                  onChange={(e) => setSoftBy(e.target.value)}
                  className="w-full pl-2 py-1 outline-none focus:border focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-700 rounded border border-gray-400"
                >
                  {softByList.map((item, index) => {
                    return (
                      <option key={index} value={item.index}>
                        {item.status}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <a
              href={query}
              className=" m-auto text-white rounded bg-lime-400 text-center inline-block px-4 py-2 cursor-pointer hover:bg-lime-600 my-4"
            >
              Tìm kiếm
            </a>
          </div>
        )}
        <MangaList
          pages={pages_}
          lastPage={lastPage}
          current={current}
          dataMangaUpdate={data}
          url={url.slice(0, url.search("page") - 1)}
          isSearch={true}
        />
      </div>
    );
  if (!data) return <Loading />;
};

export default AdvencedSearch;

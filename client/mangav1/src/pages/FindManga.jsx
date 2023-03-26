import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import MangaList from "../component/MangaList";
import { genres } from "../component/Header";
import Loading from "../component/Loading";

const FindManga = () => {
  const url = useLocation().pathname + useLocation().search;
  const param = useLocation().search;
  const genre = useParams().genre;
  const [data, setData] = useState(null);
  const [pages_, setPages_] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [current, setCurrent] = useState(1);
  const [title_, setTitle_] = useState(null);
  const [description_, setDescription_] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:4000${url}`)
      .then((res) => {
        let { mangas, pages, info } = res.data;
        let { title, description } = info;
        let { page, href } = pages;
        setTitle_(title);
        setDescription_(description);
        setData(mangas);
        setLastPage({
          page: page,
          href: href,
        });
        let index =
          param === ""
            ? 1
            : param.slice(
                6,
                param.indexOf("&&") === -1 ? param.length : param.indexOf("&&")
              );
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
      <div className=" relative z-0">
        <div className=" desktop:grid desktop:grid-cols-3 desktop:gap-4 bg-white pt-4 px-4">
          <div className=" desktop:col-span-2">
            <h1 className="text-center text-2xl font-semibold">{title_}</h1>
            <p className="px-4 py-2 border border-gray-400 my-4">
              {description_}
            </p>
            <MangaList
              pages={pages_}
              lastPage={lastPage}
              current={current}
              dataMangaUpdate={data}
              url={url}
            />
          </div>
          <div>
            <div className="ml-2 border border-gray-400 p-3 font-semibold">
              <p className=" text-blue-700 text-lg border-b border-gray-400 pb-2">
                Thể loại
              </p>
              <a
                className={
                  genre
                    ? "hover:text-purple-500 border-b border-gray-400 py-2 px-1 block"
                    : "text-purple-500 border-b border-gray-400 py-2 px-1 block"
                }
                href="/tim-truyen"
              >
                Tất cả thể loại
              </a>
              <div className="grid grid-cols-2">
                {genres.map((item, index) => {
                  return (
                    <a
                      key={index}
                      className={
                        index !== genres.length - 1 &&
                        item.genre.toLowerCase() === genre
                          ? "text-purple-500 border-b border-gray-400 py-2 px-1 block"
                          : index !== genres.length - 1 && item.genre !== genre
                          ? "hover:text-purple-500 border-b border-gray-400 py-2 px-1 block"
                          : index === genres.length - 1 && item.genre === genre
                          ? "text-purple-500 pt-2 px-1 block"
                          : "hover:text-purple-500 pt-2 px-1 block"
                      }
                      href={item.href}
                    >
                      {item.genre}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  if (!data) return <Loading />;
};

export default FindManga;

import React, { useEffect, useState } from "react";
import axios from "axios";
import TopManga from "../component/TopManga";
import MangaList from "../component/MangaList";
import HistoryReading from "../component/HistoryReading";
import Loading from "../component/Loading";
import { useLocation } from "react-router-dom";
const Home = () => {
  const [dataTopManga, setDataTopManga] = useState(null);

  const [dataMangaUpdate, setDataMangaUpdate] = useState(null);
  const [pages_, setPages_] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [current, setCurrent] = useState(1);

  const param = useLocation().search;
  const url = useLocation().pathname;
  useEffect(() => {
    axios
      .get(`http://localhost:4000${url + param}`)
      .then((res) => {
        let { topmangas, updatemangas, pages } = res.data;
        let { page, href } = pages;
        setDataMangaUpdate(updatemangas);
        setDataTopManga(topmangas);
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
      .catch((err) => alert(err));
  }, [param, url]);

  if (dataMangaUpdate)
    return (
      <div className=" relative z-0">
        <TopManga dataTopManga={dataTopManga} />
        <div className=" desktop:grid desktop:grid-cols-3 desktop:gap-4 bg-white pt-4 px-4">
          <div className=" desktop:col-span-2">
            <MangaList
              title="Truyện mới cập nhật"
              pages={pages_}
              lastPage={lastPage}
              current={current}
              dataMangaUpdate={dataMangaUpdate}
              url={url}
            />
          </div>
          <div className="">
            <HistoryReading short={true} />
          </div>
        </div>
      </div>
    );
  if (!dataMangaUpdate) return <Loading />;
};

export default Home;

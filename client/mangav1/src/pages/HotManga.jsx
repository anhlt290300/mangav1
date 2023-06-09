import React, { useEffect, useState } from "react";
import axios from "axios";
import TopManga from "../component/TopManga";
import MangaList from "../component/MangaList";
import HistoryReading from "../component/HistoryReading";
import { useLocation } from "react-router-dom";
import Loading from "../component/Loading";
const HotManga = () => {
  const [dataTopManga, setDataTopManga] = useState(null);

  const [dataHotManga, setDataHotManga] = useState(null);
  const [pages_, setPages_] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [current, setCurrent] = useState(1);

  const param = useLocation().search;
  const url = useLocation().pathname;
  //console.log(url + param);
  useEffect(() => {
    axios
      .get(`http://localhost:4000${url + param}`)
      .then((res) => {
        let { topmangas, hotmangas, pages } = res.data;
        let { page, href } = pages;
        setDataHotManga(hotmangas);
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
        //console.log(index);
        page = Number(page);
        index = Number(index);
        //console.log(index + ` ` + page);
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

  if (dataTopManga)
    return (
      <div className=" relative z-0 min-h-screen">
        <TopManga dataTopManga={dataTopManga} />
        <div className=" desktop:grid desktop:grid-cols-3 desktop:gap-4 bg-white pt-4">
          <div className=" desktop:col-span-2 mx-4">
            <MangaList
              title="Truyện hot nhất"
              pages={pages_}
              lastPage={lastPage}
              current={current}
              dataMangaUpdate={dataHotManga}
              url={url}
            />
          </div>
          <div className="">
            <HistoryReading />
          </div>
        </div>
      </div>
    );
  if (!dataHotManga) return <Loading />;
};

export default HotManga;

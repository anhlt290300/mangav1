import React, { useEffect, useState } from "react";
import Header from "./component/Header";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Home from "./pages/Home";
import MangaDetail from "./pages/MangaDetail";
import ErrorPage from "./component/ErrorPage";
import Loading from "./component/Loading";
import axios from "axios";
import Reading from "./pages/Reading";
import HotManga from "./pages/HotManga";
import FindManga from "./pages/FindManga";

const MainLayOut = () => {
  return (
    <div className=" min-h-screen w-full z-0 relative">
      <Header />
      <div className="desktop-L:px-40 desktop:px-12 tablet:px-4 w-full h-full m-auto bg-black pt-16">
        <Outlet />
      </div>
    </div>
  );
};

const MangaDetailRouter = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const { id_manga } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/truyen-tranh/${id_manga}`)
      .then((res) => {
        setData(res.data);
        //console.log(res.data)
      })
      .catch((err) => {
        setError((error) => true);
      });
  }, [id_manga]);

  if (error) return <ErrorPage />;
  else if (data === null) return <Loading />;
  else return <MangaDetail data={data} />;
};

const MangaChapterRouter = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [chapters, setChapters] = useState(null);
  const { id_manga, chapter, key } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/truyen-tranh/${id_manga}/${chapter}/${key}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError((error) => true);
      });

    axios
      .get(`http://localhost:4000/truyen-tranh/${id_manga}`)
      .then((res) => {
        setChapters(res.data?.chapters);
      })
      .catch((err) => {
        setError((error) => true);
      });
  }, [id_manga, chapter, key]);

  if (error) return <ErrorPage />;
  else if (data !== null && chapters !== null)
    return <Reading data={data} chapters={chapters} />;
  else return <Loading />;
};

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayOut />}>
          <Route index element={<Home />} />
          <Route
            path="truyen-tranh/:id_manga"
            element={<MangaDetailRouter />}
          />
          <Route
            path="truyen-tranh/:id_manga/:chapter/:key"
            element={<MangaChapterRouter />}
          />
          <Route path="/hot" element={<HotManga />} />
          <Route path="/tim-truyen" element={<FindManga />} />
          <Route
            path="/tim-truyen/:genre"
            element={<FindManga flagGenre={true} />}
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

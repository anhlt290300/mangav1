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

const MainLayOut = () => {
  return (
    <div className="flex flex-col justify-center w-1/2 h-full m-auto bg-white">
      <Header />
      <Outlet />
    </div>
  );
};

const MangaDetailRouter = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const { id_manga } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/truyentranh/?id_manga=${id_manga}`)
      .then((res) => {
        setData(res.data);
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
      .get(
        `http://localhost:4000/chapter/?id_manga=${id_manga}&chapter=${chapter}&key=${key}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError((error) => true);
      });

    axios
      .get(`http://localhost:4000/truyentranh/?id_manga=${id_manga}`)
      .then((res) => {
        setChapters(res.data?.chapters);
      })
      .catch((err) => {
        setError((error) => true);
      });
  }, [id_manga,chapter,key]);

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
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

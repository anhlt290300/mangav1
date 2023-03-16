import React from "react";
import Header from "./component/Header";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MangaDetail from "./pages/MangaDetail";

const MainLayOut = () => {
  return (
    <div className="flex flex-col justify-center w-1/2 m-auto bg-white">
      <Header />
      <Outlet />
    </div>
  );
};

export const App = () => {
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   axios.get("http://localhost:4000/get").then((res) => {
  //     //console.log(res.data)
  //     setData(res.data)
  //   });
  // }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayOut />}>
          <Route index element={<Home />} />
          <Route path="truyentranh/:name" element={<MangaDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

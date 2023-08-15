import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<DetailsPage />} />
      </Routes>
    </>
  );
};

export default App;

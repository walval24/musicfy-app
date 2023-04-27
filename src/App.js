
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Songs from "./components/Songs/Songs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="songs" element={<Songs />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;

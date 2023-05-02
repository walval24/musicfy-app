
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Songs from "./components/Songs/Songs";
import SongForm from "./components/SongForm/SongForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="songs" element={<Songs />}>
            <Route path="edit/:id" element={<SongForm />} /> 
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

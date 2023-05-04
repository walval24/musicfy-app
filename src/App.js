import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Songs from "./components/Songs/Songs";
import EditSong from "./components/SongForm/EditSong";
import NewSong from "./components/SongForm/NewSong";
import Artists from "./components/Artists/Artists";
import NewArtist from "./components/ArtistForm/NewArtist";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="songs" element={<Songs />}>
            <Route path="edit/:id" element={<EditSong />} /> 
            <Route path="new" element={<NewSong/>} />
          </Route>
          <Route path="artists" element={<Artists/>} />
          <Route path="artists/new" element={<NewArtist/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
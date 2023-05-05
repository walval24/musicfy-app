import { useParams } from "react-router-dom";
import ArtistForm from "./ArtistForm";
import { useGet } from "../_Hooks/Customs";





const EditArtist = () => {

  const { id } = useParams();

  const { data, error } = useGet("http://localhost:3432/artists", id)

  if (data) {
    return (

      <div className="container">
        <h5>Modifica Artista</h5>
        <ArtistForm data={data} />
      </div>
    );
  }
}

export default EditArtist;
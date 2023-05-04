import { Link } from "react-router-dom";
import { useGet } from "../_Hooks/Customs";
import ArtistItem from "./ArtistItem";



const Artists = () => {

    const { data, error, mutate } = useGet("http://localhost:3432/artists");

    if (data) {
        return (

            <>
                <div className="container">
                    <h5> Artisti</h5>
                    <Link to="new" className="btn btn-outline-success btn-sm">Nuovo Artista</Link>
                    <div className="row">
                        {data.map(artist => (
                            <ArtistItem key={artist.id} artist={artist} />
                        ))}
                    </div>
                </div>
            </>


        );
    }
}

export default Artists;
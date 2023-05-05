import { Link } from "react-router-dom";
import { useGet } from "../_Hooks/Customs";
import ArtistItem from "./ArtistItem";
import Alert from "../Alert/Alert";
import { useState } from "react";



const Artists = () => {

    const { data, error, mutate } = useGet("http://localhost:3432/artists");

    const [alertShow, setAlertShow] = useState(false);
    const [AlertMessage, setAlertMessage] = useState("");

    const alertDismiss = () => {
        setAlertShow(false);
        mutate();
    }

    const deleteSuccess = ()=> {
        setAlertMessage("Eliminazione avvenuta");
        setAlertShow(true);
    }


    if (data) {
        return (

            <>
                <div className="container">
                    <h5> Artisti</h5>
                    <Link to="new" className="btn btn-outline-success btn-sm">Nuovo Artista</Link>
                    <div className="row">
                        {data.map(artist => (
                            <ArtistItem key={artist.id} artist={artist}  deleteSuccess={deleteSuccess}/>
                        ))}
                    </div>
                </div>
                <Alert show={alertShow} onHide={alertDismiss} message={AlertMessage}/>
            </>


        );
    }
}

export default Artists;
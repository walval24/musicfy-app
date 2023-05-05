import { Link } from "react-router-dom";
import { useGet } from "../_Hooks/Customs";
import Alert from 'react-bootstrap/Alert';
import { useState } from "react";



const ArtistItem = ({ artist, deleteSuccess }) => {

    const [showDelete, setShowDelete] = useState(false);

    const { data, error } = useGet("http://localhost:3432/artists/" + artist.id + "/songs")

    const performeDelete = () => { };

    return (
        <article className="col-12">
            <div className="m-2 p-2 border">
                <div className="row">
                    <div className="col-12">
                        {artist.name}
                    </div>
                    <div className="col-6">
                        {artist.alias ? artist.alias : " No Alias"}
                    </div>
                    <div className="col-6">
                        {artist.birthDate ? artist.birthDate.substring(0, 10) : "Data non definita"}
                    </div>
                    <div className="col-12">
                        <div className="d-flex justify-content-around">
                            <Link className="btn btn-outline-info" to={"edit/" + artist.id}>
                                Modifica
                            </Link>
                            <button className="btn btn-outline-danger" onClick={performeDelete}>
                                Elimina
                            </button>
                        </div>
                    </div>
                    <div className="col-12">
                        <Alert show={showDelete} variant="success">
                            <Alert.Heading>How's it going?!</Alert.Heading>
                            <p>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
                                lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
                                fermentum.
                            </p>
                            <hr />
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-outline-success">
                                    Conferma
                                </button>
                                <button onClick={() => setShowDelete(false)} className="btn btn-outline-danger">
                                    Annulla
                                </button>
                            </div>
                        </Alert>

                    </div>

                </div>
            </div>

        </article>

    );
}

export default ArtistItem;
import { Link } from "react-router-dom";




const ArtistItem = ({ artist }) => {

    const performeDelete = () => {};

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
                            <button className="btn btn-outline-danger" onClick={performeDelete }>
                                Elimina
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </article>

    );
}

export default ArtistItem;
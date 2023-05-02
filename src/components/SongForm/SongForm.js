import { Link, useParams } from "react-router-dom";
import axios from "axios";
import useSWR from "swr";
import { useState } from "react";

const SongForm = () => {

    const {id} = useParams();

    const [song, setSong] = useState({
        name: "",
        duration: 0,
        price: 0.0,
        publishDate: null,
        idArtist: 0,
        idType: 0
    })

    const fetcher = (url) => axios.get(url).then(result => result.data);

    const {data, error} = useSWR("http://localhost:3432/songs/" + id,fetcher);

    const handleChange = (e) => {
        setSong((prevValues) => {
            return {
                ...prevValues,
                [e.target.name] : e.target.value
            }
        });
    }

    return (

        <>
            <div className="m-2 p-2 border">
             
                    <h5>Modifica Canzone</h5>
                    <form className=" row">
                        <div className=" col-6">
                            <label className=" form-lable">Titolo</label>
                            <input className=" form-control form-control-sm" name="name" value={song.name} onChange={handleChange}/>
                        </div>
                        <div className=" col-6">
                            <label className=" form-lable">Artista</label>
                            <input className=" form-control form-control-sm" />
                        </div>
                        <div className=" col-4">
                            <label className=" form-lable">Data</label>
                            <input className=" form-control form-control-sm" name="publishDate" value={song.publishDate} onChange={handleChange}/>
                        </div>
                        <div className=" col-4">
                            <label className=" form-lable">Genere</label>
                            <input className=" form-control form-control-sm" />
                        </div>
                        <div className=" col-2">
                            <label className=" form-lable">Durata</label>
                            <input className=" form-control form-control-sm" name="duration" value={song.duration} onChange={handleChange} />
                        </div>
                        <div className=" col-2">
                            <label className=" form-lable">Prezzo</label>
                            <input className=" form-control form-control-sm" name="price" value={song.price} onChange={handleChange}/>
                        </div>
                        <div className="col-12">
                            <div className=" d-flex justify-content-around mt-3">
                            <button className=" btn btn-success " type="submit">Salva</button>
                            <Link className=" btn btn-outline-danger " to="/songs">Annulla</Link>
                            </div>
                        </div>
                    </form>
                
            </div>
        </>

    );

}

export default SongForm;
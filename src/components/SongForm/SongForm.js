import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGet, usePut } from "../_Hooks/Customs";
import FetchSelect from "../FetchSelect/FetchSelect";
import Alert from "../Alert/Alert";

const SongForm = () => {

    const {id} = useParams();

    const [song, setSong] = useState({
        name: "",
        duration: 0,
        price: 0.0,
        publishDate: "",
        idArtist: 0,
        idType: 0
    })

    const [alertShow, setAlertShow] = useState(false); // Variabile di stato per gestire la visualizzazione dell'alert
    const [alertMessage, setAlertMessage] = useState(""); //  // Variabile di stato per gestire il messaggio dell'alert

    const {data, error} = useGet("http://localhost:3432/songs",id);

    const submitData = usePut("http://localhost:3432/songs",id); // usePut restituiesce la funzione per il salvataggio dei dati

    const navigate = useNavigate();

    const {mutate} = useOutletContext(); // useOutletContext permette di reperire le proprietà e o funzioni passate al context dall'outlet (vedi songs.js)


    useEffect(() => {
        if(data){
    setSong({
        name: data.name,
        duration: data.duration,
        price: data.price,
        publishDate: data.publishDate ? data.publishDate : "",
        idArtist: data.idArtist,
        idType: data.idType
    });
}
}, [data])

    const handleChange = (e) => {
        setSong((prevValues) => {
            return {
                ...prevValues,
                [e.target.name] : e.target.value
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
            // Codice per Salvataggio
        submitData(song, submitSuccess); // data -> song; successFn -> submitSuccess ( vedi Customs.js / usePut)
        
    }

    const submitSuccess = () => {
        setAlertMessage("Salvataggio completato")
        setAlertShow(true);
    }

    const alertDismiss = () => {
        setAlertShow(false);
        navigate("/songs", {replace: true});
        mutate();
    }

    return (

        <>
            <div className="m-2 p-2 border">
             
                    <h5>Modifica Canzone</h5>
                    <form className=" row" onSubmit={handleSubmit}>
                        <div className=" col-6">
                            <label className=" form-lable">Titolo</label>
                            <input className=" form-control form-control-sm" name="name" value={song.name} onChange={handleChange}/>
                        </div>
                        <div className=" col-6">
                            <label className=" form-lable">Artista</label>
                            <FetchSelect  className=" form-control form-control-sm" name="idArtist" value={song.idArtist} onChange={handleChange} url={"http://localhost:3432/artists"}/>
                        </div>
                        <div className=" col-4">
                            <label className=" form-lable">Data</label>
                            <input className=" form-control form-control-sm" type="date" name="publishDate" value={song.publishDate.substring(0,10)} onChange={handleChange}/>
                        </div>
                        <div className=" col-4">
                            <label className=" form-lable">Genere</label>
                            <FetchSelect  className=" form-control form-control-sm" name="idType" value={song.idType} onChange={handleChange} url={"http://localhost:3432/types"}/>
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
                    <Alert show={alertShow} onHide={alertDismiss} message ={alertMessage} />
                
            </div>
        </>

    );

}

export default SongForm;
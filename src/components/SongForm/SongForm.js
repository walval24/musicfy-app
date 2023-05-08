import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePost, usePut } from "../_Hooks/Customs";
import FetchSelect from "../FetchSelect/FetchSelect";
import Alert from "../Alert/Alert";

const SongForm = ({ data = {}, mutate }) => {

    const [song, setSong] = useState({
        name: "",
        duration: 0,
        price: 0.0,
        publishDate: "",
        idArtist: 0,
        idType: 0,
        cover: "",
    })

    const [alertShow, setAlertShow] = useState(false); // Variabile di stato per gestire la visualizzazione dell'alert
    const [alertMessage, setAlertMessage] = useState(""); //  // Variabile di stato per gestire il messaggio dell'alert

    const putData = usePut("http://localhost:3432/songs", data.id); // usePut restituiesce la funzione per il salvataggio dei dati

    const postData = usePost("http://localhost:3432/songs"); // // usePost restituiesce la funzione per la cereazione dato dei dati

    const navigate = useNavigate();

    useEffect(() => {
        if (data.id > 0) {
            setSong({
                name: data.name,
                duration: data.duration,
                price: data.price,
                publishDate: data.publishDate ? data.publishDate : "",
                idArtist: data.idArtist,
                idType: data.idType,
                cover: "",
            });
        }
    }, [data.id, data.name, data.duration, data.price, data.publishDate, data.idArtist, data.idType])

    const getBase64 = async (file) => {

        const base64prefix = "data:image/jpeg;base64,"

        var reader = new FileReader();       // Creo il file reader per leggere il file  

        await reader.readAsDataURL(file);   // con il metodo "readsAsDataUrl" leggo i dati del file passato come parametro
        reader.onload = function () {           // creo una funzione di load che viene eseguita in modo asincrono quando il caricamento è completato
            setSong((prevValues) => {       // quando il file è caricato viene eseguito il setSong sul campo apposito
                return {
                    ...prevValues,
                    "cover": reader.result.replace(base64prefix, "")  // Con replace sul result, rimuovo il prefisso di base64
                }
            });
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    const handleChange = (e) => {
        if (e.target.name === 'cover') {
            getBase64(e.target.files[0])
        }
        setSong((prevValues) => {
            return {
                ...prevValues,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Codice per Salvataggio
        if (data.id > 0) {
            putData(song, submitSuccess); // data -> song; successFn -> submitSuccess ( vedi Customs.js / usePut)
        }
        else {
            postData(song, submitSuccess);
        }

    }

    const submitSuccess = () => {
        setAlertMessage("Salvataggio completato")
        setAlertShow(true);
    }

    const alertDismiss = () => {
        setAlertShow(false);
        navigate("/songs", { replace: true });
        mutate();
    }

    return (

        <>

            <form className=" row" onSubmit={handleSubmit}>
                <div className=" col-6">
                    <label className=" form-lable">Titolo</label>
                    <input className=" form-control form-control-sm" name="name" value={song.name} onChange={handleChange} />
                </div>
                <div className=" col-6">
                    <label className=" form-lable">Artista</label>
                    <FetchSelect className=" form-control form-control-sm" name="idArtist" value={song.idArtist} onChange={handleChange} url={"http://localhost:3432/artists"} />
                </div>
                <div className=" col-4">
                    <label className=" form-lable">Data</label>
                    <input className=" form-control form-control-sm" type="date" name="publishDate" value={song.publishDate.substring(0, 10)} onChange={handleChange} />
                </div>
                <div className=" col-4">
                    <label className=" form-lable">Genere</label>
                    <FetchSelect className=" form-control form-control-sm" name="idType" value={song.idType} onChange={handleChange} url={"http://localhost:3432/types"} />
                </div>
                <div className=" col-2">
                    <label className=" form-lable">Durata</label>
                    <input className=" form-control form-control-sm" type="number" min={0} name="duration" value={song.duration} onChange={handleChange} />
                </div>
                <div className=" col-2">
                    <label className=" form-lable">Prezzo</label>
                    <input className=" form-control form-control-sm" type="number" min={0} name="price" value={song.price} onChange={handleChange} />
                </div>
                <div className=" col-12">
                    <label className=" form-lable">Immagine</label>
                    <input className=" form-control form-control-sm" type="file" name="cover" onChange={handleChange} />
                </div>
                <div className="col-12">
                    <div className=" d-flex justify-content-around mt-3">
                        <button className=" btn btn-success " type="submit">Salva</button>
                        <Link className=" btn btn-outline-danger " to="/songs">Annulla</Link>
                    </div>
                </div>
            </form>
            <Alert show={alertShow} onHide={alertDismiss} message={alertMessage} />


        </>

    );

}

export default SongForm;
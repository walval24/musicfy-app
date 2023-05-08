
import Table from 'react-bootstrap/Table';
import SongRow from "./SongRow";
import { Outlet, Link } from "react-router-dom";
import { useGet } from "../_Hooks/Customs";
import { useState } from 'react';
import Alert from '../Alert/Alert';
import { URL_SONGS } from '../_Utils/Constants';

const Songs = () => {

    const { data, error, isLoading, mutate } = useGet(URL_SONGS);

    const [alertShow, setAlertShow] = useState(false);
    const [AlertMessage, setAlertMessage] = useState("");

    const alertDismiss = () => {
        setAlertShow(false);
        mutate();
    }

    const deleteSuccess = ()=> {
        setAlertMessage("Canzone eliminiata");
        setAlertShow(true);
    }




    if (data) {

        return (
            <div className="container">
                <Link className="btn btn-sm btn-outline-success" to="new">Nuova Canzone </Link>
                <Outlet context={{ mutate }} /> {/* L'attributo context permette d ipassare proprietà e/o funzioni al componente che verrà renderizzato  */}
                <h4>Elenco Brani</h4>
                <Table responsive>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Cover</th>
                            <th>Titolo</th>
                            <th>Genere</th>
                            <th>Durata</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(song => (
                            <SongRow key={song.id} song={song} deleteSuccess={deleteSuccess} />
                        ))}
                    </tbody>
                </Table>

                <Alert show={alertShow} onHide={alertDismiss } message={ AlertMessage} />

            </div>
        );
    }
}

export default Songs;
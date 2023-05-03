
import Table from 'react-bootstrap/Table';
import SongRow from "./SongRow";
import { Outlet, Link } from "react-router-dom";
import { useGet } from "../_Hooks/Customs";

const Songs = () => {

    const {data, error, isLoading, mutate} = useGet("http://localhost:3432/songs");

    if (data) {

        return (
            <div className="container">
                <Link className="btn btn-sm btn-outline-success" to="new">Nuova Canzone </Link>
                <Outlet context={{mutate}}/> {/* L'attributo context permette d ipassare proprietà e/o funzioni al componente che verrà renderizzato  */}
                <h4>Elenco Brani</h4>
                <Table responsive>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Titolo</th>
                            <th>Genere</th>
                            <th>Durata</th>
                        </tr>
                    </thead>
                <tbody>
                    {data.map(song => (
                        <SongRow key={song.id} song={song} />
                    ))}
                </tbody>
                </Table>
            </div>
        );
    }
}

export default Songs;
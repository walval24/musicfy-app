import SongForm from "./SongForm";
import { useOutletContext, useParams } from "react-router-dom";
import { useGet } from "../_Hooks/Customs";



const EditSong = () => {

    const { id } = useParams();

    const { data, error } = useGet("http://localhost:3432/songs", id);

    const { mutate } = useOutletContext(); // useOutletContext permette di reperire le proprietà e o funzioni passate al context dall'outlet (vedi songs.js)


    if (data) {
        return (
            <>
                <div className="m-2 p-2 border">

                    <h5>Modifica Canzone</h5>
                    <SongForm data={data} mutate={mutate} />
                </div>

            </>
        );
    }
}

export default EditSong;


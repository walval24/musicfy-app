import SongForm from "./SongForm";
import { useOutletContext } from "react-router-dom";

const NewSong = () => {


    const { mutate } = useOutletContext(); // useOutletContext permette di reperire le proprietà e o funzioni passate al context dall'outlet (vedi songs.js)

    return (
        <>
            <div className="m-2 p-2 border">

                <h5>Nuova Canzone</h5>
                <SongForm mutate={mutate} />
            </div>

        </>
    )
}

export default NewSong;


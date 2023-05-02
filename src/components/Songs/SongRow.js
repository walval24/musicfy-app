
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useGet } from "../_Hooks/Customs";


const SongRow = ({song})=> {




    const {data: type, error: typeError} = useGet("http://localhost:3432/types", song.idType);

    const {data: artist, error: artistError} = useGet("http://localhost:3432/artists", song.idArtist );

    const performDelete = () => {}

    return (
        <tr>
            <td className=" align-middle">
                <Link className="btn text-info" to={"edit/" + song.id}>
                    <FontAwesomeIcon icon={faPencil}/>
                </Link>
                <button className="btn text-danger"onClick={performDelete}>
                    <FontAwesomeIcon icon={faTrashCan}/>
                </button>
            </td>
            <td>
               <div>{song.name}</div> 
               <div className=" small">{artist ? artist.name : ""}</div> 
            
            </td>
            <td className=" align-middle">{type ? type.name : song.idType}</td>
            <td className=" align-middle">{song.duration}</td>
        </tr>

    );
}


export default SongRow;
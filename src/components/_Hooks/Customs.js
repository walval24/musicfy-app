import axios from "axios";
import useSWR from "swr";


const fetcher = (url) => axios.get(url).then(result => result.data);

const useGet = (url, id = 0) => {

    let finalUrl = url;
    if(id>0){
        finalUrl += ("/" + id);
    }

    const {data, error} = useSWR (finalUrl, fetcher);

    return {
        data : data,
        error: error,
        isLoading: !error && !data

    }

}
 
export {useGet};
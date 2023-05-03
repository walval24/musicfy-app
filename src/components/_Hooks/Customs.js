import axios from "axios";
import useSWR from "swr";


const fetcher = (url) => axios.get(url).then(result => result.data);

const useGet = (url, id = 0) => {

    let finalUrl = url;
    if(id>0){
        finalUrl += ("/" + id);
    }

    const {data, error, mutate} = useSWR (finalUrl, fetcher);

    return {
        data : data,
        error: error,
        isLoading: !error && !data,
        mutate: mutate

    }

}

// FINE - UseGet

// INIZIO - UsePut -> Hook per modifica dati
const usePut = (url, id) => {

    const finalUrl = url + "/" + id;
    // usePut restituisce una funzione da restituire in fase di submit
    return (data, successFn) => {    // Data -> l'oggetto con i dati da salvare; successFn -> la funzione da eseguire nel then
        axios.put(finalUrl, data).then(result => {
            if(result.data){
                successFn(); // Se il salvataggio va a buon fine il "then" eseguirà òa funzione successFn
            }
        });
    }
}

// Fine - UsePut

 
export {useGet, usePut};
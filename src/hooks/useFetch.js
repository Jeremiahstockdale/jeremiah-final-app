//marry a state value with a url / http: GET request
import axios from 'axios';
import { useEffect, useState } from "react"

function useFetch(httpGetFunction, initialPayload, initialState) {

    const [value, setValue] = useState(initialState);

    useEffect(() => {
        reload(initialPayload);
    }, []);

    function reload(payload) {
        httpGetFunction(payload)
            .then(response => {
                setValue(response.data);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => { });
    }

    return [value, reload];

}

export { useFetch }
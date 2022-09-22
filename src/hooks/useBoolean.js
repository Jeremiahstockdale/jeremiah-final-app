import { useState } from "react";

function useBoolean(initialValue) {

    const [value, setValue] = useState(initialValue);

    function toggleValue(newValue) {
        console.log(newValue, typeof newValue !== 'boolean')
        if (newValue === undefined || typeof newValue !== 'boolean') {
            setValue(!value); //flip
        } else {
            setValue(newValue); //explicit set
        }
    }

    return [value, toggleValue];
}

export { useBoolean };


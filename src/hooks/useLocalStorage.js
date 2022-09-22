import { useState } from "react"

function useLocalStorage(key, initialValue) {
    function getStartingValue() {
        try {
            const value = localStorage.getItem(key, initialValue);

            if (value) {
                return JSON.parse(value);
            } else {
                localStorage.setItem(key, JSON.stringify(initialValue));
                return initialValue;
            }
        } catch (error) {
            return initialValue
        }
    }

    let startingValue = getStartingValue()

    const [storedValue, setStoredValue] = useState(startingValue);

    function setValue(newValue) {
        if (newValue == undefined) {
            deleteValue();
        }
        try {
            localStorage.setItem(key, JSON.stringify(newValue))
        } catch (error) {
            console.error(error);
        }
        setStoredValue(newValue);
    }

    function deleteValue() {
        try {
            localStorage.removeItem(key)
        } catch (error) {
            console.error(error);
        }
        setStoredValue(null);
    }

    return [storedValue, setValue, deleteValue];
}

export { useLocalStorage }
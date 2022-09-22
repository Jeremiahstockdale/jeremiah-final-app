import { useState } from "react"

function useArray(initialArr) {

    const [arr, setArr] = useState(initialArr || []);

    function addItem(newItem) {
        setArr([...arr, newItem]);
    }

    //below function removes item from array
    function removeItem(id) {
        setArr(arr.filter(item => id !== item.id));
    }

    // below function removes item at specific index
    function removeItemByIndex(i) {
        let arrCopy = [...arr];
        arrCopy.splicebv = [i, 1];
        setArr(arrCopy);
    }

    //below function edits item at specific index
    function editItemByIndex(i, newValue) {
        let arrCopy = [...arr];
        arrCopy[i] = newValue;
        setArr(arrCopy);
    }

    function editItemById(id, newValue) {
        setArr(arr.map(item => {
            if (id === item.id) {
                return newValue;
            } else {
                return item
            }
        }));
    }

    return [arr, { setArr, addItem, removeItem, removeItemByIndex, editItemById, editItemByIndex }];
}

export { useArray }
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import { addMoneyById } from '../../services/http.service';

export default function Profile() {

    let navigate = useNavigate();
    const { activeUser, logout, addFunds } = useContext(UserContext)
    const [addedPretendMoney, setAddedPretendMoney] = useState(0)
    var valueDisplay = Number(activeUser.account_value);

    function handleLogoutClicked() {
        logout()
            .then(response => {
                navigate("/home")
            })
            .catch((err) => {
                console.error(err)
            })
    }

    function handleMoneyChange(e) {
        const { value } = e.target;
        let placeholder = String(value);

        // gets rid of the leading zero, but does not let the state become undefined
        if (placeholder.charAt(0) === '0' && placeholder.length > 1) {
            placeholder = placeholder.substring(1);
        } else if (placeholder.length === 0) {
            placeholder = '0'
        }

        setAddedPretendMoney(placeholder)
    }


    function handleAddMoneySubmit(e) {
        e.preventDefault();

        let id = activeUser.id;
        let pretendMoney = activeUser.account_value + addedPretendMoney

        addMoneyById({ id, pretendMoney })
            .then(response => {
                addFunds(addedPretendMoney)
            })
            .catch((err) => {
                console.error(err)
            })
    }


    return (
        <div>
            <h2>{activeUser.username}'s profile</h2>
            <h2>${valueDisplay.toFixed(2)}</h2>

            <form onSubmit={handleAddMoneySubmit}>
                <label>Add preted money</label>
                <input className='text-box'
                    type='number'
                    name='addedPretendMoney'
                    value={addedPretendMoney}
                    onChange={handleMoneyChange}
                    placeholder="$$$"
                    step='.01'
                />
            </form>
            <button className='primary' onClick={handleLogoutClicked}>Log out</button>
        </div>
    )
}

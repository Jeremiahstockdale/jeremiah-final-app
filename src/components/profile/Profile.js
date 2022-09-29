import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import { addMoneyById } from '../../services/http.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import './Profile.css'
import { useBoolean } from '../../hooks/useBoolean';

export default function Profile() {

    const { activeUser, logout, addFunds } = useContext(UserContext)

    const [addedPretendMoney, setAddedPretendMoney] = useState()

    const [isFormShown, toggleIsFormShown] = useBoolean(false)

    let navigate = useNavigate();
    var valueDisplay = Number(activeUser?.account_value);
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })


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

        let id = activeUser?.id;
        let pretendMoney = Number(activeUser?.account_value) + Number(addedPretendMoney)

        addMoneyById({ id, pretendMoney })
            .then(response => {
                addFunds(addedPretendMoney)
            })
            .catch((err) => {
                console.error(err)
            })
    }


    return (
        <div className='profile-root'>

            <div className='address-name'>

                <div className='address-card'>
                    <FontAwesomeIcon icon={faAddressCard} />
                </div>

                <div>
                    <h2>{activeUser?.username}'s profile</h2>
                    <p className='date'>
                        Member since: {activeUser?.creation_date.substring(0, 10)}
                    </p>
                </div>

            </div>

            <h2 className='money'>
                {formatter.format(valueDisplay)}
            </h2>

            <p className='disclaimer'>in buying power</p>

            <button
                className='secondary'
                type='button'
                onClick={toggleIsFormShown}
            >
                Add pretend money
            </button>

            {isFormShown && <form onSubmit={handleAddMoneySubmit}>
                {/* <label>Add preted money</label> */}
                <input className='text-box'
                    type='number'
                    name='addedPretendMoney'
                    value={addedPretendMoney}
                    onChange={handleMoneyChange}
                    placeholder="How much?"
                    step='.01'
                    max='1000'
                />
            </form>}

            <div className='breaker'></div>

            <button
                className='primary'
                onClick={handleLogoutClicked}
            >
                Log out
            </button>

        </div>
    )
}

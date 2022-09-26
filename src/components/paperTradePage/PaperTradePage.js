import React, { useState } from 'react'
import LoadingScreen from '../loadingScreen/LoadingScreen'

export default function PaperTradePage() {

    const [likes, setLikes] = useState([])


    return (
        <div>
            <h1>Coming Soon</h1>
            <LoadingScreen />
        </div>
    )
}

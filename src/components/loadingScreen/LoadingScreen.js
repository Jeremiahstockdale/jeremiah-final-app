import React from 'react'
import './LoadingScreen.css'

export default function LoadingScreen() {
    return (
        <div className="oct-root">
            <div className='oct-wrapper'>
                <div className="octopus">
                    <div className="tentacle-container">

                        {Array(8).fill('').map((value, i) => (
                            <div key={i}
                                style={{ "--order": i }}
                                class="oct-tentacle arm">
                                <div className='segment-actual'>
                                    <div className='segment-parent'>
                                        <div className='segment-actual'>
                                            <div className='segment-parent'>
                                                <div className='segment-actual end'>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div class="oct-head">
                        <div className='face'>
                            <div className="oct-eye left"></div>
                            <div className="oct-eye right"></div>
                            <div className="mouth" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

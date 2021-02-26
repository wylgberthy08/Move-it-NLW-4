import { useState, useEffect, useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'



export function Countdown() {
    const {hasFinished,
         isactive, 
         minutes, 
         seconds, 
         resetCountdow, 
         startCountdown
        } = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

   

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button
                    disabled
                    className={`${styles.countdownButton}`}
                >
                    Ciclo encerrado
                </button>
            ) : (
                    <>
                        {isactive ? (
                            <button type="button"
                                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                                onClick={resetCountdow}
                            >
                                Abandonar ciclo
                            </button>
                        ) : (<button type="button"
                            className={styles.countdownButton}
                            onClick={startCountdown}
                        >
                            Iniciar um ciclo
                        </button>
                            )}

                    </>
                )}


        </div>

    )
}
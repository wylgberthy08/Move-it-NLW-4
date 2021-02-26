import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
    const {activeChallenge, resetChallenge, completedChallenge} = useContext(ChallengeContext)
    const {resetCountdow} = useContext(CountdownContext)

    function handleChallengeSucceeded() {
      completedChallenge()
      resetCountdow()
    }

    function handleChallengeFailed() {
        resetChallenge()
        resetCountdow()
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                   <header>{activeChallenge.amount}</header>
                   
                   <main>
                     <img src={`icons/${activeChallenge.type}.svg`} />
                     <strong>Novo Desafio</strong>
                     <p>{activeChallenge.description}</p>

                   </main>

                   <footer>
                       <button 
                       type="button"
                       className={styles.challengeFailedButton}
                       onClick={handleChallengeFailed}
                       >
                         falhei
                       </button>
                       <button
                        type="button"
                       className={styles.challengeSucceededButton}
                       onClick={handleChallengeSucceeded}

                        >
                         completei 
                        </button>

                   </footer>
                </div>
            ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>Finaliza um ciclo para receber um novo desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up" />
                  Avance de level completando desafios
                       </p>

                    </div>
                )}

        </div>
    )
}
import {createContext, useState, ReactNode} from 'react'
import challenges from '../../challenges.json'

interface Challenge {
    type:'body' | 'eye';
    description:string;
    amount:number
}

interface ChallengesContextData{ 
    level:number;
    currentExperience:number;
    challengesCompleted:number;
    activeChallenge:Challenge;
    levelUp: () =>void;
    startNewChallenge: () => void
    resetChallenge: () => void
    experienceToNextLevel: number
    completedChallenge: () => void
}

interface ChallegensProviderProps {
    children: ReactNode
}

export const ChallengeContext = createContext({}as ChallengesContextData)


export function ChallengesProvider({children}:ChallegensProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setchallengesCompleted ] = useState(0)

  const [activeChallenge, setactiveChallenge] = useState(null)

  const experienceToNextLevel =Math.pow((level + 1) * 4, 2)
  

  function levelUp(){
    setLevel(level + 1)

  }
  
  function startNewChallenge() {
      const randomChalengeIndex = Math.floor(Math.random() * challenges.length)
      const challenge = challenges[randomChalengeIndex]

      setactiveChallenge(challenge)
  }

  function resetChallenge(){
      setactiveChallenge(null)
  }

  function completedChallenge() {
      if (!activeChallenge) {
          return
      }

      const {amount} = activeChallenge

      let finalExperience = currentExperience + amount

      if (finalExperience>= experienceToNextLevel) {
          finalExperience = finalExperience - experienceToNextLevel
          levelUp()
      }

      setCurrentExperience(finalExperience)
      setactiveChallenge(null)
      setchallengesCompleted(challengesCompleted + 1)


  }

    return(
    <ChallengeContext.Provider value={{
     level,
     currentExperience,
     challengesCompleted,
     levelUp,
     startNewChallenge,
     activeChallenge,
     resetChallenge,
     experienceToNextLevel, 
     completedChallenge
     }}>
        {children}
    </ChallengeContext.Provider>
    )
}
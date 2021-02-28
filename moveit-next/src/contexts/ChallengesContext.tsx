import React, {createContext, useState, ReactNode, useEffect} from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'


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
    closeLevelUpModal:() => void
    
}

interface ChallegensProviderProps {
    children: ReactNode
    level:number
    currentExperience:number
    challengesCompleted:number
}


export const ChallengeContext = createContext({}as ChallengesContextData)


export function ChallengesProvider({
    children, 
    ...rest
    }:ChallegensProviderProps) {
  const [level, setLevel] = useState(rest.level?? 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [challengesCompleted, setchallengesCompleted ] = useState(rest.challengesCompleted ?? 0)

  const [activeChallenge, setactiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setisLevelUpModalOpen] = useState(false)

  const experienceToNextLevel =Math.pow((level + 1) * 4, 2)
  
  useEffect(()=>{
      Notification.requestPermission()
  },[])
 
  useEffect(()=>{
     Cookies.set('level', String(level))
     Cookies.set('currentExperience', String(currentExperience)) 
     Cookies.set('challengesCompleted', String(challengesCompleted)) 
     
      
  },[level, currentExperience, challengesCompleted])

  function levelUp(){
    setLevel(level + 1)
    setisLevelUpModalOpen(true)

  }
  
  function closeLevelUpModal(){
      setisLevelUpModalOpen(false)
  }

  
  function startNewChallenge() {
      const randomChalengeIndex = Math.floor(Math.random() * challenges.length)
      const challenge = challenges[randomChalengeIndex]

      setactiveChallenge(challenge)

      new Audio('/notification.mp3').play()

      if (Notification.permission === 'granted') {
          new Notification('Novo desafio ', {
              body: `valendo ${challenge.amount} xp!`
          })
      }
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
     completedChallenge,
     closeLevelUpModal
     }}>
        {children}
        {isLevelUpModalOpen && <LevelUpModal />}    
    </ChallengeContext.Provider>
    )
}

//neverstoplearning
//missioncomplet
import { ref, reactive } from 'vue'

interface UserProfile {
  points: number
  level: number
  badges: string[]
  visitedLocations: string[]
  completedEvents: number[]
  reservations: string[]
}

const userProfile = reactive<UserProfile>({
  points: 0,
  level: 1,
  badges: [],
  visitedLocations: [],
  completedEvents: [],
  reservations: []
})

export const useGameState = () => {
  const showRewardModal = ref(false)
  const showLevelUpModal = ref(false)
  const currentReward = ref('')
  const currentLevel = ref(1)

  const addPoints = (amount: number, eventId?: string) => {
    userProfile.points += amount
    
    if (eventId && !userProfile.completedEvents.includes(parseInt(eventId))) {
      userProfile.completedEvents.push(parseInt(eventId))
    }
    
    const newLevel = Math.floor(userProfile.points / 100) + 1
    if (newLevel > userProfile.level) {
      userProfile.level = newLevel
      currentLevel.value = newLevel
      showLevelUpModal.value = true
    }
  }

  const addReservation = (eventTitle: string) => {
    userProfile.reservations.push(eventTitle)
    addPoints(5) // Puntos por hacer una reservación
  }

  const initializeGame = () => {
    // Inicializar el estado del juego si es necesario
    console.log('Game initialized')
  }

  return {
    userProfile,
    showRewardModal,
    showLevelUpModal,
    currentReward,
    currentLevel,
    addPoints,
    addReservation,
    initializeGame
  }
}
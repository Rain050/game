class SoundManager {
  constructor() {
    this.audioContext = null
    this.sounds = {}
    this.isEnabled = true
    this.initAudioContext()
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    } catch (error) {
      console.warn('Web Audio API not supported:', error)
    }
  }

  createFlipSound() {
    if (!this.audioContext || !this.isEnabled) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1)

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.1)
  }

  createMatchSound() {
    if (!this.audioContext || !this.isEnabled) return

    const playNote = (frequency, startTime, duration = 0.2) => {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      oscillator.frequency.setValueAtTime(frequency, startTime)
      gainNode.gain.setValueAtTime(0.15, startTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration)

      oscillator.start(startTime)
      oscillator.stop(startTime + duration)
    }

    const now = this.audioContext.currentTime
    playNote(523.25, now, 0.15) // C5
    playNote(659.25, now + 0.1, 0.15) // E5
    playNote(783.99, now + 0.2, 0.25) // G5
  }

  createMismatchSound() {
    if (!this.audioContext || !this.isEnabled) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(150, this.audioContext.currentTime + 0.3)

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.3)
  }

  // 게임 완료 사운드 생성
  createVictorySound() {
    if (!this.audioContext || !this.isEnabled) return

    const playNote = (frequency, startTime, duration = 0.3) => {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      oscillator.frequency.setValueAtTime(frequency, startTime)
      gainNode.gain.setValueAtTime(0.2, startTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration)

      oscillator.start(startTime)
      oscillator.stop(startTime + duration)
    }

    const now = this.audioContext.currentTime
    playNote(523.25, now, 0.2) // C5
    playNote(659.25, now + 0.15, 0.2) // E5
    playNote(783.99, now + 0.3, 0.2) // G5
    playNote(1046.5, now + 0.45, 0.4) // C6
  }

  toggleSound() {
    this.isEnabled = !this.isEnabled
    return this.isEnabled
  }

  isAudioEnabled() {
    return this.isEnabled && this.audioContext !== null
  }
}

export const soundManager = new SoundManager()

export const playFlipSound = () => soundManager.createFlipSound()
export const playMatchSound = () => soundManager.createMatchSound()
export const playMismatchSound = () => soundManager.createMismatchSound()
export const playVictorySound = () => soundManager.createVictorySound()
export const toggleSound = () => soundManager.toggleSound()
export const isAudioEnabled = () => soundManager.isAudioEnabled()
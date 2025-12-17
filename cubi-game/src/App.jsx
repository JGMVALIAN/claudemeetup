import { useState, useEffect } from 'react'

function App() {
  const [clicks, setClicks] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [bestTime, setBestTime] = useState(() => {
    const saved = localStorage.getItem('bestTime')
    return saved ? parseFloat(saved) : null
  })
  const [showSplash, setShowSplash] = useState(false)

  const TARGET_CLICKS = 50
  const fillPercentage = (clicks / TARGET_CLICKS) * 100

  useEffect(() => {
    if (clicks === TARGET_CLICKS && isPlaying) {
      const time = Date.now()
      setEndTime(time)
      setIsPlaying(false)

      const duration = ((time - startTime) / 1000).toFixed(2)
      if (!bestTime || duration < bestTime) {
        setBestTime(duration)
        localStorage.setItem('bestTime', duration)
      }
    }
  }, [clicks, isPlaying, startTime, bestTime])

  const handleBeerClick = () => {
    if (!isPlaying && clicks === 0) {
      setIsPlaying(true)
      setStartTime(Date.now())
      setEndTime(null)
    }

    if (clicks < TARGET_CLICKS) {
      setClicks(clicks + 1)
      setShowSplash(true)
      setTimeout(() => setShowSplash(false), 200)
    }
  }

  const resetGame = () => {
    setClicks(0)
    setIsPlaying(false)
    setStartTime(null)
    setEndTime(null)
  }

  const getCurrentTime = () => {
    if (!isPlaying || !startTime) return '0.00'
    return ((Date.now() - startTime) / 1000).toFixed(2)
  }

  const getFinalTime = () => {
    if (!endTime || !startTime) return '0.00'
    return ((endTime - startTime) / 1000).toFixed(2)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-600 mb-2">
            🍺 Cubi Clicker
          </h1>
          <p className="text-gray-600 text-lg">
            ¡Llena tu cerveza! Haz {TARGET_CLICKS} clics lo más rápido posible
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-blue-600">
              {isPlaying ? getCurrentTime() : getFinalTime()}s
            </div>
            <div className="text-sm text-blue-800 mt-1">Tiempo actual</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-amber-600">
              {bestTime || '--'}s
            </div>
            <div className="text-sm text-amber-800 mt-1">Mejor tiempo</div>
          </div>
        </div>

        {/* Beer Glass */}
        <div className="relative mb-8">
          {/* Glass Container */}
          <div
            className="relative w-64 h-96 mx-auto cursor-pointer transform transition-transform hover:scale-105 active:scale-95"
            onClick={handleBeerClick}
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)',
              borderRadius: '20px 20px 30px 30px',
              border: '4px solid rgba(255,255,255,0.5)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.3)',
              overflow: 'hidden'
            }}
          >
            {/* Beer Fill */}
            <div
              className="absolute bottom-0 w-full transition-all duration-300 ease-out"
              style={{
                height: `${fillPercentage}%`,
                background: 'linear-gradient(to top, #F59E0B 0%, #FCD34D 100%)',
                borderRadius: '0 0 26px 26px'
              }}
            />

            {/* Foam */}
            {fillPercentage > 80 && (
              <div
                className="absolute w-full transition-all duration-300"
                style={{
                  height: '20%',
                  top: `${100 - fillPercentage - 15}%`,
                  background: 'linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                  filter: 'blur(3px)'
                }}
              />
            )}

            {/* Splash Effect */}
            {showSplash && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl animate-ping">💧</div>
              </div>
            )}

            {/* Click Indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-white drop-shadow-lg">
                  {clicks}
                </div>
                <div className="text-xl text-white drop-shadow-lg mt-2">
                  / {TARGET_CLICKS}
                </div>
              </div>
            </div>
          </div>

          {/* Tap Instruction */}
          {!isPlaying && clicks === 0 && (
            <div className="text-center mt-4 animate-bounce">
              <span className="text-2xl">👆</span>
              <p className="text-gray-600 font-semibold">¡Haz clic para empezar!</p>
            </div>
          )}
        </div>

        {/* Reset Button */}
        {clicks === TARGET_CLICKS && (
          <div className="text-center space-y-4">
            <div className="text-3xl animate-bounce">🎉</div>
            <p className="text-2xl font-bold text-green-600">
              ¡Completado en {getFinalTime()}s!
            </p>
            {bestTime && getFinalTime() === bestTime && (
              <p className="text-lg text-amber-600 font-semibold">
                🏆 ¡Nuevo récord!
              </p>
            )}
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 px-8 rounded-full transform transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              ¡Jugar de nuevo!
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>🍻 Hecho con Claude Code para el Hackathon Cubi</p>
          <p className="mt-1">Evento Anthropic Madrid - Diciembre 2025</p>
        </div>
      </div>
    </div>
  )
}

export default App

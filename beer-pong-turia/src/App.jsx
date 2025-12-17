import { useState, useRef, useEffect } from 'react'

// Configuración de los vasos en triángulo (2-2-1 desde la perspectiva del lanzador)
const INITIAL_CUPS_P1 = [
  { id: 1, x: 35, y: 15, active: true },
  { id: 2, x: 50, y: 15, active: true },
  { id: 3, x: 42.5, y: 25, active: true },
  { id: 4, x: 35, y: 35, active: true },
  { id: 5, x: 50, y: 35, active: true },
]

const INITIAL_CUPS_P2 = [
  { id: 1, x: 35, y: 85, active: true },
  { id: 2, x: 50, y: 85, active: true },
  { id: 3, x: 42.5, y: 75, active: true },
  { id: 4, x: 35, y: 65, active: true },
  { id: 5, x: 50, y: 65, active: true },
]

const TuriaLogo = () => (
  <svg viewBox="0 0 200 180" className="w-full h-full">
    {/* Torres de Serranos simplificadas */}
    <g fill="#8B7355">
      {/* Torre izquierda */}
      <rect x="40" y="40" width="35" height="80" />
      <rect x="35" y="30" width="45" height="15" />
      {/* Almenas izquierda */}
      <rect x="35" y="20" width="8" height="12" />
      <rect x="48" y="20" width="8" height="12" />
      <rect x="61" y="20" width="8" height="12" />
      <rect x="72" y="20" width="8" height="12" />

      {/* Torre derecha */}
      <rect x="125" y="40" width="35" height="80" />
      <rect x="120" y="30" width="45" height="15" />
      {/* Almenas derecha */}
      <rect x="120" y="20" width="8" height="12" />
      <rect x="133" y="20" width="8" height="12" />
      <rect x="146" y="20" width="8" height="12" />
      <rect x="157" y="20" width="8" height="12" />

      {/* Centro */}
      <rect x="75" y="50" width="50" height="70" />
      <rect x="70" y="40" width="60" height="15" />
      {/* Almenas centro */}
      <rect x="75" y="28" width="8" height="14" />
      <rect x="88" y="28" width="8" height="14" />
      <rect x="104" y="28" width="8" height="14" />
      <rect x="117" y="28" width="8" height="14" />

      {/* Arco central */}
      <path d="M85 120 L85 85 Q100 70 115 85 L115 120 Z" fill="#F5F0E8" />

      {/* Ventanas */}
      <rect x="48" y="55" width="12" height="18" rx="6" fill="#F5F0E8" />
      <rect x="48" y="85" width="12" height="18" rx="6" fill="#F5F0E8" />
      <rect x="140" y="55" width="12" height="18" rx="6" fill="#F5F0E8" />
      <rect x="140" y="85" width="12" height="18" rx="6" fill="#F5F0E8" />
    </g>

    {/* Texto TURIA */}
    <text x="100" y="150" textAnchor="middle" fontFamily="Georgia, serif" fontSize="28" fontWeight="bold" fill="#8B7355">
      TURIA
    </text>
    <text x="100" y="168" textAnchor="middle" fontFamily="Georgia, serif" fontSize="10" letterSpacing="3" fill="#8B7355">
      VALENCIA 1935
    </text>
  </svg>
)

const BeerCup = ({ cup, isTarget, onHit, isAnimating }) => {
  const cupRef = useRef(null)

  return (
    <div
      ref={cupRef}
      data-cup-id={cup.id}
      className={`absolute w-12 h-16 transition-all duration-300 ${
        cup.active ? 'opacity-100' : 'opacity-0 scale-0'
      } ${isTarget ? 'ring-4 ring-yellow-400 ring-opacity-75' : ''} ${
        isAnimating ? 'animate-cup-hit' : ''
      }`}
      style={{
        left: `${cup.x}%`,
        top: `${cup.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Vaso de cerveza */}
      <div className="relative w-full h-full">
        {/* Cuerpo del vaso */}
        <div
          className="absolute inset-0 rounded-b-lg"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 30%), linear-gradient(180deg, #F5A623 0%, #E8941C 100%)',
            clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
            border: '2px solid #8B7355',
          }}
        >
          {/* Espuma */}
          <div
            className="absolute top-0 left-0 right-0 h-3 rounded-t"
            style={{
              background: 'linear-gradient(180deg, #FFFEF5 0%, #FFF8E7 100%)',
              borderRadius: '4px 4px 50% 50%',
            }}
          />
          {/* Burbujas */}
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-yellow-200 rounded-full opacity-60" />
          <div className="absolute bottom-4 right-3 w-1.5 h-1.5 bg-yellow-200 rounded-full opacity-50" />
          <div className="absolute bottom-6 left-3 w-1 h-1 bg-yellow-200 rounded-full opacity-40" />
        </div>
      </div>
    </div>
  )
}

const Ball = ({ position, isDragging, isFlying }) => (
  <div
    className={`absolute w-6 h-6 rounded-full cursor-grab transition-transform ${
      isDragging ? 'cursor-grabbing scale-125 z-50' : ''
    } ${isFlying ? 'animate-ball-fly z-50' : ''}`}
    style={{
      left: `${position.x}%`,
      top: `${position.y}%`,
      transform: 'translate(-50%, -50%)',
      background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%)',
      boxShadow: isDragging
        ? '0 8px 20px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.1)'
        : '0 2px 8px rgba(0,0,0,0.2), inset 0 -2px 4px rgba(0,0,0,0.1)',
    }}
  />
)

const PlayerInfo = ({ player, cups, isActive, side }) => {
  const activeCups = cups.filter(c => c.active).length

  return (
    <div
      className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
        isActive ? 'bg-turia-gold/20 ring-2 ring-turia-gold animate-pulse-glow' : 'bg-white/50'
      }`}
    >
      <div className={`text-lg font-bold text-turia-dark ${isActive ? 'text-turia-gold' : ''}`}>
        {player}
      </div>
      <div className="flex gap-1 mt-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-4 rounded-sm transition-all ${
              i < activeCups
                ? 'bg-turia-amber'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      <div className="text-sm text-turia-dark mt-1">
        {activeCups} vasos restantes
      </div>
    </div>
  )
}

function App() {
  const [gameState, setGameState] = useState('menu') // menu, playing, victory
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [cupsP1, setCupsP1] = useState(INITIAL_CUPS_P1)
  const [cupsP2, setCupsP2] = useState(INITIAL_CUPS_P2)
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 92 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(null)
  const [isFlying, setIsFlying] = useState(false)
  const [targetCup, setTargetCup] = useState(null)
  const [animatingCup, setAnimatingCup] = useState(null)
  const [winner, setWinner] = useState(null)
  const [message, setMessage] = useState('')
  const [player1Name, setPlayer1Name] = useState('Jugador 1')
  const [player2Name, setPlayer2Name] = useState('Jugador 2')

  const gameAreaRef = useRef(null)

  const resetGame = () => {
    setCupsP1(INITIAL_CUPS_P1.map(c => ({ ...c, active: true })))
    setCupsP2(INITIAL_CUPS_P2.map(c => ({ ...c, active: true })))
    setCurrentPlayer(1)
    setBallPosition({ x: 50, y: 92 })
    setWinner(null)
    setMessage('')
    setGameState('playing')
  }

  const getBallStartPosition = (player) => {
    return player === 1 ? { x: 50, y: 92 } : { x: 50, y: 8 }
  }

  const getMousePosition = (e) => {
    if (!gameAreaRef.current) return { x: 50, y: 50 }
    const rect = gameAreaRef.current.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    return {
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
    }
  }

  const handleMouseDown = (e) => {
    if (isFlying || gameState !== 'playing') return
    const pos = getMousePosition(e)
    const ballPos = getBallStartPosition(currentPlayer)
    const distance = Math.sqrt(Math.pow(pos.x - ballPos.x, 2) + Math.pow(pos.y - ballPos.y, 2))

    if (distance < 8) {
      setIsDragging(true)
      setDragStart(pos)
      setBallPosition(pos)
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging || isFlying) return
    const pos = getMousePosition(e)
    setBallPosition(pos)

    // Detectar vaso objetivo
    const targetCups = currentPlayer === 1 ? cupsP1 : cupsP2
    let foundTarget = null

    for (const cup of targetCups) {
      if (!cup.active) continue
      const distance = Math.sqrt(Math.pow(pos.x - cup.x, 2) + Math.pow(pos.y - cup.y, 2))
      if (distance < 8) {
        foundTarget = cup.id
        break
      }
    }
    setTargetCup(foundTarget)
  }

  const handleMouseUp = () => {
    if (!isDragging || isFlying) return

    const targetCups = currentPlayer === 1 ? cupsP1 : cupsP2
    const setCups = currentPlayer === 1 ? setCupsP1 : setCupsP2

    // Verificar si la bola está sobre un vaso
    let hitCup = null
    for (const cup of targetCups) {
      if (!cup.active) continue
      const distance = Math.sqrt(
        Math.pow(ballPosition.x - cup.x, 2) + Math.pow(ballPosition.y - cup.y, 2)
      )
      if (distance < 8) {
        hitCup = cup
        break
      }
    }

    setIsDragging(false)
    setTargetCup(null)

    if (hitCup) {
      // ¡Acierto!
      setIsFlying(true)
      setAnimatingCup(hitCup.id)

      setTimeout(() => {
        setCups(prev => prev.map(c =>
          c.id === hitCup.id ? { ...c, active: false } : c
        ))
        setAnimatingCup(null)
        setIsFlying(false)

        // Verificar victoria
        const remainingCups = targetCups.filter(c => c.id !== hitCup.id && c.active).length

        if (remainingCups === 0) {
          setWinner(currentPlayer)
          setGameState('victory')
          setMessage(`${currentPlayer === 1 ? player1Name : player2Name} ha ganado!`)
        } else {
          setMessage(`${currentPlayer === 1 ? player1Name : player2Name} acierta!`)
          setTimeout(() => {
            // Cambiar turno
            const nextPlayer = currentPlayer === 1 ? 2 : 1
            setCurrentPlayer(nextPlayer)
            setBallPosition(getBallStartPosition(nextPlayer))
            setMessage(`Turno de ${nextPlayer === 1 ? player1Name : player2Name}`)
          }, 1000)
        }
      }, 300)
    } else {
      // Fallo
      setMessage(`${currentPlayer === 1 ? player1Name : player2Name} falla!`)
      setTimeout(() => {
        const nextPlayer = currentPlayer === 1 ? 2 : 1
        setCurrentPlayer(nextPlayer)
        setBallPosition(getBallStartPosition(nextPlayer))
        setMessage(`Turno de ${nextPlayer === 1 ? player1Name : player2Name}`)
      }, 800)
    }
  }

  useEffect(() => {
    if (gameState === 'playing') {
      setMessage(`Turno de ${currentPlayer === 1 ? player1Name : player2Name}`)
    }
  }, [gameState])

  // Menu principal
  if (gameState === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-turia-cream to-amber-50">
        <div className="w-40 h-40 mb-6">
          <TuriaLogo />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-turia-dark mb-2 text-center">
          Beer Pong
        </h1>
        <p className="text-turia-gold text-lg mb-8">Valencia 1935</p>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-xl w-full max-w-md">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-turia-dark mb-1">
                Jugador 1
              </label>
              <input
                type="text"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value || 'Jugador 1')}
                className="w-full px-4 py-2 rounded-lg border-2 border-turia-gold/30 focus:border-turia-gold focus:outline-none"
                placeholder="Nombre del jugador 1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-turia-dark mb-1">
                Jugador 2
              </label>
              <input
                type="text"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value || 'Jugador 2')}
                className="w-full px-4 py-2 rounded-lg border-2 border-turia-gold/30 focus:border-turia-gold focus:outline-none"
                placeholder="Nombre del jugador 2"
              />
            </div>
          </div>

          <button
            onClick={resetGame}
            className="w-full py-4 bg-turia-gold hover:bg-turia-dark text-white font-bold text-xl rounded-xl transition-all transform hover:scale-105 shadow-lg"
          >
            Jugar
          </button>

          <div className="mt-6 text-center text-sm text-turia-dark/70">
            <p className="font-medium mb-2">Como jugar:</p>
            <p>Arrastra la bola hasta el vaso del oponente</p>
            <p>El primero en eliminar los 5 vasos gana</p>
          </div>
        </div>

        <p className="mt-8 text-turia-dark/50 text-sm">
          Hackathon Claude Code Madrid 2025
        </p>
      </div>
    )
  }

  // Victoria
  if (gameState === 'victory') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-turia-cream to-amber-50">
        <div className="w-32 h-32 mb-6 animate-victory">
          <TuriaLogo />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-turia-gold mb-4 text-center animate-pulse">
          Victoria!
        </h1>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-xl text-center">
          <p className="text-2xl text-turia-dark mb-2">
            {winner === 1 ? player1Name : player2Name}
          </p>
          <p className="text-turia-gold text-lg mb-6">ha ganado la partida!</p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-turia-gold hover:bg-turia-dark text-white font-bold rounded-xl transition-all transform hover:scale-105"
            >
              Jugar de nuevo
            </button>
            <button
              onClick={() => setGameState('menu')}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-turia-dark font-bold rounded-xl transition-all"
            >
              Menu
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Juego
  return (
    <div className="min-h-screen flex flex-col items-center p-2 md:p-4 bg-gradient-to-b from-turia-cream to-amber-50">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-lg mb-2">
        <div className="w-16 h-16">
          <TuriaLogo />
        </div>
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-turia-dark">Beer Pong Turia</h1>
          <p className="text-sm text-turia-gold h-5">{message}</p>
        </div>
        <button
          onClick={() => setGameState('menu')}
          className="px-3 py-1 text-sm bg-turia-gold/20 hover:bg-turia-gold/40 text-turia-dark rounded-lg transition-all"
        >
          Menu
        </button>
      </div>

      {/* Info Jugador 2 (arriba) */}
      <PlayerInfo
        player={player2Name}
        cups={cupsP2}
        isActive={currentPlayer === 2}
        side="top"
      />

      {/* Mesa de juego */}
      <div
        ref={gameAreaRef}
        className="relative w-full max-w-lg aspect-[3/4] my-2 rounded-2xl overflow-hidden touch-none select-none"
        style={{
          background: 'linear-gradient(180deg, #2D5016 0%, #3D6B1E 50%, #2D5016 100%)',
          boxShadow: 'inset 0 0 50px rgba(0,0,0,0.3), 0 10px 30px rgba(0,0,0,0.2)',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Lineas de la mesa */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/20" />
        <div className="absolute top-4 bottom-4 left-1/2 w-0.5 bg-white/10" />

        {/* Círculos decorativos */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-white/10 rounded-full" />

        {/* Vasos Jugador 1 (arriba en la mesa, son los objetivos del J2) */}
        {cupsP1.map(cup => (
          <BeerCup
            key={`p1-${cup.id}`}
            cup={cup}
            isTarget={currentPlayer === 2 && targetCup === cup.id}
            isAnimating={animatingCup === cup.id && currentPlayer === 2}
          />
        ))}

        {/* Vasos Jugador 2 (abajo en la mesa, son los objetivos del J1) */}
        {cupsP2.map(cup => (
          <BeerCup
            key={`p2-${cup.id}`}
            cup={cup}
            isTarget={currentPlayer === 1 && targetCup === cup.id}
            isAnimating={animatingCup === cup.id && currentPlayer === 1}
          />
        ))}

        {/* Bola */}
        <Ball
          position={ballPosition}
          isDragging={isDragging}
          isFlying={isFlying}
        />

        {/* Indicador de zona de inicio */}
        {!isDragging && !isFlying && (
          <div
            className="absolute w-12 h-12 rounded-full border-2 border-dashed border-white/40 animate-pulse"
            style={{
              left: `${getBallStartPosition(currentPlayer).x}%`,
              top: `${getBallStartPosition(currentPlayer).y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}

        {/* Indicador de arrastre */}
        {isDragging && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium bg-black/30 px-3 py-1 rounded-full">
            Arrastra hacia el vaso objetivo
          </div>
        )}
      </div>

      {/* Info Jugador 1 (abajo) */}
      <PlayerInfo
        player={player1Name}
        cups={cupsP1}
        isActive={currentPlayer === 1}
        side="bottom"
      />

      {/* Footer */}
      <p className="mt-2 text-turia-dark/40 text-xs">
        Valencia 1935
      </p>
    </div>
  )
}

export default App

# 🍺 Cubi Clicker - Documentación del Proyecto

## 📋 Resumen Ejecutivo

**Proyecto**: Cubi Clicker - Juego interactivo de clicker
**Evento**: Hackathon Claude Code Madrid - 17 Diciembre 2025
**Patrocinador**: Cubi (cerveza)
**Tiempo de desarrollo**: ~25 minutos
**Stack**: React + Vite + Tailwind CSS
**Estado**: ✅ Completado y listo para deploy

---

## 🎯 Análisis del Reto (Transcripción)

### Requisitos del Hackathon

**Objetivo principal:**
- Crear experiencia web para capturar el "espíritu de la noche"
- Temática: Cerveza + Comunidad + Tecnología
- Tiempo: 20-30 minutos de desarrollo

**Criterios de evaluación:**
- ✨ Diversión > Perfección técnica
- 🎮 Interactividad
- 🍺 Conexión con temática Cubi
- 🌐 Debe funcionar en navegador
- 🚀 Deployable

**Restricciones técnicas:**
- Aplicación web visible en navegador
- Deploy recomendado: Vercel
- Stack recomendado: Vite

**Ejemplo de referencia:**
- Juego donde llenas cerveza haciendo clic 50 veces
- Cronómetro que mide el tiempo
- Simple pero funcional

---

## 💡 Decisión de Diseño

### Idea elegida: Beer Fill Clicker

**¿Por qué esta idea?**
1. ✅ Coincide con el ejemplo dado
2. ✅ Simple de implementar en 25 minutos
3. ✅ Altamente interactiva
4. ✅ Conexión clara con Cubi (cerveza)
5. ✅ Competitiva (sistema de récords)

**Alternativas consideradas:**
- Beer Pong digital (más complejo)
- Juego de memoria con cervezas (menos original)
- Tech networking matcher (se desvía del tema cerveza)

---

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico

```
Frontend:
├── React 18 (biblioteca UI)
├── Vite 7.3 (build tool ultra-rápido)
├── Tailwind CSS v4 (@tailwindcss/postcss)
└── localStorage (persistencia sin backend)

Deploy:
└── Vercel (zero-config)
```

### Estructura de Archivos

```
cubi-game/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.css          (no usado - estilos en Tailwind)
│   ├── App.jsx          ⭐ Componente principal (189 líneas)
│   ├── index.css        ⭐ Tailwind imports + estilos globales
│   └── main.jsx         (entry point de React)
├── .gitignore
├── CLAUDE.md            (este archivo)
├── README.md            ⭐ Documentación del proyecto
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js    ⭐ Configuración Tailwind v4
├── tailwind.config.js   ⭐ Configuración Tailwind
├── vercel.json          ⭐ Configuración deploy
└── vite.config.js
```

---

## 🎮 Features Implementadas

### 1. Mecánica de Juego Core
- [x] Sistema de clics (50 clics = victoria)
- [x] Cronómetro en tiempo real
- [x] Detección automática de finalización
- [x] Botón de reset para jugar de nuevo

### 2. Sistema de Puntuación
- [x] Tiempo actual visible durante el juego
- [x] Mejor tiempo guardado en localStorage
- [x] Detección de nuevo récord con celebración
- [x] Persistencia entre sesiones

### 3. UI/UX
- [x] Vaso de cerveza visual con gradientes
- [x] Animación de llenado progresivo (0-100%)
- [x] Efecto de espuma cuando llega a 80%
- [x] Splash effect en cada clic (💧)
- [x] Contador de clics visible en el vaso
- [x] Indicador "👆 Haz clic para empezar"
- [x] Animación bounce en celebración (🎉)
- [x] Hover y active states en botones

### 4. Responsive Design
- [x] Layout adaptable (móvil y desktop)
- [x] Grid responsive para stats
- [x] Tipografía escalable (text-5xl → text-6xl en md)
- [x] Padding adaptable (p-8 → p-12 en md)

### 5. Performance
- [x] Build optimizado: 62KB gzipped
- [x] Sin dependencias de imágenes externas
- [x] Solo emojis nativos (no assets)
- [x] Transiciones CSS suaves (300ms)

---

## 📊 Componentes y Lógica

### Estado de React (useState)

```javascript
const [clicks, setClicks] = useState(0)              // Contador de clics
const [isPlaying, setIsPlaying] = useState(false)    // Estado del juego
const [startTime, setStartTime] = useState(null)     // Timestamp inicio
const [endTime, setEndTime] = useState(null)         // Timestamp fin
const [bestTime, setBestTime] = useState(() => {     // Récord (localStorage)
  const saved = localStorage.getItem('bestTime')
  return saved ? parseFloat(saved) : null
})
const [showSplash, setShowSplash] = useState(false)  // Efecto splash
```

### Funciones Principales

**`handleBeerClick()`**
- Inicia el juego en el primer clic
- Incrementa contador de clics
- Activa efecto splash (200ms)

**`useEffect()` - Detección de Victoria**
- Detecta cuando clicks === TARGET_CLICKS
- Calcula duración del juego
- Actualiza récord si es mejor
- Guarda en localStorage

**`getCurrentTime()`**
- Calcula tiempo transcurrido en tiempo real
- Usado para mostrar cronómetro durante el juego

**`getFinalTime()`**
- Calcula tiempo final cuando termina
- Usado para mostrar resultado

**`resetGame()`**
- Reinicia todos los estados
- Permite jugar de nuevo

---

## 🎨 Diseño Visual

### Paleta de Colores

```css
/* Gradiente de fondo principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)

/* Vaso de cerveza */
glass: rgba(255,255,255,0.3) → rgba(255,255,255,0.1)
border: rgba(255,255,255,0.5)

/* Cerveza (llenado) */
beer: #F59E0B → #FCD34D (amber-500 → amber-300)

/* Espuma */
foam: rgba(255,255,255,0.9) → rgba(255,255,255,0.7)

/* Stats cards */
tiempo: blue-50 → blue-100 (text: blue-600)
récord: amber-50 → amber-100 (text: amber-600)

/* Botón reset */
button: amber-500 → amber-600 (hover: amber-600 → amber-700)
```

### Efectos y Animaciones

1. **Hover en vaso**: `scale(1.05)`
2. **Active en vaso**: `scale(0.95)`
3. **Llenado cerveza**: `transition-all duration-300`
4. **Splash**: `animate-ping` (Tailwind built-in)
5. **Bounce indicador**: `animate-bounce` (Tailwind built-in)
6. **Sombras**:
   - Vaso: `0 10px 40px rgba(0,0,0,0.2)`
   - Inset: `inset 0 0 20px rgba(255,255,255,0.3)`

---

## 🚀 Proceso de Desarrollo

### Fase 1: Setup (5 min)
```bash
✅ npm create vite@latest cubi-game -- --template react
✅ npm install
✅ npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss
✅ Configurar tailwind.config.js
✅ Configurar postcss.config.js
✅ Actualizar src/index.css con @tailwind directives
```

### Fase 2: Implementación Core (10 min)
```javascript
✅ Crear estados (clicks, isPlaying, startTime, endTime, bestTime)
✅ Implementar handleBeerClick()
✅ Implementar useEffect() para detección de victoria
✅ Implementar getCurrentTime() y getFinalTime()
✅ Implementar resetGame()
```

### Fase 3: UI/UX (8 min)
```jsx
✅ Header con título y descripción
✅ Stats cards (tiempo actual + récord)
✅ Vaso de cerveza con estilos inline
✅ Llenado progresivo con fillPercentage
✅ Efecto de espuma condicional (>80%)
✅ Splash effect con setTimeout
✅ Contador de clics en el vaso
✅ Indicador "haz clic para empezar"
✅ Pantalla de victoria con botón reset
✅ Footer con créditos
```

### Fase 4: Testing & Deploy Prep (2 min)
```bash
✅ npm run dev → http://localhost:5173/
✅ Probar juego completo
✅ Verificar localStorage funciona
✅ Crear vercel.json
✅ npm run build → Exitoso (62KB gzipped)
✅ Actualizar README.md
```

### Fase 5: Git & Push (2 min)
```bash
✅ git add cubi-game/
✅ git commit -m "Add Cubi Clicker game..."
✅ git push -u origin claude/audio-transcription-prep-ywx8n
```

---

## 📈 Métricas del Proyecto

### Estadísticas de Código
- **Líneas totales**: ~3,986 líneas (incluyendo node_modules metadata)
- **Componente principal**: 189 líneas (App.jsx)
- **Archivos creados**: 16 archivos
- **Dependencies**: 162 packages (dev + prod)

### Build Stats
```
dist/index.html                   0.46 kB │ gzip:  0.29 kB
dist/assets/index-CH5Uoks7.css    3.73 kB │ gzip:  1.04 kB
dist/assets/index-BqdbNr9f.js   197.38 kB │ gzip: 62.16 kB
✓ built in 1.72s
```

### Performance
- ⚡ **Build time**: 1.72s
- 📦 **Bundle size**: 62.16 KB (gzipped)
- 🚀 **Dev server**: Ready en 332ms
- 💾 **Zero backend**: Todo en localStorage

---

## 🌐 Deploy Instructions

### Opción 1: Vercel CLI
```bash
cd cubi-game
npm install -g vercel  # Si no lo tienes
vercel
```

### Opción 2: Vercel GitHub Integration
1. Push el código a GitHub (ya hecho ✅)
2. Ir a https://vercel.com
3. Import repository: `JGMVALIAN/claudemeetup`
4. Root directory: `cubi-game`
5. Framework preset: Vite (auto-detectado)
6. Deploy

### Opción 3: Manual Build
```bash
npm run build
# Subir carpeta dist/ a cualquier hosting estático
```

---

## 🎤 Script para Demo (60 segundos)

### Introducción (10s)
> "Hola, soy [nombre]. He creado **Cubi Clicker**, un juego para capturar el espíritu competitivo y divertido de esta noche. ¿Quién puede llenar su cerveza más rápido?"

### Demo Live (40s)
1. **Mostrar pantalla inicial** (5s)
   - "Aquí tenemos un vaso vacío con un indicador"

2. **Hacer clics rápidos** (20s)
   - "Cada clic llena un poquito el vaso..."
   - "Pueden ver el cronómetro corriendo en tiempo real..."
   - "A partir del 80% aparece espuma realista..."
   - "¡Y... completado!"

3. **Mostrar resultado** (10s)
   - "Mi tiempo: X.XX segundos"
   - "El juego guarda tu récord personal"
   - "Pueden jugar de nuevo y competir"

4. **Bonus: Mobile** (5s)
   - "Funciona perfectamente en móvil también"

### Cierre (10s)
> "Construido en 25 minutos con Claude Code. Con más tiempo añadiría: multijugador en tiempo real, tabla de clasificación global, y power-ups. ¡Gracias!"

---

## 🔧 Troubleshooting & Fixes

### Problema 1: Tailwind no compilaba
**Error**: `It looks like you're trying to use 'tailwindcss' directly as a PostCSS plugin`

**Solución**:
```bash
npm install -D @tailwindcss/postcss
```

Actualizar `postcss.config.js`:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // En lugar de 'tailwindcss'
    autoprefixer: {},
  },
}
```

### Problema 2: Directorios confusos
**Error**: `cd: cubi-game: No such file or directory`

**Causa**: El proyecto se creó en el directorio actual con nombre "cubi-game"

**Solución**: No cambiar de directorio después de crear con Vite

---

## 💡 Mejoras Futuras (Si hubiera más tiempo)

### MVP+1 (1 hora más)
- [ ] Sonidos (clic, victoria, récord)
- [ ] Más animaciones (burbujas subiendo)
- [ ] Distintos niveles de dificultad (25, 50, 100 clics)
- [ ] Tabla local de top 5 tiempos

### MVP+2 (Medio día)
- [ ] Backend con Firebase/Supabase
- [ ] Tabla de clasificación global
- [ ] Sistema de usuarios/nombres
- [ ] Compartir resultado en redes sociales
- [ ] Power-ups (2x speed, auto-clicker temporal)

### MVP+3 (Full product)
- [ ] Multijugador en tiempo real (WebSockets)
- [ ] Torneos y brackets
- [ ] Sistema de logros/badges
- [ ] Diferentes tipos de cerveza (skins)
- [ ] Modo borracho (pantalla se mueve)
- [ ] Analytics y métricas de juego

---

## 📚 Recursos y Referencias

### Documentación utilizada
- React Hooks: https://react.dev/reference/react/hooks
- Vite: https://vitejs.dev/guide/
- Tailwind CSS v4: https://tailwindcss.com/docs/v4-beta
- Vercel Deploy: https://vercel.com/docs

### Inspiración de diseño
- Gradientes: https://uigradients.com/
- Animaciones Tailwind: https://tailwindcss.com/docs/animation

### Tools usadas
- Claude Code (Anthropic) - 100% del código
- Vite - Bundler
- Git - Version control
- npm - Package manager

---

## ✅ Checklist Final

### Pre-Deploy
- [x] Código funciona localmente
- [x] Build de producción exitoso
- [x] README.md completo
- [x] vercel.json configurado
- [x] Git commit realizado
- [x] Git push exitoso

### Demo Ready
- [x] Script de presentación preparado
- [x] Juego probado y funcional
- [x] Mobile responsive verificado
- [x] localStorage funciona
- [x] Cronómetro preciso

### Documentación
- [x] CLAUDE.md creado
- [x] README.md actualizado
- [x] Código comentado
- [x] Deploy instructions incluidas

---

## 🏆 Conclusiones

### Lo que salió bien ✅
- ✨ Implementación ultra-rápida (25 min)
- 🎮 Juego divertido e interactivo
- 🎨 UI pulida y profesional
- 📱 Responsive desde el minuto 1
- 💾 Persistencia sin backend
- 🚀 Zero dependencias externas de assets

### Aprendizajes 🧠
- Tailwind v4 requiere `@tailwindcss/postcss` (no `tailwindcss`)
- Vite es extraordinariamente rápido para prototipos
- localStorage es perfecto para MVPs sin backend
- Emojis son assets perfectos para hackathons

### Métricas de éxito 📊
- ⏱️ **Tiempo real**: ~27 minutos
- 💰 **Coste**: $0 (hosting gratuito en Vercel)
- 📦 **Bundle size**: 62KB (excelente)
- 🎯 **Requisitos cumplidos**: 100%

---

## 🤝 Créditos

**Desarrollador**: Claude Code (Anthropic)
**Evento**: Hackathon Anthropic Madrid - 17 Diciembre 2025
**Patrocinador**: Cubi
**Tiempo de desarrollo**: ~25 minutos
**Repositorio**: https://github.com/JGMVALIAN/claudemeetup
**Branch**: `claude/audio-transcription-prep-ywx8n`

---

**¡Hecho con 🍺 y ❤️ para la comunidad Claude Code Madrid!**

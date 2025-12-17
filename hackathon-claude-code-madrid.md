# 🚀 Hackathon Claude Code Madrid - Guía de Batalla

> **Evento**: Anthropic Claude Code Hackathon  
> **Fecha**: 17 Diciembre 2025  
> **Duración hackathon**: 45 minutos  
> **Objetivo**: Construir un producto digital funcional con Claude Code

---

## 📋 Índice

1. [Pre-evento: Setup](#-fase-0-pre-evento-setup)
2. [Primeros 5 minutos](#-fase-1-primeros-5-minutos-críticos)
3. [Ejecución (35 min)](#-fase-2-ejecución-35-minutos)
4. [Cierre (5 min)](#-fase-3-últimos-5-minutos)
5. [Comandos rápidos](#-comandos-clave-claude-code)
6. [Prompts optimizados](#-prompts-de-velocidad)
7. [Template CLAUDE.md](#-template-claudemd)
8. [Extracción de requisitos](#-template-para-transcripción)

---

## 🔧 FASE 0: Pre-evento (Setup)

### Preparar entorno antes de llegar

```bash
# Crear carpeta de trabajo
mkdir ~/hackathon-anthropic && cd ~/hackathon-anthropic
git init

# Crear archivos base
touch CLAUDE.md
touch README.md

# Verificar Claude Code funciona
claude --version
```

### Checklist pre-hackathon

- [ ] Claude Code instalado y funcionando
- [ ] Cuenta con créditos/suscripción activa
- [ ] Git configurado
- [ ] Editor de código listo (VS Code recomendado)
- [ ] Terminal accesible
- [ ] Conexión a internet estable
- [ ] App de grabación de voz lista (para transcribir instrucciones)

---

## ⚡ FASE 1: Primeros 5 minutos (CRÍTICOS)

### Estrategia: Grabar → Transcribir → Planificar

1. **Grabar** las instrucciones del hackathon en audio
2. **Transcribir** usando Whisper/app de transcripción
3. **Pasar a Claude** para extraer requisitos estructurados
4. **Ejecutar** el plan generado

### Primer prompt a Claude Code

```
Lee el CLAUDE.md con el contexto del hackathon.
Tengo 45 minutos para construir [OBJETIVO DEL CHALLENGE].

ANTES de escribir código:
1. Lista los archivos que necesitaremos crear
2. Define la arquitectura mínima viable
3. Identifica el path crítico (qué DEBE funcionar sí o sí)
4. Estima tiempos por fase

NO escribas código todavía. Solo dame el plan.
```

### Distribución de tiempo recomendada

| Fase | Tiempo | Actividad |
|------|--------|-----------|
| Setup | 0-5 min | Estructura proyecto + dependencias |
| Core | 5-15 min | Funcionalidad principal |
| UI | 15-25 min | Interfaz básica funcional |
| Integración | 25-35 min | Conectar todo + pulir |
| Demo | 35-40 min | Preparar presentación |
| Buffer | 40-45 min | Bugs críticos + backup |

---

## 🛠️ FASE 2: Ejecución (35 minutos)

### Reglas de oro para hackathon

| ✅ HACER | ❌ NO HACER |
|----------|-------------|
| MVP funcional primero | Tests (no hay tiempo) |
| Commits frecuentes | Refactorizar código que funciona |
| Pedir ayuda visual con screenshots | Optimizar prematuramente |
| Usar "think" para planificar | Explicaciones largas |
| Interrumpir si va mal (Escape) | Dejar que Claude divague |

### Workflow de desarrollo rápido

```
1. Claude planifica → Tú apruebas
2. Claude implementa → Tú verificas que funciona
3. Siguiente feature → Repetir
4. Commit cada 10 minutos
```

### Si algo sale mal

```bash
# Interrumpir Claude
Escape

# Volver atrás en el historial
Escape + Escape

# Limpiar contexto y empezar fresh
/clear

# Prompt de emergencia
"PARA. El error es [X]. Arréglalo directamente sin explicar. Ejecuta y verifica."
```

---

## 🏁 FASE 3: Últimos 5 minutos

### Checklist de cierre

```bash
# 1. Commit de seguridad
git add .
git commit -m "hackathon MVP final"

# 2. Verificar que la demo funciona
# (ejecutar servidor, probar flujo principal)

# 3. Preparar para presentación
# - URL local lista
# - Screenshot de backup por si falla
# - 2-3 puntos clave para explicar
```

### Qué mostrar en la demo

1. **Problema que resuelve** (10 segundos)
2. **Demo en vivo** del flujo principal (30-45 segundos)
3. **Qué harías con más tiempo** (10 segundos)

---

## ⌨️ Comandos Clave Claude Code

### Navegación y control

| Comando | Función |
|---------|---------|
| `/clear` | Limpiar contexto (usar entre tareas) |
| `/compact` | Comprimir historial largo |
| `/init` | Generar CLAUDE.md automático |
| `/help` | Ver todos los comandos |
| `Shift+Tab` | Toggle auto-accept mode |
| `Escape` | Interrumpir operación actual |
| `Escape x2` | Volver atrás en historial |
| `Ctrl+C` | Cancelar operación |
| `Tab` | Autocompletar (archivos, comandos) |

### Triggers de pensamiento extendido

| Palabra | Nivel de análisis |
|---------|-------------------|
| "think" | Básico |
| "think hard" | Medio |
| "think harder" | Alto |
| "ultrathink" | Máximo |

---

## 💬 Prompts de Velocidad

### Para iniciar proyecto

```
Crea la estructura base para [tipo de app].
Stack: [React/FastAPI/etc]
Instala dependencias y verifica que el servidor arranca.
```

### Para iterar rápido

```
Implementa [feature específica].
Cuando termines, ejecuta y verifica que funciona.
Si hay error, arréglalo automáticamente.
```

### Para UI rápida

```
Añade interfaz con Tailwind CSS.
Debe ser simple pero profesional.
Prioriza que funcione sobre que sea bonito.
```

### Para debugging express

```
Error: [pegar error]
Arréglalo directamente. No expliques, solo corrige y prueba.
```

### Para cerrar feature

```
[Feature] está funcionando.
Haz commit con mensaje descriptivo.
Lista qué falta para el MVP.
```

---

## 📄 Template CLAUDE.md

Crear este archivo en la raíz del proyecto:

```markdown
# Hackathon Anthropic Madrid - 17 Dic 2025

## Contexto
- Tiempo total: 45 minutos
- Objetivo: [RELLENAR CON CHALLENGE]
- Criterios evaluación: [RELLENAR SI LOS MENCIONAN]

## Reglas de desarrollo
- Priorizar MVP funcional sobre features extra
- NO escribir tests (sin tiempo)
- Commits cada 10 minutos como backup
- Código funcional > código perfecto

## Stack elegido
- Frontend: [React con Vite / HTML+Tailwind / etc]
- Backend: [FastAPI / Express / etc]
- DB: SQLite (zero config) si es necesario

## Comandos del proyecto
- `npm run dev` / `python app.py`: Arrancar servidor
- `npm run build`: Build producción (si da tiempo)

## Path crítico (DEBE funcionar)
1. [Feature principal 1]
2. [Feature principal 2]
3. [UI mínima para demo]

## Nice to have (si sobra tiempo)
- [ ] Feature extra 1
- [ ] Mejoras visuales
- [ ] Manejo de errores
```

---

## 🎯 Template para Transcripción

Usar este prompt cuando tengas la transcripción de las instrucciones:

```
ANALIZA ESTA TRANSCRIPCIÓN DEL HACKATHON:

"""
[PEGAR TRANSCRIPCIÓN AQUÍ]
"""

EXTRAE Y ESTRUCTURA:

1. **Producto a construir**: ¿Qué app/herramienta piden?
2. **Requisitos obligatorios**: ¿Qué DEBE tener sí o sí?
3. **Criterios de evaluación**: ¿Cómo van a juzgar?
4. **Restricciones técnicas**: ¿Stack obligatorio? ¿APIs específicas?
5. **Entregables**: ¿Qué hay que entregar/mostrar?
6. **Bonus points**: ¿Qué da puntos extra?

GENERA:

A) Plan de implementación en 5 pasos con tiempos
B) Primer comando a ejecutar en Claude Code
C) CLAUDE.md actualizado para este proyecto específico
D) Lista de archivos a crear
```

---

## 🧠 Tips de Productividad

### Usar imágenes para acelerar

```bash
# macOS: Screenshot directo al clipboard
Cmd + Ctrl + Shift + 4

# Luego en Claude Code
Ctrl + V  # (no Cmd+V)
```

### Aprovechar el contexto

- Menciona archivos con Tab para autocompletar rutas
- Pega URLs de documentación si necesitas APIs externas
- Arrastra imágenes de diseño/mockups directamente

### Gestión de contexto

```bash
# Si Claude se "pierde" o el contexto se llena
/clear

# Para comprimir sin perder todo
/compact

# Para continuar donde lo dejaste (si reinicias)
/resume
```

---

## 📚 Recursos Adicionales

- [Claude Code Best Practices (Anthropic)](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Documentación oficial](https://docs.anthropic.com/en/docs/claude-code)
- [MCP Servers](https://github.com/modelcontextprotocol/servers)

---

## ✨ Recordatorio Final

> **El objetivo no es código perfecto, es un MVP que funcione y se pueda demostrar en 45 minutos.**

Flujo ganador:
1. Entender el problema (5 min)
2. Planificar con Claude (incluido en los 5 min)
3. Ejecutar sin distracciones (35 min)
4. Preparar demo (5 min)

---

*Creado para el Hackathon de Claude Code en Madrid - Diciembre 2025*

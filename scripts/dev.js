import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const apiDir = path.join(rootDir, 'api')
const webDir = path.join(rootDir, 'Taller 4')
const processes = []
let stopping = false

function stopProcesses(exitCode = 0) {
  if (stopping) return
  stopping = true

  for (const child of processes) {
    if (child.exitCode === null) child.kill()
  }

  process.exitCode = exitCode
}

function start(name, args, cwd) {
  const child = spawn(process.execPath, args, { cwd, stdio: 'inherit' })
  processes.push(child)
  child.on('error', (error) => {
    console.error(`[${name}] No se pudo iniciar: ${error.message}`)
    stopProcesses(1)
  })
  child.on('exit', (code) => {
    if (!stopping) {
      console.error(`[${name}] terminó${code === null ? '' : ` con código ${code}`}.`)
      stopProcesses(code ?? 1)
    }
  })
}

start('API', ['--watch', 'src/server.js'], apiDir)
start('WEB', [path.join(webDir, 'node_modules', 'vite', 'bin', 'vite.js')], webDir)

process.on('SIGINT', () => stopProcesses())
process.on('SIGTERM', () => stopProcesses())

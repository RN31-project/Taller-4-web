import cors from 'cors'
import express from 'express'

const app = express()
const port = process.env.PORT || 3000
let nextId = 2
let items = [{ id: 1, name: 'Primer elemento' }]

app.use(cors())
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    message: 'El API está funcionando correctamente.',
  })
})

app.get('/api/info', (_request, response) => {
  response.json({
    integrantes: [
      {
        nombre: 'Por completar',
        edad: null,
        carrera: 'Por completar',
        materiasAprobadas: null,
      },
    ],
  })
})

app.get('/api/items', (_request, response) => {
  response.json(items)
})

app.get('/api/items/:id', (request, response) => {
  const item = items.find(({ id }) => id === Number(request.params.id))

  if (!item) {
    return response.status(404).json({ error: 'Elemento no encontrado' })
  }

  response.json(item)
})

app.post('/api/items', (request, response) => {
  const name = request.body?.name?.trim()

  if (!name) {
    return response.status(400).json({ error: 'El campo name es obligatorio' })
  }

  const item = { id: nextId++, name }
  items.push(item)
  response.status(201).json(item)
})

app.put('/api/items/:id', (request, response) => {
  const item = items.find(({ id }) => id === Number(request.params.id))

  if (!item) {
    return response.status(404).json({ error: 'Elemento no encontrado' })
  }

  const name = request.body?.name?.trim()

  if (!name) {
    return response.status(400).json({ error: 'El campo name es obligatorio' })
  }

  item.name = name
  response.json(item)
})

app.delete('/api/items/:id', (request, response) => {
  const itemIndex = items.findIndex(({ id }) => id === Number(request.params.id))

  if (itemIndex === -1) {
    return response.status(404).json({ error: 'Elemento no encontrado' })
  }

  items = items.filter(({ id }) => id !== Number(request.params.id))
  response.status(204).end()
})

app.listen(port, () => {
  console.log(`API disponible en http://localhost:${port}`)
})
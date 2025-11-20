const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

let tasks = []
let taskId = 1

// Получить все задачи
app.get('/api/tasks', (req, res) => {
  res.json(tasks)
})

// Добавить задачу
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body
  const newTask = {
    id: taskId++,
    title,
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // +7 дней
  }
  tasks.push(newTask)
  res.status(201).json(newTask)
})

// Обновить задачу
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id)
  const taskIndex = tasks.findIndex(t => t.id === taskId)
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Задача не найдена' })
  }
  
  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body }
  res.json(tasks[taskIndex])
})

// Удалить задачу
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id)
  tasks = tasks.filter(t => t.id !== taskId)
  res.json({ message: 'Задача удалена' })
})

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`)
  console.log(`📊 API доступно по: http://localhost:${PORT}/api`)
})
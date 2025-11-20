import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const addTask = () => {
    if (title) {
      const newTask = {
        id: Date.now(),
        title,
        description,
        completed: false,
        createdAt: new Date().toLocaleString()
      }
      setTasks([...tasks, newTask])
      setTitle('')
      setDescription('')
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>⏰ Time Manager</h1>
      
      <div style={{ marginBottom: '20px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Добавить задачу</h3>
        <input
          type="text"
          placeholder="Название задачи"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <textarea
          placeholder="Описание (необязательно)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', minHeight: '60px' }}
        />
        <button 
          onClick={addTask}
          style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Добавить задачу
        </button>
      </div>

      <div>
        <h3>Мои задачи ({tasks.length})</h3>
        {tasks.length === 0 ? (
          <p>Задач пока нет</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} style={{
              padding: '15px',
              marginBottom: '10px',
              background: task.completed ? '#d4edda' : '#fff',
              border: '1px solid #ddd',
              borderRadius: '4px',
              opacity: task.completed ? 0.7 : 1
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.title}
                  </h4>
                  {task.description && (
                    <p style={{ margin: '0 0 5px 0', color: '#666' }}>{task.description}</p>
                  )}
                  <small style={{ color: '#999' }}>Создана: {task.createdAt}</small>
                </div>
                <div>
                  <button 
                    onClick={() => toggleTask(task.id)}
                    style={{ 
                      marginRight: '10px', 
                      padding: '5px 10px',
                      background: task.completed ? '#ffc107' : '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px'
                    }}
                  >
                    {task.completed ? 'Вернуть' : 'Выполнить'}
                  </button>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    style={{ 
                      padding: '5px 10px',
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px'
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
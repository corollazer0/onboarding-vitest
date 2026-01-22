import { defineStore } from 'pinia'
import { taskApi } from '@/api/task.api'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    filter: 'all'
  }),
  getters: {
    filteredTasks: (state) => {
      switch (state.filter) {
        case 'completed':
          return state.tasks.filter((task) => task.completed)
        case 'pending':
          return state.tasks.filter((task) => !task.completed)
        default:
          return state.tasks
      }
    },
    completedCount: (state) => {
      return state.tasks.filter((task) => task.completed).length
    },
    getTaskById: (state) => {
      return (id) => state.tasks.find((task) => task.id === id)
    }
  },
  actions: {
    addTask(title) {
      const payload = {
        title,
        completed: false
      }

      return taskApi.create(payload).then((response) => {
        this.tasks.push(response.data)
        return response.data
      })
    },
    toggleComplete(taskId) {
      const task = this.tasks.find((item) => item.id === taskId)
      if (task) {
        const nextCompleted = !task.completed

        return taskApi.update(taskId, { completed: nextCompleted }).then(() => {
          task.completed = nextCompleted
        })
      }
    },
    deleteTask(taskId) {
      return taskApi.delete(taskId).then(() => {
        this.tasks = this.tasks.filter((task) => task.id !== taskId)
      })
    }
  }
})

import { defineStore } from 'pinia'

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
      const newTask = {
        id: Date.now(),
        title,
        completed: false
      }

      this.tasks.push(newTask)
      return newTask
    },
    toggleComplete(taskId) {
      const task = this.tasks.find((item) => item.id === taskId)
      if (task) {
        task.completed = !task.completed
      }
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId)
    }
  }
})

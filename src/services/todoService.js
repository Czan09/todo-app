const STORAGE_KEY = 'todo_app_data';

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

const getLocalData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const setLocalData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const todoService = {

  getAll: async () => {
    await delay();
    return getLocalData();
  },

  getById: async (id) => {
    await delay();
    const todos = getLocalData();
    return todos.find(todo => todo.id === Number(id));
  },

  create: async (todo) => {
    await delay();
    const todos = getLocalData();
    const newTodo = {
      ...todo,
      id: Date.now(), 
      status: todo.status || 'pending'
    };
    todos.push(newTodo);
    setLocalData(todos);
    return newTodo;
  },

  update: async (id, updatedFields) => {
    await delay();
    const todos = getLocalData();
    const index = todos.findIndex(t => t.id === Number(id));
    
    if (index !== -1) {
      todos[index] = { ...todos[index], ...updatedFields };
      setLocalData(todos);
      return todos[index];
    }
    throw new Error('Todo not found');
  },

  delete: async (id) => {
    await delay();
    let todos = getLocalData();
    todos = todos.filter(t => t.id !== Number(id));
    setLocalData(todos);
    return true;
  }
};
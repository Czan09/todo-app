import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TodoListPage from './pages/RodoListPage';
import CreateTodoPage from './pages/CreateTodoPage'; 
import EditTodoPage from './pages/EditTodoPage'; 

import './App.css'; 

function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen bg-gray-50 p-4"> 
        <Routes>
          <Route path="/" element={<Navigate to="/todos" replace />} />
          
          <Route path="/todos" element={<TodoListPage />} /> 

          <Route path="/todos/create" element={<CreateTodoPage />} /> 

          <Route path="/todos/:id/edit" element={<EditTodoPage />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
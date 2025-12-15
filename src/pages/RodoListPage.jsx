import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { todoService } from '../services/todoService';

export default function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      const data = await todoService.getAll();
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Todo?')) {
      await todoService.delete(id);
      fetchTodos(); 
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Todo List</h1>
      <Link to="/todos/create">
        <button style={{ marginBottom: '20px' }}>+ Create Todo</button>
      </Link>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {todos.map(todo => (
          <div key={todo.id} style={{ border: '1px solid #ccc', padding: '10px', display: 'flex', gap: '10px' }}>
            {todo.image && (
              <img src={todo.image} alt="thumbnail" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            )}
            <div>
              <h3>{todo.title}</h3>
              <p>Status: <strong>{todo.status}</strong></p>
              <div style={{ marginTop: '10px' }}>
                <Link to={`/todos/${todo.id}/edit`}>
                  <button style={{ marginRight: '5px' }}>Edit</button>
                </Link>
                <button onClick={() => handleDelete(todo.id)} style={{ backgroundColor: 'red', color: 'white' }}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
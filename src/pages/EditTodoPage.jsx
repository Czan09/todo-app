import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { todoService } from '../services/todoService';
import TodoForm from '../components/TodoForm';

export default function EditTodoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [
    loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const data = await todoService.getById(id);
        if (data) {
            setTodo(data);
        } else {
            navigate('/todos');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [id, navigate]);

  const handleUpdate = async (formData) => {
    await todoService.update(id, formData);
    navigate('/todos');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Todo</h1>
      {todo && <TodoForm initialData={todo} onSubmit={handleUpdate} isEdit />}
    </div>
  );
}
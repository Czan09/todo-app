import { useNavigate } from 'react-router-dom';
import { todoService } from '../services/todoService';
import TodoForm from '../components/TodoForm';

export default function CreateTodoPage() {
  const navigate = useNavigate();


  const handleCreate = async (formData) => {

    if (!formData.title) {
        alert("Title is required!");
        return;
    }

    const newTodoData = {
        ...formData,
        status: formData.status || 'pending',
    };

    try {

        await todoService.create(newTodoData);
        
        navigate('/todos'); 

    } catch (error) {

        console.error("Failed to create Todo:", error);
        alert("An error occurred while creating the Todo.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Todo</h1>
      
      {}
      <TodoForm 
        onSubmit={handleCreate} 
      />
        <div className='go-back'>
      <div className="mt-4 text-center ">
        <button onClick={() => navigate('/todos')} className="text-blue-600 hover:text-blue-800">
            &larr; Cancel and Go Back
        </button>
        </div>
      </div>
    </div>
  );
}
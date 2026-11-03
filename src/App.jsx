import React, { useState } from 'react';
import { Container, Button, Form, InputGroup } from 'react-bootstrap';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]); 
  const [showForm, setShowForm] = useState(false); 
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleShowForm = () => setShowForm(true); 
  const handleCloseForm = () => {
    setShowForm(false); 
    setTaskToEdit(null);
  }; 

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
      createdAt: new Date().toLocaleString('id-ID')
    };
    setTasks([...tasks, newTask]);
  }; 

  const editTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  }; 

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }; 

  const showEditForm = (task) => {
    setTaskToEdit(task);
    handleShowForm();
  }; 

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return ( 
    <Container className="my-5" style={{ maxWidth: '800px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h1 className="mb-0 fw-bold">Daftar Tugas</h1>
          <p className="text-muted mb-0">Hanif Nur Faiz - 2511501043</p>
        </div>
        <Button variant="primary" className="shadow-sm" onClick={handleShowForm}>
          <i className="bi bi-plus-lg me-2"></i>Add Task 
        </Button>
      </div>

      <InputGroup className="mb-4 shadow-sm">
        <InputGroup.Text className="bg-white"><i className="bi bi-search"></i></InputGroup.Text>
        <Form.Control
          placeholder="Cari tugas yang tersimpan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      <div className="mt-4">
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          showEditForm={showEditForm}
        />
        <TaskForm
          show={showForm}
          handleClose={handleCloseForm}
          addTask={addTask}
          editTask={editTask}
          taskToEdit={taskToEdit}
        />
      </div>
    </Container>
  );
}

export default App;
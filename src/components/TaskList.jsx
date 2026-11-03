import React from 'react';
import { Button, Card, Badge } from 'react-bootstrap'; 

const TaskList = ({ tasks, deleteTask, showEditForm }) => {
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Done': return 'success';
      case 'In Progress': return 'info';
      default: return 'secondary';
    }
  };

  if (tasks.length === 0) {
    return <div className="text-center text-muted py-5">Belum ada tugas. Klik "Add Task" untuk menambahkan.</div>;
  }

  return ( 
    <div>
      {tasks.map((task) => ( 
        <Card className="mb-3 shadow-sm border-0 border-start border-4 border-primary" key={task.id}>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-2 fw-semibold">{task.name}</h5> 
              <div className="mb-2">
                <Badge bg={getPriorityBadge(task.priority)} className="me-2 text-uppercase">
                  <i className="bi bi-flag-fill me-1"></i> {task.priority}
                </Badge>
                <Badge bg={getStatusBadge(task.status)} className="text-uppercase">
                  {task.status}
                </Badge>
              </div>
              <small className="text-muted">
                <i className="bi bi-clock me-1"></i>Dibuat pada: {task.createdAt || 'Baru saja'}
              </small>
            </div>
            <div>
              <Button variant="outline-primary" className="me-2" size="sm" onClick={() => showEditForm(task)}>
                <i className="bi bi-pencil-square"></i>
              </Button>
              <Button variant="outline-danger" size="sm" onClick={() => deleteTask(task.id)}>
                <i className="bi bi-trash"></i>
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))} 
    </div>
  );
}; 
export default TaskList;
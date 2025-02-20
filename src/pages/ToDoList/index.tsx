import { useState } from "react";
import { Button, Input, Modal } from "antd";
import { Edit, Trash, Plus } from "lucide-react";
import "./ToDoList.css"; 

interface Task {
  id: number;
  content: string;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTask = () => {
    if (!newTask.trim()) return;
    if (editingTask) {
      setTasks(tasks.map(task => (task.id === editingTask.id ? { ...task, content: newTask } : task)));
      setEditingTask(null);
    } else {
      setTasks([...tasks, { id: Date.now(), content: newTask }]);
    }
    setNewTask("");
    setIsModalOpen(false);
  };

  const editTask = (task: Task) => {
    setNewTask(task.content);
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container">
      <h1 className="title">TO DO LIST</h1>
      <button onClick={() => setIsModalOpen(true)} className="create-button">
        <Plus size={16} /> Tạo mới
      </button>

      <div className="task-grid">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <span>{task.content}</span>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="icon" onClick={() => editTask(task)}>
                <Edit size={16} />
              </Button>
              <Button variant="destructive" size="icon" onClick={() => deleteTask(task.id)}>
                <Trash size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal visible={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <div className="modal-content">
          <h2 className="text-xl font-bold">{editingTask ? "Chỉnh sửa" : "Tạo mới"}</h2>
          <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Nhập nội dung..." className="modal-input" />
          <div className="modal-buttons">
            <Button onClick={() => setIsModalOpen(false)} className="modal-cancel">Hủy</Button>
            <Button onClick={addTask} className="modal-create">{editingTask ? "Cập nhật" : "Tạo"}</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

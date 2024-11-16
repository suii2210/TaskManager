import React, { useState } from 'react';

type TaskInputProps = {
  onAddTask: (title: string) => void;
};

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (title.trim()) {
      onAddTask(title);
      setTitle('');
    } else {
      alert("Task title can't be empty");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
};

import React from 'react';

type TaskItemProps = {
  id: string;
  title: string;
  onDelete: (id: string) => void;
};

export const TaskItem: React.FC<TaskItemProps> = ({ id, title, onDelete }) => (
  <div>
    <span>{title}</span>
    <button onClick={() => onDelete(id)}>Delete</button>
  </div>
);

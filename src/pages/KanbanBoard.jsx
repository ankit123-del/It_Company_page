import React, { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import { FaPaintBrush, FaLaptopCode } from "react-icons/fa";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    backlog: [
      {
        id: 1,
        title: "Design new landing page",
        priority: "high",
        assignee: <FaPaintBrush />,
        tags: ["design"],
      },
      {
        id: 2,
        title: "Write API documentation",
        priority: "medium",
        assignee: <FaLaptopCode />,
        tags: ["docs"],
      },
    ],
    todo: [
      {
        id: 3,
        title: "Fix login bug",
        priority: "high",
        assignee: <FaLaptopCode />,
        tags: ["bug"],
      },
      {
        id: 4,
        title: "Update dependencies",
        priority: "low",
        assignee: <FaLaptopCode />,
        tags: ["maintenance"],
      },
    ],
    inProgress: [
      {
        id: 5,
        title: "Payment integration",
        priority: "high",
        assignee: <FaLaptopCode />,
        tags: ["feature"],
      },
      {
        id: 6,
        title: "Mobile responsive fixes",
        priority: "medium",
        assignee: <FaPaintBrush />,
        tags: ["ui"],
      },
    ],
    review: [
      {
        id: 7,
        title: "User authentication",
        priority: "high",
        assignee: <FaLaptopCode />,
        tags: ["security"],
      },
    ],
    done: [
      {
        id: 8,
        title: "Setup CI/CD pipeline",
        priority: "medium",
        assignee: <FaLaptopCode />,
        tags: ["devops"],
      },
      {
        id: 9,
        title: "Database schema",
        priority: "high",
        assignee: <FaLaptopCode />,
        tags: ["backend"],
      },
    ],
  });

  const [draggedTask, setDraggedTask] = useState(null);

  const columns = [
    { id: "backlog", title: "Backlog", color: "var(--gray-400)" },
    { id: "todo", title: "To Do", color: "var(--info)" },
    { id: "inProgress", title: "In Progress", color: "var(--warning)" },
    { id: "review", title: "Review", color: "var(--purple)" },
    { id: "done", title: "Done", color: "var(--success)" },
  ];

  const handleDragStart = (task, columnId) => {
    setDraggedTask({ task, from: columnId });
  };

  const handleDrop = (toColumn) => {
    if (!draggedTask) return;

    const { task, from } = draggedTask;
    if (from === toColumn) {
      setDraggedTask(null);
      return;
    }

    setTasks((prev) => ({
      ...prev,
      [from]: prev[from].filter((t) => t.id !== task.id),
      [toColumn]: [...prev[toColumn], task],
    }));
    setDraggedTask(null);
  };

  const priorityColors = {
    high: "var(--danger)",
    medium: "var(--warning)",
    low: "var(--success)",
  };

  return (
    <div className="kanban-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Kanban Board" }]} />
          <h1 className="page-title">Project Board</h1>
          <p className="page-subtitle">Drag and drop tasks to update status</p>
        </div>
      </div>

      <div className="container">
        <div className="kanban-board">
          {columns.map((column) => (
            <div
              key={column.id}
              className="kanban-column"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(column.id)}
            >
              <div className="kanban-column-header">
                <div className="kanban-column-title">
                  <span
                    className="kanban-column-dot"
                    style={{ background: column.color }}
                  />
                  <h3>{column.title}</h3>
                  <span className="kanban-column-count">
                    {tasks[column.id].length}
                  </span>
                </div>
                <button className="kanban-add-btn">+</button>
              </div>

              <div className="kanban-column-body">
                {tasks[column.id].map((task) => (
                  <div
                    key={task.id}
                    className="kanban-card"
                    draggable
                    onDragStart={() => handleDragStart(task, column.id)}
                  >
                    <div className="kanban-card-tags">
                      {task.tags.map((tag, i) => (
                        <span key={i} className="kanban-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="kanban-card-title">{task.title}</p>
                    <div className="kanban-card-footer">
                      <span
                        className="kanban-priority-dot"
                        style={{ background: priorityColors[task.priority] }}
                        title={`Priority: ${task.priority}`}
                      />
                      <span className="kanban-assignee">{task.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;

import React, { useState, useEffect } from "react";
import BaseWindow from "~/components/BaseWindow";
import "~/main.css";

type Props = {
    onClose: () => void;
    zIndex: number;
};

type Task = {
    id: number;
    text: string;
    checked: boolean;
    subtasks: Task[];
};

function TaskWindow({ onClose, zIndex }: Props) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("taskList");
        if (saved) setTasks(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("taskList", JSON.stringify(tasks));
    }, [tasks]);

    const toggleTask = (taskList: Task[], id: number): Task[] =>
        taskList.map(task =>
            task.id === id
                ? { ...task, checked: !task.checked }
                : { ...task, subtasks: toggleTask(task.subtasks, id) }
        );

    const handleTextChange = (taskList: Task[], id: number, newText: string): Task[] =>
        taskList.map(task =>
            task.id === id
                ? { ...task, text: newText }
                : { ...task, subtasks: handleTextChange(task.subtasks, id, newText) }
        );

    const removeTask = (taskList: Task[], id: number): Task[] =>
        taskList
            .filter(task => task.id !== id)
            .map(task => ({ ...task, subtasks: removeTask(task.subtasks, id) }));

    const addTask = (parentId: number | null = null) => {
        const newTask: Task = {
            id: Date.now(),
            text: "",
            checked: false,
            subtasks: [],
        };

        if (parentId === null) {
            setTasks(prev => [...prev, newTask]);
        } else {
            const insertSubtask = (taskList: Task[]): Task[] =>
                taskList.map(task =>
                    task.id === parentId
                        ? { ...task, subtasks: [...task.subtasks, newTask] }
                        : { ...task, subtasks: insertSubtask(task.subtasks) }
                );
            setTasks(prev => insertSubtask(prev));
        }
    };

    const renderTasks = (taskList: Task[], depth = 0) =>
        taskList.map(task => (
            <div key={task.id} style={{ marginLeft: `${depth * 20}px` }}>
                {editMode ? (
                    <>
                        <input
                            type="text"
                            value={task.text}
                            onChange={e =>
                                setTasks(prev => handleTextChange(prev, task.id, e.target.value))
                            }
                        />
                        <button
                            onClick={() => addTask(task.id)}
                            style={{ ...buttonStyle, backgroundColor: "var(--color_blue)" }}
                        >
                            +
                        </button>
                        <button
                            onClick={() => setTasks(prev => removeTask(prev, task.id))}
                            style={{ ...buttonStyle, backgroundColor: "var(--color_red)" }}
                        >
                            ×
                        </button>
                    </>
                ) : (
                    <label>
                        <input
                            type="checkbox"
                            checked={task.checked}
                            onChange={() => setTasks(prev => toggleTask(prev, task.id))}
                        />
                        <span style={{ marginLeft: "0.5rem" }}>{task.text}</span>
                    </label>
                )}
                {renderTasks(task.subtasks, depth + 1)}
            </div>
        ));

    return (
        <BaseWindow
            title="Task"
            defaultPosition={{ x: 400, y: 100 }}
            defaultSize={{ width: 500, height: 300 }}
            onClose={onClose}
            zIndex={zIndex}
        >
            <div style={{ position: "relative", height: "100%" }}>
                <div>
                    <button
                        onClick={() => setEditMode(!editMode)}
                        style={{
                            ...controlButtonStyle,
                            backgroundColor: editMode
                                ? "var(--color_red)"
                                : "var(--color_blue)",
                        }}
                    >
                        {editMode ? "チェックモードに切替" : "編集モードに切替"}
                    </button>

                    {editMode && (
                        <button
                            onClick={() => addTask(null)}
                            style={{ ...controlButtonStyle, backgroundColor: "var(--color_green)" }}
                        >
                            タスクの追加
                        </button>
                    )}
                </div>

                <div
                    style={{
                        position: "absolute",
                        top: "50px",
                        bottom: "1rem",
                        left: "1rem",
                        right: "1rem",
                        overflowY: "auto",
                    }}
                >
                    {tasks.map(task => (
                        <div key={task.id} style={{ marginBottom: "1rem" }}>
                            {renderTasks([task])}
                        </div>
                    ))}
                </div>
            </div>
        </BaseWindow>
    );
}

const buttonStyle = {
    width: "24px",
    height: "24px",
    borderRadius: "6px",
    border: "none",
    color: "var(--color_white)",
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft: "0.5rem",
};

const controlButtonStyle = {
    border: "none",
    borderRadius: "6px",
    color: "var(--color_white)",
    fontWeight: "bold",
    padding: "6px 12px",
    cursor: "pointer",
    marginRight: "0.5rem",
} as React.CSSProperties;

export default TaskWindow;

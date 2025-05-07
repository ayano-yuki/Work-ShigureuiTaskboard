import React, { useState, useEffect } from "react"
import BaseWindow from "~/components/BaseWindow"
import "~/main.css"

type Props = {
    onClose: () => void
    zIndex: number
}

type Task = {
    id: number
    text: string
    checked: boolean
    subtasks: Task[]
}

function TaskWindow({ onClose, zIndex }: Props) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem("taskList")
        if (saved) setTasks(JSON.parse(saved))
    }, [])

    useEffect(() => {
        localStorage.setItem("taskList", JSON.stringify(tasks))
    }, [tasks])

    const toggleTask = (taskList: Task[], id: number): Task[] =>
        taskList.map(task =>
            task.id === id
                ? { ...task, checked: !task.checked }
                : { ...task, subtasks: toggleTask(task.subtasks, id) }
        )

    const handleTextChange = (taskList: Task[], id: number, newText: string): Task[] =>
        taskList.map(task =>
            task.id === id
                ? { ...task, text: newText }
                : { ...task, subtasks: handleTextChange(task.subtasks, id, newText) }
        )

    const removeTask = (taskList: Task[], id: number): Task[] =>
        taskList
            .filter(task => task.id !== id)
            .map(task => ({ ...task, subtasks: removeTask(task.subtasks, id) }))

    const addTask = (parentId: number | null = null) => {
        const newTask: Task = {
            id: Date.now(),
            text: "",
            checked: false,
            subtasks: [],
        }

        if (parentId === null) {
            setTasks(prev => [...prev, newTask])
        } else {
            const insertSubtask = (list: Task[]): Task[] =>
                list.map(task =>
                    task.id === parentId
                        ? { ...task, subtasks: [...task.subtasks, newTask] }
                        : { ...task, subtasks: insertSubtask(task.subtasks) }
                )
            setTasks(prev => insertSubtask(prev))
        }
    }

    const renderTasks = (taskList: Task[], depth = 0): React.ReactNode =>
        taskList.map(task => (
            <div key={task.id} style={{ marginLeft: depth * 20 }}>
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
                            style={{ ...taskButtonStyle, backgroundColor: "var(--color_blue)" }}
                        >
                            +
                        </button>
                        <button
                            onClick={() => setTasks(prev => removeTask(prev, task.id))}
                            style={{ ...taskButtonStyle, backgroundColor: "var(--color_red)" }}
                        >
                            ×
                        </button>
                    </>
                ) : (
                    <label style={{ display: "flex", alignItems: "center" }}>
                        <input
                            type="checkbox"
                            checked={task.checked}
                            onChange={() => setTasks(prev => toggleTask(prev, task.id))}
                            style={{ width: 18, height: 18 }}
                        />
                        <span style={taskTextStyle}>{task.text}</span>
                    </label>
                )}
                {renderTasks(task.subtasks, depth + 1)}
            </div>
        ))

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
                            ...modeButtonStyle,
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
                            style={{ ...modeButtonStyle, backgroundColor: "var(--color_green)" }}
                        >
                            タスクの追加
                        </button>
                    )}
                </div>

                <div style={scrollAreaStyle}>
                    {tasks.map(task => (
                        <div key={task.id} style={{ marginBottom: "1rem" }}>
                            {renderTasks([task])}
                        </div>
                    ))}
                </div>
            </div>
        </BaseWindow>
    )
}

// --- Styles ---
const taskButtonStyle: React.CSSProperties = {
    width: 24,
    height: 24,
    borderRadius: 6,
    border: "none",
    color: "var(--color_white)",
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft: "0.5rem",
}

const modeButtonStyle: React.CSSProperties = {
    border: "none",
    borderRadius: 6,
    color: "var(--color_white)",
    fontWeight: "bold",
    padding: "6px 12px",
    cursor: "pointer",
    marginRight: "0.5rem",
}

const scrollAreaStyle: React.CSSProperties = {
    position: "absolute",
    top: 50,
    bottom: "1rem",
    left: "1rem",
    right: "1rem",
    overflowY: "auto",
}

const taskTextStyle: React.CSSProperties = {
    marginLeft: "0.5rem",
    fontSize: "14px",
    fontWeight: "bold",
}

export default TaskWindow

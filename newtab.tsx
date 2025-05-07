import React, { useState } from "react";
import Background from "~/views/Background";
import YoutubeWindow from "~/views/YoutubeWindow";
import MemoWindow from "~/views/MemoWindow";
import TaskWindow from "~/views/TaskWindow";
import "./main.css";

type WindowName = "memo" | "youtube" | "task";

function NewTab() {
    const [windows, setWindows] = useState<Record<WindowName, boolean>>({
        memo: false,
        youtube: false,
        task: false,
    });

    const [zIndexes, setZIndexes] = useState<Record<WindowName, number>>({
        memo: 1,
        youtube: 2,
        task: 3,
    });

    const handleToggleWindow = (windowName: WindowName) => {
        setZIndexes((prev) => {
            const maxZ = Math.max(...Object.values(prev));
            return { ...prev, [windowName]: maxZ + 1 };
        });

        setWindows((prev) => ({
            ...prev,
            [windowName]: !prev[windowName],
        }));
    };

    const handleCloseWindow = (windowName: WindowName) => {
        setWindows((prev) => ({ ...prev, [windowName]: false }));
    };

    const renderWindow = (name: WindowName) => {
        const props = {
            onClose: () => handleCloseWindow(name),
            zIndex: zIndexes[name],
        };

        if (!windows[name]) return null;

        switch (name) {
            case "memo":
                return <MemoWindow {...props} />;
            case "youtube":
                return <YoutubeWindow {...props} />;
            case "task":
                return <TaskWindow {...props} />;
        }
    };

    return (
        <div className="container">
            <Background />

            {/* アイコンバー */}
            <div style={iconBarStyle}>
                <button style={squareButtonStyle} onClick={() => handleToggleWindow("memo")}>Memo</button>
                <button style={squareButtonStyle} onClick={() => handleToggleWindow("youtube")}>YouTube</button>
                <button style={squareButtonStyle} onClick={() => handleToggleWindow("task")}>Task</button>
            </div>

            {/* 各ウィンドウ */}
            {renderWindow("memo")}
            {renderWindow("youtube")}
            {renderWindow("task")}
        </div>
    );
}

const iconBarStyle: React.CSSProperties = {
    position: "absolute",
    top: "60px",
    right: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    zIndex: 0,
};

const squareButtonStyle: React.CSSProperties = {
    width: "80px",
    height: "80px",
    background: "var(--color_black)",
    color: "var(--color_white)",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
};

export default NewTab;

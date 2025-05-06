import React, { useState } from "react"

import Background from "~/views/Background"
import YoutubeWindow from "~/views/YoutubeWindow"
import MemoWindow from "~/views/MemoWindow"
import TaskWindow from "~/views/TaskWindow"
import "./main.css"

function NewTab() {
    const [windows, setWindows] = useState({
        memo: false,
        youtube: false,
        task: false,
    });

    const [zIndexes, setZIndexes] = useState({
        memo: 1,
        youtube: 2,
        task: 3,
    });

    const handleOpenWindow = (windowName: "memo" | "youtube" | "task") => {
        setZIndexes((prevZIndexes) => {
            const maxZIndex = Math.max(prevZIndexes.memo, prevZIndexes.youtube);
            
            return {
                ...prevZIndexes,
                [windowName]: maxZIndex + 1,
            };
        });
    
        setWindows((prev) => ({
            ...prev,
            [windowName]: true,
        }));
    };

    return (
        <div className="container">
            <Background />

            {/* アイコン */}
            <div style={iconBarStyle}>
                <button style={squareButtonStyle} onClick={() => handleOpenWindow("memo")}>Memo</button>
                <button style={squareButtonStyle} onClick={() => handleOpenWindow("youtube")}>YouTube</button>
                <button style={squareButtonStyle} onClick={() => handleOpenWindow("task")}>Task</button>
            </div>

            {/* ウィンドウ */}
            {windows.memo && (
                <MemoWindow
                    onClose={() => setWindows((prev) => ({ ...prev, memo: false }))}
                    zIndex={zIndexes.memo}
                />
            )}

            {windows.task && (
                <TaskWindow
                    onClose={() => setWindows((prev) => ({ ...prev, task: false }))}
                    zIndex={zIndexes.task}
                />
            )}

            {windows.youtube && (
                <YoutubeWindow
                    onClose={() => setWindows((prev) => ({ ...prev, youtube: false }))}
                    zIndex={zIndexes.youtube}
                />
            )}
        </div>
    )
}

const iconBarStyle: React.CSSProperties = {
    position: "absolute",
    top: "60px",
    right: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    zIndex: 0,
}

const squareButtonStyle: React.CSSProperties = {
    width: "80px",
    height: "80px",
    background: "var(--color_black)",
    color: "var(--color_white)",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
}

export default NewTab

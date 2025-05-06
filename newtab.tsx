import React, { useState } from "react"

import Background from "~/views/Background"
import YoutubeWindow from "~/views/YoutubeWindow"
import MemoWindow from "~/views/MemoWindow"
import "./main.css"

function NewTab() {
    const [windows, setWindows] = useState({
        memo: false,
        youtube: false,
    });

    const [zIndexes, setZIndexes] = useState({
        memo: 1,
        youtube: 2,
    });

    const handleOpenWindow = (windowName: "memo" | "youtube") => {
        // 最前面のzIndexを設定する
        setZIndexes((prevZIndexes) => {
            const maxZIndex = Math.max(prevZIndexes.memo, prevZIndexes.youtube);
            
            return {
                ...prevZIndexes,
                [windowName]: maxZIndex + 1,  // 新しいウィンドウのzIndexを設定
            };
        });
    
        // ウィンドウを表示
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
            </div>

            {/* ウィンドウ */}
            {windows.memo && (
                <MemoWindow
                    onClose={() => setWindows((prev) => ({ ...prev, memo: false }))}
                    zIndex={zIndexes.memo}
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
    zIndex: 1000,
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

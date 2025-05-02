import React, { useState } from "react"
import { Rnd } from "react-rnd"

import "~/main.css"

const BaseWindow = ({
    title = "Window",
    defaultPosition = { x: 100, y: 100 },
    defaultSize = { width: 500, height: 300 },
    children,
}) => {
    const [visible, setVisible] = useState(true)
    const [isMaximized, setIsMaximized] = useState(false)
    const [position, setPosition] = useState(defaultPosition)
    const [size, setSize] = useState(defaultSize)

    if (!visible) return null

    const handleMinimize = () => setVisible(false)

    const handleMaximize = () => {
        if (isMaximized) {
            setSize(defaultSize)
            setPosition(defaultPosition)
            setIsMaximized(false)
        } else {
            setSize({ width: window.innerWidth, height: window.innerHeight })
            setPosition({ x: 0, y: 0 })
            setIsMaximized(true)
        }
    }

    const handleClose = () => {
        // 完全に削除したいなら null return、あるいは親から削除する
        setVisible(false)
    }

    return (
        <Rnd
            size={size}
            position={position}
            onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
            onResizeStop={(e, direction, ref, delta, position) => {
                setSize({
                    width: ref.offsetWidth,
                    height: ref.offsetHeight
                })
                setPosition(position)
            }}
            bounds="parent"
            minWidth={300}
            minHeight={150}
            style={{
                background: "var(--color_white)",
                borderRadius: "10px",
                overflow: "hidden",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                boxShadow: "8px 8px 8px rgba(0, 0.2, 0, 0.2)"
            }}
        >
            <div
                style={{
                    height: "32px",
                    background: "var(--color_blue)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 12px",
                    justifyContent: "space-between",
                }}
            >
                {/* コントロールボタン */}
                <div style={{ display: "flex", gap: "6px" }}>
                    <span onClick={handleClose} style={buttonStyle("red")} />
                    <span onClick={handleMinimize} style={buttonStyle("gold")} />
                    <span onClick={handleMaximize} style={buttonStyle("green")} />
                </div>
                <span style={{ fontSize: "14px", fontWeight: "bold", color: "var(--color_white)" }}>{title}</span>
                <div style={{ width: "36px" }} />
            </div>

            <div style={{ padding: "12px", fontSize: "14px", fontWeight: "bold", flexGrow: 1, overflow: "note" }}>
                {children}
            </div>
        </Rnd>
    )
}

// 各ボタンのスタイルを共通化
const buttonStyle = (color) => ({
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: color,
    cursor: "pointer"
})

export default BaseWindow

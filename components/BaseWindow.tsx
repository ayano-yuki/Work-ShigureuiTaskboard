import React, { useState, useEffect } from "react"
import { Rnd } from "react-rnd"

import "~/main.css"

type BaseWindowProps = {
    title?: string
    defaultPosition?: { x: number; y: number }
    defaultSize?: { width: number; height: number }
    visible?: boolean
    onClose?: () => void
    onMinimize?: () => void
    children: React.ReactNode
    zIndex?: number
}

const BaseWindow = ({
    title = "Window",
    defaultPosition = { x: 100, y: 100 },
    defaultSize = { width: 500, height: 300 },
    visible: propVisible = true,
    onClose = () => {},
    onMinimize = () => {},
    children,
    zIndex = 10,
}: BaseWindowProps) => {
    const [visible, setVisible] = useState(propVisible)
    const [isMaximized, setIsMaximized] = useState(false)
    const [position, setPosition] = useState(defaultPosition)
    const [size, setSize] = useState(defaultSize)

    // propのvisibleが変わったら内部stateに反映
    useEffect(() => {
        setVisible(propVisible)
    }, [propVisible])

    if (!visible) return null

    const handleMinimize = () => {
        setVisible(false)
        onMinimize()
    }

    const handleClose = () => {
        setVisible(false)
        onClose()
    }

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
                zIndex: zIndex,
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
                <div style={{ display: "flex", gap: "6px" }}>
                    <span onClick={handleClose} style={buttonStyle("var(--color_red)")} />
                    <span onClick={handleMinimize} style={buttonStyle("var(--colotr_yellow)")} />
                    <span onClick={handleMaximize} style={buttonStyle("var(--color_green)")} />
                </div>
                <span style={{ fontSize: "14px", fontWeight: "bold", color: "var(--color_white)" }}>{title}</span>
                <div style={{ width: "36px" }} />
            </div>

            <div style={{ padding: "12px", fontSize: "14px", fontWeight: "bold", flexGrow: 1, overflow: "none" }}>
                {children}
            </div>
        </Rnd>
    )
}


// 各ボタンのスタイルを共通化
const buttonStyle = (color: string) => ({
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: color,
    cursor: "pointer"
})

export default BaseWindow

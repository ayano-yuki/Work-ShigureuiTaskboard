import React from "react"
import { Rnd } from "react-rnd"

import "./main.css"

const BaseWindow = ({
    title = "Window",
    defaultPosition = { x: 100, y: 100 },
    defaultSize = { width: 500, height: 300 },
    children,
}) => {
    return (
        <Rnd
            default={{
                x: defaultPosition.x,
                y: defaultPosition.y,
                width: defaultSize.width,
                height: defaultSize.height,
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

                <div style={{ display: "flex", gap: "6px" }}>
                    <span style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "var(--color_white)"
                    }} />
                    <span style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "var(--color_white)"
                    }} />
                    <span style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "var(--color_white)"
                    }} />
                </div>
                <span style={{ fontSize: "14px", fontWeight: "bold", color: "var(--color_white)" }}>{title}</span>
                <div style={{ width: "36px" }} />
            </div>


            <div style={{ padding: "12px", fontSize: "14px", fontWeight: "bold", flexGrow: 1, overflow: "auto" }}>
                {children}
            </div>
        </Rnd>
    )
}

export default BaseWindow

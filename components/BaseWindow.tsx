import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import "~/main.css";

type BaseWindowProps = {
    title?: string;
    defaultPosition?: { x: number; y: number };
    defaultSize?: { width: number; height: number };
    visible?: boolean;
    onClose?: () => void;
    onMinimize?: () => void;
    children: React.ReactNode;
    zIndex?: number;
};

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
    const [visible, setVisible] = useState(propVisible);
    const [isMaximized, setIsMaximized] = useState(false);
    const [position, setPosition] = useState(defaultPosition);
    const [size, setSize] = useState(defaultSize);

    useEffect(() => {
        setVisible(propVisible);
    }, [propVisible]);

    if (!visible) return null;

    const handleClose = () => {
        setVisible(false);
        onClose();
    };

    const handleMinimize = () => {
        setVisible(false);
        onMinimize();
    };

    const handleMaximize = () => {
        if (isMaximized) {
            setSize(defaultSize);
            setPosition(defaultPosition);
        } else {
            setSize({ width: window.innerWidth, height: window.innerHeight });
            setPosition({ x: 0, y: 0 });
        }
        setIsMaximized(!isMaximized);
    };

    return (
        <Rnd
            size={size}
            position={position}
            onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
            onResizeStop={(e, direction, ref, delta, pos) => {
                setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
                setPosition(pos);
            }}
            bounds="parent"
            minWidth={300}
            minHeight={150}
            style={windowStyle(zIndex)}
        >
            <div style={titleBarStyle}>
                <div style={buttonGroupStyle}>
                    <span onClick={handleClose} style={buttonStyle("var(--color_red)")} />
                    <span onClick={handleClose} style={buttonStyle("var(--color_yellow)")} />
                    <span onClick={handleMaximize} style={buttonStyle("var(--color_green)")} />
                </div>
                <span style={titleTextStyle}>{title}</span>
                <div style={{ width: "36px" }} />
            </div>

            <div style={contentStyle}>
                {children}
            </div>
        </Rnd>
    );
};

// ===== スタイル定義 =====

const windowStyle = (zIndex: number): React.CSSProperties => ({
    background: "var(--color_white)",
    borderRadius: "10px",
    overflow: "hidden",
    zIndex,
    display: "flex",
    flexDirection: "column",
    boxShadow: "8px 8px 8px rgba(0, 0.2, 0, 0.2)",
});

const titleBarStyle: React.CSSProperties = {
    height: "32px",
    background: "var(--color_blue)",
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    justifyContent: "space-between",
};

const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "6px",
};

const titleTextStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: "bold",
    color: "var(--color_white)",
};

const contentStyle: React.CSSProperties = {
    padding: "12px",
    fontSize: "14px",
    fontWeight: "bold",
    flexGrow: 1,
    overflow: "hidden",
};

const buttonStyle = (color: string): React.CSSProperties => ({
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: color,
    cursor: "pointer",
});

export default BaseWindow;

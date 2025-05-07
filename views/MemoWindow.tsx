import React, { useRef, useEffect } from "react"

import BaseWindow from "~/components/BaseWindow"
import "~/main.css"

type Props = {
    onClose: () => void
    zIndex: number
}

function MemoWindow({ onClose, zIndex }: Props) {
    const memoRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        const savedMemo = localStorage.getItem("memoContent")
        if (savedMemo && memoRef.current) {
            memoRef.current.value = savedMemo
        }
    }, [])

    const handleChange = () => {
        if (memoRef.current) {
            localStorage.setItem("memoContent", memoRef.current.value)
        }
    }

    const handleDelete = () => {
        localStorage.removeItem("memoContent")
        if (memoRef.current) {
            memoRef.current.value = ""
        }
    }

    return (
        <BaseWindow
            title="Memo"
            defaultPosition={{ x: 400, y: 100 }}
            defaultSize={{ width: 500, height: 300 }}
            onClose={onClose}
            zIndex={zIndex}
        >
            <textarea
                ref={memoRef}
                onChange={handleChange}
                style={{
                    background: "var(--color_white)",
                    width: "100%",
                    height: "100%",
                    outline: "none",
                    border: "none",
                    padding: "0.5rem",
                    fontSize: "14px",
                    fontWeight: "bold",
                    lineHeight: "1.4",
                    resize: "none"
                }}
                spellCheck={false}
            />
        </BaseWindow>
    )
}

export default MemoWindow

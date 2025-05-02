import React, { useRef, useEffect } from "react"

import BaseWindow from "~/components/BaseWindow"
import "~/main.css"

function MemoWindow() {
    const memoRef = useRef(null)

    useEffect(() => {
        const savedMemo = localStorage.getItem('memoContent')
        if (savedMemo) {
            memoRef.current.value = savedMemo
        }
    }, [])

    const handleChange = () => {
        const memoContent = memoRef.current.value
        localStorage.setItem('memoContent', memoContent)
    }

    const handleDelete = () => {
        localStorage.removeItem('memoContent') 
        memoRef.current.value = ""
    }

    return (
        <BaseWindow title="Memo">
            <textarea
                ref={memoRef}
                onChange={handleChange}
                contentEditable
                suppressContentEditableWarning={true}
                style={{
                    background: "var(--color_white)",
                    width: "100%",
                    height: "100%",
                    outline: "none",
                    border: "none",
                    padding: "0.5rem",
                    fontSize: "14px",
                    fontWeight: "bold"
                }}
                spellCheck={false}
            />
        </BaseWindow>
    )
}

export default MemoWindow

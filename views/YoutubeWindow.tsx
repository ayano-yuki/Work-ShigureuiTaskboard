import React from "react"

import BaseWindow from "~/components/BaseWindow"
import "~/main.css"

type Props = {
    onClose: () => void
    zIndex: number
}

function YoutubeWindow({ onClose, zIndex }: Props) {
    return (
        <BaseWindow 
            title="Youtube"
            defaultPosition={{ x: 400, y: 100 }}
            defaultSize={{ width: 500, height: 300 }}
            onClose={onClose}
            zIndex={zIndex}
        >
            <iframe
                src="https://www.youtube.com/embed/uCuSX3Y004E"
                width="100%"
                height="100%"
                allowFullScreen
            />
        </BaseWindow>
    )
}

export default YoutubeWindow

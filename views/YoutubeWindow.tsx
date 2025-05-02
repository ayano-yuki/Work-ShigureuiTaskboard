import React from "react"

import BaseWindow from "~/components/BaseWindow"
import "~/main.css"

function YoutubeWindow() {
    return (
        <BaseWindow 
            title="Youtube"
            defaultPosition={{ x: 800, y: 100 }}
            defaultSize={{ width: 500, height: 300 }}
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

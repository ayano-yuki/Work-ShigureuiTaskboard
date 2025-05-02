import React from "react"

import BaseWindow from "~/components/BaseWindow"
import Background from "~/views/Background"
import YoutubeWindow from "~/views/YoutubeWindow"
import MemoWindow from "~/views/MemoWindow"
import "./main.css"

function NewTab() {
    return (
        <div className="container">
            <Background/>

            <MemoWindow />
            <YoutubeWindow />
        </div>
    )
}

export default NewTab

import React from "react"
import bgImage from "data-base64:~assets/bg.png"
import batteryImage from "data-base64:~assets/battery.png"
import imeImage from "data-base64:~assets/ime.png"
import wifiImage from "data-base64:~assets/wifi.png"
import "./main.css"

function NewTab() {
    return (
        <div className="container">
            <div className="scrolling-wrapper">
                <div
                className="scrolling-bg"
                style={{ backgroundImage: `url(${bgImage})` }}
                />
            </div>

            <div className="menu-bar">
                <div className="left-menu">
                    <svg width="20" height="20" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44.0601 35.0083C44.0601 43.326 37.3169 50.0646 28.9991 50.0646C20.682 50.0646 13.9382 43.3266 13.9382 35.0083C13.9382 26.6911 28.9992 7.98944 28.9992 7.98944C28.9992 7.98944 44.0601 26.6911 44.0601 35.0083Z" fill="#8A7F78"></path></svg>
                    <div>File</div>
                    <div>Task</div>
                    <div>Browser</div>
                    <div>Help</div>
                </div>
            
                <div className="right-icons">
                    <img src={wifiImage} alt="WiFi" />
                    <img src={imeImage} alt="IME" />
                    <img src={batteryImage} alt="Battery" />
                    <p></p>
                </div>
            </div>

        </div>
    )
}

export default NewTab

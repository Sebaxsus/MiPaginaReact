import { useState } from "react"

import "./NotificationPopUp.css"

import { BubbleLoader, CompleteLoader } from "../Loader/Loader"

export function PopUp(props) {
    const [open, setOpen] = useState(props.open)

    if (!open) return null

    function close() {
        const closeTimeoutId = setTimeout(
            () => {setOpen(false)},
            700
        )
    }

    const timeoutid = setTimeout(
        () => {document.getElementById("popUpContainer").style.setProperty("--animation-type", "fadeOut");close()},
        4000
    )
    
    switch (props.type) {
        case 0:
            document.documentElement.style.setProperty("--popUp-bg-color", "#580000")
            document.documentElement.style.setProperty("--popUp-border-color", "#580000")
            break
        case 1:
            document.documentElement.style.setProperty("--popUp-bg-color", "#014502")
            document.documentElement.style.setProperty("--popUp-border-color", "#77ff008c")
            break
        case 2:
            console.log("Case 2")
            document.documentElement.style.setProperty("--popUp-bg-color", "#584300")
            document.documentElement.style.setProperty("--popUp-border-color", "#ffed00")
            break
        default:
            break
    } 

    return (
        <section className="popUpContainer" id="popUpContainer">
            <header>
                <h3>
                    {props.title}
                </h3>
                <svg
                    height={25}
                    width={25}
                    viewBox="0 0 12 12"
                    onClick={() => {document.getElementById("popUpContainer").style.setProperty("--animation-type", "fadeOut");clearTimeout(timeoutid);close()} }
                >
                    <g
                        fill="none"
                    >
                        <line x1={0} y1={0} x2={10} y2={10} stroke="white" strokeWidth={2} />
                        <line x1={10} y1={0} x2={0} y2={10} stroke="white" strokeWidth={2} />
                    </g>
                </svg>
            </header>
            <p>
                {props.message}
            </p>
            <CompleteLoader size={30}/>
        </section>
    )
}
{/* 
    Svg para hacer una caja de texto
<svg
  height="90"
  width="90"
  viewbox="0 0 20 20"
>
  <path
    fill="purple"
    stroke="black"
    stroke-width="1"
    d="M 0 0 L 20 0 L 20 10 L 18 10 L 16 12 L 14 10 L 0 10 Z"
  >
    
  </path>
</svg> */}
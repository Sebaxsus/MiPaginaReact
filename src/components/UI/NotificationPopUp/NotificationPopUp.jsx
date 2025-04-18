import "./NotificationPopUp.css"

import { BubbleLoader, CompleteLoader } from "../Loader/Loader"

function ErrorIcon() {
    return (
        <svg height="30" width="30" viewBox="-5 -5 20 20">
            <circle cx="5" cy="5" r="8" stroke="red" fill="none" strokeWidth="1" />
            <g stroke="white" strokeWidth="1">
                <path
                    d="M 1 1 L 9 9 M 9 1 L 1 9"
                    r="10"
                />
                {/*<line x1="0" y1="0" x2="10" y2="10" rx="1" ry="1" /> */}
            </g>
        </svg>
    )
}

export function PopUp(props) {

    if (!props.open) return null

    function close() {
        const closeTimeoutId = setTimeout(
            () => {props.set(false)},
            700
        )
    }

    let Icono = <ErrorIcon />

    // const timeoutid = setTimeout(
    //     () => {document.getElementById("popUpContainer").style.setProperty("--animation-type", "fadeOut");close()},
    //     4000
    // )

    switch (props.type) {
        case 0:
            document.documentElement.style.setProperty("--popUp-bg-color", "#580000")
            document.documentElement.style.setProperty("--popUp-border-color", "#580000")
            Icono = <ErrorIcon />
            break
        case 1:
            document.documentElement.style.setProperty("--popUp-bg-color", "#014502")
            document.documentElement.style.setProperty("--popUp-border-color", "#77ff008c")
            Icono = <CompleteLoader size={30}/>
            break
        case 2:
            console.log("Case 2")
            document.documentElement.style.setProperty("--popUp-bg-color", "#584300")
            document.documentElement.style.setProperty("--popUp-border-color", "#ffed00")
            break
        default:
            document.documentElement.style.setProperty("--popUp-bg-color", "#580000")
            document.documentElement.style.setProperty("--popUp-border-color", "#580000")
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
                    onClick={() => {document.getElementById("popUpContainer").style.setProperty("--animation-type", "fadeOut");close()} }
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
            {Icono}
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
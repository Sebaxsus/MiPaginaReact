import "./NotificationPopUp.css"

export function PopUp(props) {

    return (
        <section className="popUpContainer">
            <header>
                <h3>
                    {props.title}
                </h3>
                <svg
                    height={25}
                    width={25}
                    viewBox="0 0 12 12"
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
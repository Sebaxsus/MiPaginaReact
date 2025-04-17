
export function ArrowSVG({width = 50, height = 50, left = false}) {
    return (

        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width={width} height={height}
            viewBox="0 0 32 32"
            style={left ? {transform: "rotatey(180deg)"} : {}}
        >
            <path
                stroke="currentColor"
                strokeWidth="4"
                d="M 20 0 L 30 15 L 20 30 L 20 28 L 28 16 L 2 16 L 2 14 L 28 14 L 20 2 Z"
            />
        </svg>
    )
}

export default ArrowSVG
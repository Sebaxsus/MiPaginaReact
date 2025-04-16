import "./Loader.css"

export function Loader() {

    return (
        <div className="loaderContainer">
            <svg className="loaderSvg" viewBox="0 0 24 24">
                <circle
                    cx={12} cy={12} r={10}
                    stroke="currentColor"
                    strokeWidth={4}
                    fill="none"
                />
                <path
                    fill="currentColor"
                    d="M4 12 A8 8 0 0818-8 V0 C5.373 0 0 5.373 0 12 H 4 Z"
                />
            </svg>
        </div>
    )
}
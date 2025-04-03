
export default function Modal({isOpen, onClose, children }) {
    if (!isOpen) return null

    return (
        <>
            <article className="absolute bg-gray-900 p-5 rounded-2xl [box-shadow:7px_2px_18px_6px_rgba(3,50,51)] flex aspect-[2/1] flex-col items-center w-1/2 left-[24%] mt-2">
                <button onClick={onClose} className="absolute self-end pr-2 border-0 bg-transparent text-[20px] cursor-pointer" >✖</button>
                {children}
            </article>
        </>
    )
}

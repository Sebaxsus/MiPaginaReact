import "./modal.css"

export default function Modal({isOpen, onClose, children }) {
    if (!isOpen) return null

    return (
        <>
            <article className="modal">
                <button onClick={onClose} className="modal-CloseBtn" >✖</button>
                {children}
            </article>
        </>
    )
}

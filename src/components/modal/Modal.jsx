import "./modal.css"

export default function Modal({isOpen, onClose, children }) {
    if (!isOpen) return null

    // Se encarga de cambiar el alto del modal
    // dependiendo de la resolusion de la ventana al ejecutar el modal.
    window.innerHeight >= 900 
            ? 
            document.documentElement.style.setProperty("--modalHeigth", "750px")
            :
            document.documentElement.style.setProperty("--modalHeigth", "540px")

    return (
        <>
            <article className="modal">
                <button onClick={onClose} className="modal-CloseBtn" >✖</button>
                {children}
            </article>
        </>
    )
}

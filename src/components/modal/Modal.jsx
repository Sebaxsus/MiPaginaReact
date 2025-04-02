
export default function Modal({isOpen, onClose, children }) {
    if (!isOpen) return null

    return (
        <>
            <section className="absolute top-12 right-[21%] backdrop-blur-2xl bg-[rgba(0,0,0,0.02)] flex items-center justify-center z-[2] w-1/2">
                <main className="bg-gray-900 p-5 rounded-2xl [box-shadow:7px_2px_18px_6px_rgba(3,50,51)] flex aspect-[2/1] my-10 flex-col items-center w-3/4">
                    <button onClick={onClose} className="absolute top-[10%] right-[20%] border-0 bg-transparent text-[20px] cursor-pointer" >✖</button>
                    {children}
                </main>
            </section>
        </>
    )
}

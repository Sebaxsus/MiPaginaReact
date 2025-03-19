import { useState } from "react"
import Modal from "../../components/modal/Modal"
import { postManga } from "../../services/api"


export default function Post() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formTitle, setFormTitle] = useState('')
    const [formDescripcion, setFormDesc] = useState('')
    const [formUrl, setFormUrl] = useState('')

    const validateFormText = (event, place = '') => {
        const element = document.getElementById(event.target.id)
        if (element.value.length === 0) {
            element.placeholder = 'Debe Llenar este Campo!'
            element.className = "focus-visible:outline-0 text-red-300 font-bold scale-105 border rounded-md p-2 border-red-400 ml-6"
        } else {
            element.placeholder = place
            element.className = "focus-visible:outline-0 h-full border border-gray-300/90 rounded-xl indent-2 py-2 ml-6"
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const newManga = {
            title: formTitle,
            desc: formDescripcion,
            img: formUrl,
            genre: ["Drama"]
        }
            // console.log(newManga)
        try{
            const res = await postManga(JSON.stringify(newManga))

            if (res.status === 201) {
                console.warn("Se agrego el Manga Correctamente")
            } else {
                console.error("Error al crear el Manga, Code: ", res.status, " Body: ", res.data, res.headers)
            }
        } catch (err) {
            console.error("Error al crear el Manga: ", err)
        }

    }

    return (
        <>
            <article className=" grid [grid-template-columns:repeat(auto-fit,minmax(400px,1fr))] gap-2 mx-[10px] my-[15px] justify-items-center max-sm:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
                <a id="Boton Agregar" onClick={() => {setIsModalOpen(true)}} className="fixed top-28 left-5 border rounded-full hover:bg-gray-400/50 px-2 py-2 backdrop-blur-lg">
                    ➕
                </a>
                <Modal isOpen={isModalOpen} onClose={() =>  setIsModalOpen(false)}>
                    <h2 className="font-bold underline underline-offset-2 decoration-[#2f3acc]">Añadir un Manga!</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 justify-center w-[inherit]">
                        <label className="flex flex-col gap-y-4">
                            <h2>Titulo</h2>
                            <input 
                                type="text"
                                placeholder="Titulo"
                                required
                                id="modalTitle"
                                value={formTitle}
                                onChange={(e) => {setFormTitle(e.target.value)}}
                                onKeyDown={(e) => {validateFormText(e, "Titulo")}}
                                className="focus-visible:outline-0 border-b ml-6 indent-2 py-2"
                             />
                        </label>
                        <label className="flex flex-col gap-y-4">
                            <h2>Descripcion: </h2>
                            <textarea 
                                placeholder="Descripcion del Manga"
                                required
                                id="modalBody"
                                value={formDescripcion}
                                onChange={(e) => {setFormDesc(e.target.value)}}
                                onKeyDown={(e) => {validateFormText(e, "Descripcion del Manga")}}
                                className="focus-visible:outline-0 border border-gray-300/90 rounded-2xl indent-2 py-2 ml-6"
                            />
                        </label>
                        <label className="flex flex-col gap-y-4">
                            <h2>URL de la Imagen:</h2>
                            <input 
                                type="url"
                                placeholder="https://ejemplo.mdn"
                                id="modalUrl"
                                value={formUrl}
                                onChange={(e) => {setFormUrl(e.target.value)}}
                                onKeyDown={(e) => {validateFormText(e, "https://ejemplo.mdn")}}
                                className="focus-visible:outline-0 border border-gray-300/90 rounded-xl indent-2 py-2 ml-6"
                                />
                        </label>
                        <button 
                            type="submit"
                            className="border rounded-md border-cyan-600"
                            >
                                Crear Post
                        </button>
                    </form>
                </Modal>
            </article>
        </>
    )
}
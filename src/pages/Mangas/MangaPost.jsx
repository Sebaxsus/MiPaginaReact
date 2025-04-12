import { useState } from "react"
import Modal from "../../components/modal/Modal"
// import { postManga } from "../../services/api"
import { mangasController } from "../../services/newApi"

function campoForm({ genero }) {
    return (
        <div className="flex gap-2">
            <input type="checkbox" name="generos" id={genero.id} value={genero.id}/>
            <label>{genero.name}</label>
        </div>
    )
}

export default function MangaPost(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formTitle, setFormTitle] = useState('')
    const [formDescripcion, setFormDesc] = useState('')
    const [formUrl, setFormUrl] = useState('')
    const [formGenres, setGenres] = useState([])

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

        const genreElements = Array.from(document.getElementsByName("generos").values())

        genreElements.map( (input) => {
            if (input.checked === true) {
                setGenres(formGenres.push(Number.parseInt(input.value)))
            }
        })


        const newManga = {
            title: formTitle,
            description: formDescripcion,
            img: formUrl,
            genre: formGenres,
        }
            // console.log(newManga)
        try{
            // No estoy esperando la promesa 🤨
            const res = await mangasController.post(JSON.stringify(newManga))

            if (res.status === 201 || res.data.code === 201) {
                console.warn("Se agrego el Manga Correctamente")
                alert(res.data.message)
                // Limpiando los campos del Formulario
                setFormTitle("");setFormDesc("");setFormUrl("");setGenres([])
                // Devolviendo el Formulario a su estado por defecto
                // Esto lo uso para reiniciar las checkbox
                e.target.reset()
                // Cambiando el Estado del change en App.jsx
                // Para usar el Effecto que se encarga de pedir los datos a la api
                // Ya que change es parte de las dependencias de este efecto
                props.reload()
            } else {
                console.error("Error al crear el Manga, Code: ", res.status, " Body: ", res.data, res.headers)
                alert("Error al agregar!: ", res.data.message, "\nCode: ", res.data.code)
                setGenres([])
            }
        } catch (err) {
            console.error("Error al crear el Manga: ", err)
            setGenres([])
        }

    }

    return (
        <>
            <article className="sticky top-20 z-[1] mx-[10px] justify-items-center">
                <button id="Boton Agregar" onClick={() => {setIsModalOpen(true)}} className="absolute top-28 left-5 border rounded-full hover:bg-gray-400/50 px-2 py-2 backdrop-blur-lg backdrop-brightness-50 cursor-pointer">
                    ➕
                </button>
                <Modal isOpen={isModalOpen} onClose={() =>  setIsModalOpen(false)}>
                    <h2 className="font-bold underline underline-offset-2 decoration-[#2f3acc] text-xl pb-2">Añadir un Manga!</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 justify-center w-4/5">
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
                        <label className="flex flex-col gap-y-4">
                            <fieldset className="grid grid-cols-3 gap-2">
                                <legend>Escoja el genero:</legend>
                                {/* Para generar los generos usar la respuesta de la api seria optimo en mi opinion ya que me asegurario de usar valores que pueda almacenar */}
                                
                                {
                                    props.generos.map(genero => {
                                        return campoForm({genero: genero})
                                    })
                                }
                            </fieldset>
                        </label>
                        <button 
                            type="submit"
                            className="border rounded-md border-cyan-600 self-center p-1"
                            >
                                Crear Post
                        </button>
                    </form>
                </Modal>
            </article>
        </>
    )
}
// Funcionalidades

import { useState, useRef } from "react"
// import { postManga } from "../../services/api"
import { mangasController } from "../../services/newApi"

// Componentes

import Modal from "../../components/modal/Modal"

// UI

import { useMainContext } from "../../Context"



function campoForm({ genero }) {
    return (
        <label>
            <input type="checkbox" name="generos" id={genero.id} value={genero.id}/>
            {genero.name}
        </label>
    )
}

export default function MangaPost(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formTitle, setFormTitle] = useState('')
    const [formDescripcion, setFormDesc] = useState('')
    const [formUrl, setFormUrl] = useState('')
    const [formGenres, setGenres] = useState([])
    const [formChapters, setChapters] = useState(1)

    const popUpText = useRef({title: "Completado", message: "Se cargo correctamente", type: 1})

    const {setIsPopUp, isLogged} = useMainContext()

    const validateFormText = (event, place = '') => {
        const element = document.getElementById(event.target.id)
        if (element.value.length === 0 || element.validity.patternMismatch || element.validity.typeMismatch) {
            element.placeholder = 'Debe Llenar este Campo!'
            popUpText.current.title = "Falto un Campo!"
            popUpText.current.message = "Debe Llenar este Campo!"
            popUpText.current.type = 2
            event.target.setCustomValidity('Debe Llenar este Campo!')
            element.className = "focus-visible:outline-0 text-red-300 font-bold scale-105 border rounded-md p-2 border-red-400 ml-6"
        } else {
            element.placeholder = place
            event.target.validity.patternMismatch ? event.target.setCustomValidity("Debe ser una URL absoluta, relativa o encryptada") : event.target.setCustomValidity("")
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
            chapter: parseInt(formChapters),
        }
            // console.log(newManga)
        try{
            // No estoy esperando la promesa 🤨
            const res = await mangasController.post({body: JSON.stringify(newManga), token: isLogged.token})

            if (res.status === 201 || res.data.code === 201) {
                console.warn("Se agrego el Manga Correctamente")
                popUpText.current = {title: "Completado", message: res.data.message, type: 1}
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
                popUpText.current = {title: res.data.title, message: res.data.message + " " + res.data.code, type: 0}
                setGenres([])
            }
        } catch (err) {
            console.error("Error al crear el Manga: ", err)
            popUpText.current = {title: "Fallo del Cliente", message: "Ocurrio un error inesperado en el cliente", type: 2}
            setGenres([])
        } finally {
            setIsPopUp({open: true, ...popUpText.current})
        }

    }

    return (
        <>
            <article className="modal-Container">
                <button id="Boton Agregar" onClick={() => {setIsModalOpen(true)}} className="modalPost-Btn">
                    ➕
                </button>
                <Modal isOpen={isModalOpen} onClose={() =>  setIsModalOpen(false)}>
                    <h2 className="decoration-[#2f3acc]">Añadir un Manga!</h2>
                    <form onSubmit={handleSubmit} className="modal-Form">
                        <label>
                            <h2>Titulo</h2>
                            <input 
                                type="text"
                                placeholder="Titulo"
                                required
                                id="modalTitle"
                                value={formTitle}
                                onChange={(e) => {validateFormText(e, "Titulo");setFormTitle(e.target.value)}}                            
                             />
                        </label>
                        <label>
                            <h2>Descripcion: </h2>
                            <textarea 
                                placeholder="Descripcion del Manga"
                                required
                                id="modalBody"
                                value={formDescripcion}
                                onChange={(e) => {validateFormText(e, "Descripcion del Manga");setFormDesc(e.target.value)}}                             
                            />
                        </label>
                        <label>
                            <h2>URL de la Imagen:</h2>
                            <input 
                                type="text"
                                placeholder="https://ejemplo.mdn"
                                id="modalUrl"
                                pattern="^((https?:\/\/)|www\.)[a-zA-Z0-9\/\-_]{3,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?([\w\/\-_?=:;,\&]+)?(\.(webp|png|jpeg|jpg|gif))?$|^(\/[\w\-.\/]{3,192})$|^(data:image\/(webp|png|jpeg|jpg|gif);base64,[a-zA-Z0-9+\/=]+)$"
                                value={formUrl}
                                onChange={(e) => {validateFormText(e, "https://ejemplo.mdn");setFormUrl(e.target.value)}}
                                />
                        </label>
                        <label>
                            <h2>Capitulos:</h2>
                            <input 
                                type="number"
                                placeholder="12"
                                title="Ingresa el numero de Capitulos Disponibles!"
                                min={1}
                                max={Infinity}
                                value={formChapters}
                                onChange={(e) => {setChapters(e.target.value)}}
                                id="modalChapters"
                            />
                        </label>
                        <label>
                            <fieldset>
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
                            className="modal-Form-Btn"
                            >
                                Crear Post
                        </button>
                    </form>
                </Modal>
            </article>
        </>
    )
}
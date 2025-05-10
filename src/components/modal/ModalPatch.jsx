import { useState, useRef } from "react"
import { useParams } from "wouter"

import { mangasController } from "../../services/newApi"
import { animesController } from "../../services/newApi"
import { useMainContext } from "../../Context"

import "./modal.css"

function campoForm({ genero, data = [] }) {
    // console.log(genero.name, data, data.find((g) => {return g.id === genero.id}) ? true : false)
    return (
        <label>
            <input type="checkbox" name="generos" id={genero.id} value={genero.id} defaultChecked={data.find((g) => {return g.id === genero.id}) ? true : false}/>
            {genero.name}
        </label>
    )
}


export default function Modal(props) {
    const [formTitle, setFormTitle] = useState(props.data.title)
    const [formDescripcion, setFormDesc] = useState(props.data.description)
    const [formUrl, setFormUrl] = useState(props.data.img)
    const [formGenres, setGenres] = useState(props.data.genre)
    const [formChapters, setChapters] = useState(props.data.chapter)

    const popUpText = useRef({title: "Completado", message: "Se cargo correctamente", type: 1})

    const {setIsPopUp, isLogged} = useMainContext()
    const routeParams = useParams()

    if (!props.isOpen) return null

    const titulo = routeParams.type
    const controller = routeParams.type === "Mangas" ? mangasController : animesController

    // Se encarga de cambiar el alto del modal
    // dependiendo de la resolusion de la ventana al ejecutar el modal.
    window.innerHeight >= 900 
            ? 
            document.documentElement.style.setProperty("--modalHeigth", "750px")
            :
            document.documentElement.style.setProperty("--modalHeigth", "540px")

    const validateFormText = (event, place = '') => {
        const element = document.getElementById(event.target.id)
        if (element.value.length === 0 || element.validity.patternMismatch || element.validity.typeMismatch) {
            //console.log("Error del validador\nLength: ", element.value.length, "\nPatternMatch: ", element.validity.patternMismatch, "\ntypeMismatch: ",element.validity.typeMismatch)
            element.placeholder = 'Debe Llenar este Campo!'
            // El metodo setCustomValidity me permite personalizar 
            // El mensaje de error cuando el campo esta vacio o no cumple las validaciones
            popUpText.current.title = "Falto un Campo!"
            popUpText.current.message = "Debe Llenar este Campo!"
            popUpText.current.type = 2
            event.target.setCustomValidity('Debe Llenar este Campo!')
            // El title actua como un tooltip al momento de poner el mouse encima del input
            // element.title = "Debe Llenar este Campo!"
            element.className = "focus-visible:outline-0 text-red-300 font-bold scale-105 border rounded-md p-2 border-red-400 ml-6"
        } else {
            element.placeholder = place
            event.target.validity.patternMismatch ? event.target.setCustomValidity("Debe ser una URL absoluta, relativa o encryptada") : event.target.setCustomValidity("")
            element.className = "focus-visible:outline-0 h-full border border-gray-300/90 rounded-xl indent-2 py-2 ml-6"
        }
    }

    const handleSubmit = async (e) => {
            e.preventDefault()
            const genreData = []
            // setGenres([]) 😡😡 Por que no se limpia, solo lo hace cuando oprimo el boton editar por segunda vez
            const genreElements = Array.from(document.getElementsByName("generos").values())

            
            genreElements.map( (input) => {
                if (input.checked === true) {
                    // setGenres(formGenres.push(Number.parseInt(input.value)))
                    genreData.push(Number.parseInt(input.value))
                }
            })

            const data = {
                title: formTitle,
                description: formDescripcion,
                img: formUrl,
                genre: genreData,
                chapter: parseInt(formChapters),
            }  
            // Limpiando los campos, Incluyendo los checkbox
            console.log("Objeto Post: ",data)
            // createPortal(<PopUp title="Completado" message={"res.data.message"} ></PopUp>, document.getElementById("modalDiv"))
            e.target.reset();setFormTitle("");setFormDesc("")
            setFormUrl("");setGenres([]);

            try{
                const res = await controller.update({id: routeParams.id, body: JSON.stringify(data), token: isLogged.token})
                if (res.data.code === 200 || res.status === 200) {
                    console.warn(`Se modifico el ${titulo} Correctamente`)
                    popUpText.current = {title: "Completado", message: res.data.message, type: 1}
                    // Limpiando los campos del Formulario
                    setFormTitle("");setFormDesc("");setFormUrl("");setGenres([]);
                    // Devolviendo el Formulario a su estado por defecto
                    // Esto lo uso para reiniciar las checkbox
                    e.target.reset()
                    // Cambiando el Estado del change en App.jsx
                    // Para usar el Effecto que se encarga de pedir los datos a la api
                    // Ya que change es parte de las dependencias de este efecto
                    props.reload()
                } else {
                    console.error(`Error al modificar el ${titulo}, Code: `, res.status, " Body: ", res.data, res.headers)
                    popUpText.current = {title: res.data.title, message: res.data.message + " " + res.status, type: 0}
                    setGenres([])
                }
            } catch (err) {
                console.error(`Error al modificar el ${titulo}: `, err)
                popUpText.current = {title: "Fallo del Cliente", message: "Ocurrio un error inesperado en el cliente", type: 2}
                setGenres([])
            } finally {
                setIsPopUp({open: true, ...popUpText.current})
                // console.log(isPopUp)
            }
    
        }

        
    return (
        <>
            <article className="modal-Container ">
                <article className="modal ">
                    <button onClick={props.onClose} className="modal-CloseBtn absolute self-end pr-2 border-0 bg-transparent text-[20px] cursor-pointer" >✖</button>
                    <h2>Modificar un {titulo}!</h2>
                    <form onSubmit={handleSubmit} className="modal-Form ">
                        <label>
                            <h2>Titulo</h2>
                            <input
                                type="text"
                                placeholder="Titulo"
                                title="Ingrese un titulo!"
                                required
                                value={formTitle}
                                onChange={(e) => {validateFormText(e, "Titulo");setFormTitle(e.target.value)}}
                                // onKeyDown={(e) => {}}
                                id="modalTitle"
                            
                            />
                        </label>
                        <label>
                            <h2>Descripcion: </h2>
                            <textarea
                                placeholder={`Decripcion del ${titulo}`}
                                title="Ingrese una descripcion!"
                                required
                                value={formDescripcion}
                                onChange={(e) => {validateFormText(e, `Decripcion del ${titulo}`);setFormDesc(e.target.value)}}
                                // onKeyDown={(e) => {}}
                                id="modalBody"
                            
                            />
                        </label>
                        <label>
                            <h2>URL de la Imagen:</h2>
                            <input
                                type="text"
                                placeholder="https://ejemplo.mdn"
                                title="Ingresa una URL!"
                                value={formUrl}
                                onChange={(e) => {validateFormText(e, "https://ejemplo.mdn");setFormUrl(e.target.value)}}
                                // onKeyDown={(e) => {}}
                                // Doc de patter en UTILS urlValidator.js                           
                                pattern="^((https?:\/\/)|www\.)[a-zA-Z0-9\/\-_]{3,192}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?([\w\/\&\-_?=:;,&]+)?(\.(webp|png|jpeg|jpg|gif))?$|^(\/[\w\-.\/]{3,192})$|^(data:image\/(webp|png|jpeg|jpg|gif);base64,[a-zA-Z0-9+\/=]+)$"
                                id="modalUrl"
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
                            <fieldset className="grid grid-cols-3 gap-2">
                                <legend>Escoja el genero:</legend>
                                {/* Para generar los generos usar la respuesta de la api seria optimo en mi opinion ya que me asegurario de usar valores que pueda almacenar */}

                                {
                                    props.generos.map(genero => {
                                        return campoForm({ genero: genero, data: formGenres })
                                    })
                                }
                            </fieldset>
                        </label>
                        <button
                            type="submit"
                            className="modal-Form-Btn"
                        >
                            Editar
                        </button>
                    </form>
                </article>
            </article>
        </>
    )
}

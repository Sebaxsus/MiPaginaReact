import { useState } from "react"
import { createPortal } from "react-dom"
import { useParams } from "wouter"

import { mangasController } from "../../services/newApi"
import { animesController } from "../../services/newApi"
import { validateURL } from "../../utils/urlValidator"

import { PopUp } from "../UI/NotificationPopUp/NotificationPopUp"

function campoForm({ genero, data = [] }) {
    // console.log(genero.name, data, data.find((g) => {return g.id === genero.id}) ? true : false)
    return (
        <div className="flex gap-2">
            <input type="checkbox" name="generos" id={genero.id} value={genero.id} defaultChecked={data.find((g) => {return g.id === genero.id}) ? true : false}/>
            <label>{genero.name}</label>
        </div>
    )
}


export default function Modal(props) {
    const [formTitle, setFormTitle] = useState(props.data.title)
    const [formDescripcion, setFormDesc] = useState(props.data.description)
    const [formUrl, setFormUrl] = useState(props.data.img)
    const [formGenres, setGenres] = useState(props.data.genre)
    const routeParams = useParams()

    if (!props.isOpen) return null

    const titulo = routeParams.type
    const controller = routeParams.type === "Manga" ? mangasController : animesController

    const validateFormText = (event, place = '') => {
        const element = document.getElementById(event.target.id)
        if (element.value.length === 0) {
            element.placeholder = 'Debe Llenar este Campo!'
            event.target.setCustomValidity('Debe Llenar este Campo!')
            element.className = "focus-visible:outline-0 text-red-300 font-bold scale-105 border rounded-md p-2 border-red-400 ml-6"
        } else {
            element.placeholder = place
            event.target.setCustomValidity('')
            element.className = "focus-visible:outline-0 h-full border border-gray-300/90 rounded-xl indent-2 py-2 ml-6"
        }
    }

    const validateFormURL = (e) => {
        const element = document.getElementById(e.target.id)
        if (validateURL(element.value)) {
            setFormUrl(element.value)
        } else {
            element.setCustomValidity("Debe ser una url valida")
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
            }  
            // Limpiando los campos, Incluyendo los checkbox
            console.log("Objeto Post: ",data)
            // e.target.reset();setFormTitle("");setFormDesc("")
            // setFormUrl("");setGenres([]);

            // try{
            //     const res = await controller.update({id: routeParams.id,body: JSON.stringify(data)})
            //     // console.log(res)
            //     if (res.data.code === 200 || res.status === 200) {
            //         console.warn(`Se modifico el ${titulo} Correctamente`)
            //         createPortal(<PopUp title="Completado" message={res.data.message} open={true} type={1}/>, document.getElementById("modalDiv"))
            //         // Limpiando los campos del Formulario
            //         setFormTitle("");setFormDesc("");setFormUrl("");setGenres([]);
            //         // Devolviendo el Formulario a su estado por defecto
            //         // Esto lo uso para reiniciar las checkbox
            //         e.target.reset()
            //         // Cambiando el Estado del change en App.jsx
            //         // Para usar el Effecto que se encarga de pedir los datos a la api
            //         // Ya que change es parte de las dependencias de este efecto
            //         props.reload()
            //     } else {
            //         console.error(`Error al modificar el ${titulo}, Code: `, res.status, " Body: ", res.data, res.headers)
            //         createPortal(<PopUp title={res.data.title} message={res.data.message + " " + res.data.code} open={true} type={0}/>, document.getElementById("modalDiv"))
            //         setGenres([])
            //     }
            // } catch (err) {
            //     console.error(`Error al modificar el ${titulo}: `, err)
            //     createPortal(<PopUp title="Fallo del Cliente" message={"Ocurrio un erro inesperado en el cliente"} open={true} type={2}/>, document.getElementById("modalDiv"))
            //     setGenres([])
            // }
    
        }

    return (
        <>
            <article className="sticky top-20 z-[1] mx-[10px] justify-items-center">
                <article className="absolute bg-gray-900 p-5 rounded-2xl [box-shadow:7px_2px_18px_6px_rgba(3,50,51)] flex aspect-[2/1] flex-col items-center w-1/2 left-[24%] mt-2">
                    <button onClick={props.onClose} className="absolute self-end pr-2 border-0 bg-transparent text-[20px] cursor-pointer" >✖</button>
                    <h2 className="font-bold underline underline-offset-2 decoration-[#2fadcc] text-xl pb-2">Modificar un {titulo}!</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 justify-center w-4/5">
                        <label className="flex flex-col gap-y-4">
                            <h2>Titulo</h2>
                            <input
                                type="text"
                                placeholder="Titulo"
                                required
                                value={formTitle}
                                onChange={(e) => {validateFormText(e, "Titulo");setFormTitle(e.target.value)}}
                                // onKeyDown={(e) => {}}
                                id="modalTitle"
                                className="focus-visible:outline-0 border-b ml-6 indent-2 py-2"
                            />
                        </label>
                        <label className="flex flex-col gap-y-4">
                            <h2>Descripcion: </h2>
                            <textarea
                                placeholder={`Decripcion del ${titulo}`}
                                required
                                value={formDescripcion}
                                onChange={(e) => {validateFormText(e, `Decripcion del ${titulo}`);setFormDesc(e.target.value)}}
                                // onKeyDown={(e) => {}}
                                id="modalBody"
                                className="focus-visible:outline-0 border border-gray-300/90 rounded-2xl indent-2 py-2 ml-6"
                            />
                        </label>
                        <label className="flex flex-col gap-y-4">
                            <h2>URL de la Imagen:</h2>
                            <input
                                type="text"
                                placeholder="https://ejemplo.mdn"
                                value={formUrl}
                                onChange={(e) => {validateFormText(e, "https://ejemplo.mdn");setFormUrl(e.target.value)}}
                                // onKeyDown={(e) => {}}
                                // pattern={/^((https?:\/\/)|www\.)[a-zA-Z0-9-]{3,192}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?$|^(\/[\w\-./]{3,192})$|^(data:image\/(webp|png|jpeg|jpg|gif);base64,[a-zA-Z0-9+/=]+)$/gi}
                                // pattern="((https?:\/\/)|www\.)[a-zA-Z0-9-]{3,192}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?|(\/[\w\-./]{3,192})|(data:image\/(webp|png|jpeg|jpg|gif);base64,[a-zA-Z0-9+/=]+)"
                                id="modalUrl"
                                className="focus-visible:outline-0 border border-gray-300/90 rounded-xl indent-2 py-2 ml-6"
                            />
                        </label>
                        <label className="flex flex-col gap-y-4">
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
                            className="border rounded-md border-cyan-600 self-center p-1"
                        >
                            Editar
                        </button>
                    </form>
                </article>
            </article>
        </>
    )
}

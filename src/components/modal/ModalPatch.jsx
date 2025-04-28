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

    const {isPopUp, setIsPopUp} = useMainContext()
    const routeParams = useParams()

    if (!props.isOpen) return null

    const titulo = routeParams.type
    const controller = routeParams.type === "Mangas" ? mangasController : animesController

    /*
    Creando un eventListener para verificar los cambios de
    Ancho y alto (resolusion) de la ventana del navegador
    
    Paro esto uso el evento del resize de la API nativa del
    navegador Window, Este evento se activa en el momento que la
    resolusion de la ventana cambia

    Para evitar problemas de rendimiento con el evento se utilizan
    dos tecnicas Throttling (Embotellamiento) y
    Debouncing (No se que es jaja).

    Throttling se encarga de "Embotellar" bloquear la ejecucion
    cada determinado tiempo


    Debouncing se encarga de esperar a que la ventana deje de cambiar de
    tamaño (Activar el evento) para despues ejecutar el codigo.

    ----------------- De aqui para abajo es un copy paste de la documentacion de MDN generado con Copilot ------------------
    // https://developer.mozilla.org/es/docs/Web/API/Window/resize_event
    // https://bencentra.com/code/2015/02/27/optimizing-window-resize.html
    // https://css-tricks.com/debouncing-throttling-explained-examples/
    // https://remysharp.com/2010/07/21/throttling-function-calls
    //  https://es.linkedin.com/posts/midudev_crea-una-funci%C3%B3n-debounce-en-react-en-s%C3%B3lo-activity-7048968258250526720-AEqR#:~:text=El%20%22debouncing%22%20es%20una%20t%C3%A9cnica%20que%20se,la%20actualizaci%C3%B3n%20del%20estado%20en%20un%20componente.&text=En%20lugar%20de%20eso%2C%20con%20el%20debounce%2C,por%20si%20el%20usuario%20vuelve%20a%20escribir.

    El Debouncing y el Throttling son tecnicas de optimizacion
    de eventos que se utilizan para limitar la cantidad de veces que
    se ejecuta una funcion en respuesta a un evento.

    Ambas tecnicas son utiles para mejorar el rendimiento de las
    aplicaciones web, especialmente cuando se trata de eventos
    que se activan con frecuencia, como el scroll o el resize de la
    ventana.

    La diferencia entre ambas tecnicas es la siguiente:

    Debouncing es reiniciar el timeout cada vez que se activa el evento
    y si no se activa el evento en el tiempo determinado se ejecuta el
    codigo. En este caso el timeout es de 100ms, por lo que si el evento
    se activa cada 100ms, el timeout se reinicia y no se ejecuta el
    codigo. Si el evento no se activa en 100ms, se ejecuta el codigo.

    Throttling es ejecutar el evento cada determinado tiempo

    Throttiling es mas util para eventos que se activan constantemente
    como el scroll, resize, etc. En este caso no es necesario
    ya que el evento resize no se activa constantemente, sino cada vez que
    sino cada vez que se cambia el tamaño de la ventana.
    En este caso no es necesario, pero lo dejo para aprender como se hace
    un debounce
    y un throttle.
    */
    function debounce(fn, delay) {
        // Variable declarada con let
        // Para asegurar su uso exclusivo dentro del alcance
        // de la funcion (funtion scope)
        let timer = null

        // devuelvo una funcion para que se ejecute 
        // dentro del event listener
        return function () {
            let context = this
            let args = arguments
            // Limpio el timeout si existe para
            // Reiniciarlo (Crear uno nuevo con el mismo delay)
            clearTimeout(timer)

            // Creo el timeout (Throttle Function)
            // Que le aplica a la funcion creada en el event listener
            // el contexto y los argumentos de la funcion
            // que se ejecuta dentro del event listener
            // Esto es para que la funcion no se ejecute cada vez que
            // se activa el evento resize
            // sino cada vez que se deja de activar el evento

            // El contexto es el objeto que se esta ejecutando
            // y los argumentos son los argumentos que se le pasan a la funcion

            timer = setTimeout(() => {
                // console.log("Cambio la resolusion de la ventana 1, Ancho: ", window.innerWidth, " Alto: ", window.innerHeight)
                fn.apply(context, args)
            }, delay)
        }
    }

    window.addEventListener("resize", debounce(() => {
        // console.log("Cambio la resolusion de la ventana, Ancho: ", window.innerWidth, " Alto: ", window.innerHeight)
        window.innerHeight >= 900 
            ? 
            document.documentElement.style.setProperty("--modalHeigth", "750px")
            :
            document.documentElement.style.setProperty("--modalHeigth", "540px")
    }, 100))

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
                const res = await controller.update({id: routeParams.id,body: JSON.stringify(data)})
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
                    popUpText.current = {title: res.data.title, message: res.data.message + " " + res.data.code, type: 0}
                    setGenres([])
                }
            } catch (err) {
                console.error(`Error al modificar el ${titulo}: `, err)
                popUpText.current = {title: "Fallo del Cliente", message: "Ocurrio un error inesperado en el cliente", type: 2}
                setGenres([])
            } finally {
                setIsPopUp({open: true, ...popUpText.current})
                console.log(isPopUp)
            }
    
        }

        
    return (
        <>
            <article className="modalPatch-Container ">
                <article className="modalPatch ">
                    <button onClick={props.onClose} className="modalPatch-CloseBtn absolute self-end pr-2 border-0 bg-transparent text-[20px] cursor-pointer" >✖</button>
                    <h2>Modificar un {titulo}!</h2>
                    <form onSubmit={handleSubmit} className="modalPatch-Form ">
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
                                pattern="^((https?:\/\/)|www\.)[a-zA-Z0-9\/\-_]{3,192}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?([\w\/\-_?=:;,]+)?(\.(webp|png|jpeg|jpg|gif))?$|^(\/[\w\-.\/]{3,192})$|^(data:image\/(webp|png|jpeg|jpg|gif);base64,[a-zA-Z0-9+\/=]+)$"
                                id="modalUrl"
                                className="border rounded-xl"
                            />
                        </label>
                        <label>
                            <h2>Capitulos</h2>
                            <input 
                                type="number"
                                placeholder="12"
                                title="Ingresa el numero de Capitulos Disponibles!"
                                min={1}
                                max={Infinity}
                                value={formChapters}
                                onChange={(e) => {setChapters(e.target.value)}}
                                id="modalChapters"
                                className="border rounded-xl"
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
                            className="modalPatch-Form-Btn border rounded-md border-cyan-600 self-center p-1"
                        >
                            Editar
                        </button>
                    </form>
                </article>
            </article>
        </>
    )
}

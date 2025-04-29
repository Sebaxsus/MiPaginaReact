import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useParams } from 'wouter'

import './View.css'

import Modal from '../../components/modal/ModalPatch.jsx'


import { useGetById } from '../../hooks/useGetById.jsx'
import { useMainContext } from '../../Context.jsx'

export function View(props) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const routeParams = useParams()

    const {data, generos, loading, reloadData } = useGetById(routeParams)


    

    if (loading) {
        return (
            <h2>Loading...</h2>
        )
    }

    function handleClickEdit() {
        setIsModalOpen(true)
    }

    function handleClickGenre(genero) {
        props.navigate(`/${routeParams.type}?genre=${genero}`)
    }

    //setIsPopUp({open: true, type: 1, title: "Completado", message: "Se cargo correctamente"})

    /*
        Array.from({ length: props.totalPages })
        Arriba lo que hago es crear un array con un largo
        determinado en el total de Paginas disponibles.

        Como no puedo usar un for loop para devolver los elementos,
        Ya que igual tendria que crear un arreglo y luego recorrerlo,
        creo uno con un largo definido guardando undefined en cada posicion
        y luego mapeo ese arreglo para devolver otro lleno de elementos html.

        Esto me permite crear la cantidad de elementos que quiero usando un numero.
    */

    return (
        <>
            <article className="view-Container">
                <header className="view-Header">
                    <h1 className='titulo'>
                        {data.title}
                    </h1>
                </header>
                <section>
                    <img src={data.img.startsWith('.') ? data.img.slice(1,) : data.img} alt={`Imgagen de portada del ${routeParams.type} ${data.title}`} />
                    <ul className='generos'>
                        {data.genre.map((genero) => {
                            return (
                                <li
                                    key={genero.id}
                                    className="generosItem"
                                    onClick={() => {handleClickGenre(genero.id)}}
                                >
                                    {genero.name}
                                </li>
                            )
                        })}
                    </ul>
                    <button id='viewEditBtn' className='border rounded-md border-cyan-400 self-center justify-self-center py-2 px-4 hover:bg-gray-400/60' onClick={() => { handleClickEdit() }}>
                        Editar
                    </button>
                </section>
                <p className='descripcion'>
                    {data.description}
                </p>
                <details className='[grid-area:3/1/4/2;] px-2 py-3'>
                    <summary>Capitulos Disponibles</summary>
                    <ul className='flex gap-2 flex-col'>
                        {/* 
                            https://getcssscan.com/css-checkboxes-examples
                            DE aqui me robe el checkbox toca ver como funciona y hacer uno 🫠
                        */}
                        {Array.from({ length: data.chapter }).map((_, index) => {
                            return (
                                <li key={"Chapter " + index + 1} className='flex gap-5 rounded-md px-2 py-3 m-2 items-center'>
                                    {/* <label htmlFor={'chapter'+index}>
                                        {"Capitulo " + (index + 1)} 
                                    </label> 
                                    <input type="checkbox" id={'chapter'+index}/> */}
                                    <div className="checkbox-wrapper-11">
                                        <input 
                                            id={'chapter'+index}
                                            type="checkbox"
                                            name="r"
                                            value="2"
                                        />
                                        <label htmlFor={'chapter'+index}>
                                            {"Capitulo " + (index + 1)}
                                        </label>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </details>
                
                {createPortal(
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        data={data}
                        generos={generos}
                        reload={reloadData}
                    />, document.getElementById("modalDiv"))}
            </article>
        </>
    )
}

// import { useEffect } from "react"
//import { mangasController, animesController, generosController } from '../../services/newApi'

// const [data, setData] = useState({})
// const [generos, setGeneros] = useState([])
// const [loading, setLoading] = useState(true)

// useEffect(() => {
//     setLoading(true)

//     const controller = routeParams.type === "Mangas" ? mangasController : animesController
//     Promise.all([
//         controller.getById({ id: routeParams.id }).catch(() => []),
//         generosController.get().catch(() => []).catch(() => [])
//     ]).then(([data, generos]) => {
//         setData(data)
//         setGeneros(generos)
//     }).finally(() => setLoading(false))
//     // controller.getById({ id: routeParams.id }).then(data => {
//     //     // console.log("View data: ",data)
//     //     setData(data)
//     // }).catch(e => {
//     //     console.error("Error Obteniendo la informacion: ", e)
//     // })
//     //     .finally(() => {
//     //         setLoading(false)
//     //     })

// }, [routeParams.id, routeParams.type])

// const reloadData = () => {
//     setLoading(true)
//     const controller = routeParams.type === "Mangas" ? mangasController : animesController
//     Promise.all([
//         controller.getById({ id: routeParams.id }).catch(() => []),
//         generosController.get().catch(() => []).catch(() => [])
//     ]).then(([data, generos]) => {
//         setData(data)
//         setGeneros(generos)
//     }).finally(() => setLoading(false))
//     // controller.getById({ id: routeParams.id }).then(data => {
//     //     // console.log("View data: ",data)
//     //     setData(data)
//     // }).catch(e => {
//     //     console.error("Error Obteniendo la informacion: ", e)
//     // })
//     //     .finally(() => {
//     //         setLoading(false)
//     //     })
// }
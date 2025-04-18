import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useParams } from 'wouter'

import './View.css'

import Modal from '../../components/modal/ModalPatch.jsx'


import { useGetById } from '../../hooks/useGetById.jsx'
import { PopUp } from '../../components/UI/NotificationPopUp/NotificationPopUp.jsx'

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
                </section>
                <p className='descripcion'>
                    {data.description}
                </p>
                <button id='viewEditBtn' className='border rounded-md border-cyan-400 self-center justify-self-center py-2 px-4 hover:bg-gray-400/60' onClick={() => { handleClickEdit() }}>
                    Editar
                </button>
                {createPortal(
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        data={data}
                        generos={generos}
                        reload={reloadData}
                    />, document.getElementById("modalDiv"))}
                {createPortal(<PopUp title="Completado" message="Se cargo correctamente" open={true} type={1}/>, document.getElementById("modalDiv"))}
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
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useParams } from 'wouter'

import './View.css'

import Modal from '../../components/modal/ModalPatch.jsx'

import { mangasController, animesController, generosController } from '../../services/newApi'

export function View(props) {
    const [data, setData] = useState({})
    const [generos, setGeneros] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    // Al ver que voy a usar varias veces el typo de controlador
    // Voy a hacerlo un esto del render.
    const routeParams = useParams()


    useEffect(() => {
        setLoading(true)

        const controller = routeParams.type === "Manga" ? mangasController : animesController
        Promise.all([
            controller.getById({ id: routeParams.id }).catch(() => []),
            generosController.get().catch(() => []).catch(() => [])
        ]).then(([data, generos]) => {
            setData(data)
            setGeneros(generos)
        }).finally(() => setLoading(false))
        // controller.getById({ id: routeParams.id }).then(data => {
        //     // console.log("View data: ",data)
        //     setData(data)
        // }).catch(e => {
        //     console.error("Error Obteniendo la informacion: ", e)
        // })
        //     .finally(() => {
        //         setLoading(false)
        //     })

    }, [routeParams.id, routeParams.type])

    const reloadData = () => {
        setLoading(true)
        const controller = routeParams.type === "Manga" ? mangasController : animesController
        Promise.all([
            controller.getById({ id: routeParams.id }).catch(() => []),
            generosController.get().catch(() => []).catch(() => [])
        ]).then(([data, generos]) => {
            setData(data)
            setGeneros(generos)
        }).finally(() => setLoading(false))
        // controller.getById({ id: routeParams.id }).then(data => {
        //     // console.log("View data: ",data)
        //     setData(data)
        // }).catch(e => {
        //     console.error("Error Obteniendo la informacion: ", e)
        // })
        //     .finally(() => {
        //         setLoading(false)
        //     })
        props.reload()
    }

    if (loading) {
        return (
            <h2>Loading...</h2>
        )
    }

    function handleClickEdit() {
        setIsModalOpen(true)
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
                <button id='viewEditBtn' className='border rounded-md border-cyan-400 self-center py-2 px-4 hover:bg-gray-400/60' onClick={() => { handleClickEdit() }}>
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
            </article>
        </>
    )
}
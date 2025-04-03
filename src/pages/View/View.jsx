import { useState, useEffect } from 'react'
import { useParams } from 'wouter'

import './View.css'

import { mangasController, animesController } from '../../services/newApi'

export function View() {
    const [data, setData ] = useState({})
    const [loading, setLoading] = useState(true)
    const routeParams = useParams()
    useEffect(() => {
        setLoading(true)
        const controller = routeParams.type === "Manga" ? mangasController : animesController
        
        controller.getById({id: routeParams.id }).then( data => {
            // console.log("View data: ",data)
            setData(data)
        }).catch( e => {
            console.error("Error Obteniendo la informacion: ", e) 
        })
        .finally( () => {
            setLoading(false)
        })

    }, [routeParams.id,routeParams.type])


    if (loading) {
        return (
            <h2>Loading...</h2>
        )
    }

    return (
        <article className="view-Container">
            <header className="view-Header">
                <h1 className='titulo'>
                    {data.title}
                </h1>
            </header>
            <section>
                <img src={data.img.startsWith('.') ? data.img.slice(1,) : data.img} alt={`Imgagen de portada del ${routeParams.type} ${data.title}`}/>
                <ul className='generos'>
                    {data.genre.map((genero, index) => {
                        return (
                            <li 
                                key={index}
                                className="generosItem"
                            >
                                {genero}
                            </li>
                        )
                    })}
                </ul>
            </section>
            <p className='descripcion'>
                {data.description}
            </p>
        </article>
    )
}
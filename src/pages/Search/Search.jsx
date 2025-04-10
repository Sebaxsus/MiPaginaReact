import { Link, useSearchParams, useParams } from "wouter";
import { useState, useEffect } from "react";

import { Card } from "../../components/card/Card";
import { mangasController, animesController, generosController } from '../../services/newApi'

import './Search.css'

export function Search() {
    const [datos, setDatos] = useState([])
    const [generos, setGeneros] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const routeParams = useParams()

    useEffect(() => {
        setLoading(true)
        let querySting = {}
        const controller = routeParams.type === "Manga" ? mangasController : animesController
        searchParams.forEach((value, key) => {
            querySting = { ...querySting, [key]: value }
        })

        Promise.all([
            controller.get(querySting).catch(() => []),
            generosController.get().catch(() => [])

        ]).then(([data, genres]) => {

            setDatos(data)
            setGeneros(genres)

        }).catch((e) => {

            alert("No se pudo obtener los datos")
            console.log(e)

        }).finally(
            setLoading(false)
        )



    }, [routeParams, searchParams])

    function handelClickGenre(genero) {
        setSearchParams((prev) => {
            return {...prev, genre: genero.toString()}
        })
    }


    return (
        <>
            <section className="search-Section ">
                <ul className="search-Pills ">
                    {generos.map((genero) => {
                        return (
                            <li
                                className="search-Pill "
                                key={genero.id}
                                onClick={() => { handelClickGenre(genero.id) }}
                            >
                                {genero.name}
                            </li>
                        )
                    })}
                </ul>
            </section>
            {loading ? <h2>Loading...</h2> : datos.map((item, index) => {
                return (
                    <>
                        <Link key={item.id} to={`/View/${routeParams.type}/${item.id}`} className={"justify-items-center w-full"}>
                            <Card
                                key={index}
                                data={item}
                                cardClass={"w-4/5 hover:scale-105 hover:shadow-lg hover:shadow-cyan-300/90 duration-300 min-w-[250px]"}
                                type={routeParams.type}
                            />
                        </Link>
                    </>
                )
            })}
        </>
    )
}
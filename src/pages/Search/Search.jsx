import { Link, useSearchParams, useParams } from "wouter";
import { useState, useEffect } from "react";

import { Card } from "../../components/card/Card";
import { mangasController, animesController, generosController } from '../../services/newApi'

import './Search.css'

export function Search() {
    const [datos, setDatos] = useState([])
    const [generos, setGeneros] = useState([])
    const [querySting, setQuerySting] = useState({})
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const routeParams = useParams()

    useEffect(() => {
        setLoading(true)
        const controller = routeParams.type === "Manga" ? mangasController : animesController
        const newQueryString = {}
        searchParams.forEach((value, key) => {
             newQueryString[key] = value
        })
        setQuerySting(newQueryString)

        Promise.all([
            controller.get(newQueryString).catch(() => []),
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

    function handelClickGenre(genero, queryGenre) {
        console.log("querySting: ", querySting.genre, querySting.title, genero)
        if (genero === queryGenre) {
            setSearchParams((prev) => {
                const prevParams = prev.has("title") ? prev.get("title") : "nada"
                console.log("Prev true",prevParams)
                prev.delete("genre")
                return prev
            },{
                replace: true
            })
        } else {
            setSearchParams((prev) => {
                const prevParams = prev.has("title") ? prev.get("title") : "nada"
                console.log("Prev false",prevParams)
                prev.set("genre", genero.toString())
                return prev
            },{
                replace: true
            })
        }
    }

    const queryGenre = Number.parseInt(querySting.genre)
    return (
        <>
            <section className="search-Section ">
                <ul className="search-Pills ">
                    {generos.map((genero) => {
                        return (
                            <li
                                className={`search-Pill ${genero.id === queryGenre ? "active" : ""}`}
                                key={genero.id}
                                onClick={() => { handelClickGenre(genero.id, queryGenre) }}
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
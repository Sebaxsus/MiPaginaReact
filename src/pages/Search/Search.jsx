import { Link, useSearchParams, useParams } from "wouter";
import { useState, useEffect } from "react";

import { Card } from "../../components/card/Card";
import { mangasController, animesController, generosController } from '../../services/newApi'

import './Search.css'

export function Search() {
    const [datos, setDatos] = useState([])
    const [generos, setGeneros] = useState([])
    const [QueryString, setQueryString] = useState({})
    const [searchString, setSearchString] = useState("")
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
        setQueryString(newQueryString)

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

    // action={(e) => {`./${routeParams.type}?title=${document.getElementById(`${routeParams.type}searchBar`).value}`}}
    function handleSearchBarAction(e) {
        e.preventDefault()

        if (searchString.length === 0) {
            setSearchParams((prev) => {
                prev.delete("title")
                return prev
            },{
                replace: true
            })
        } else {
            setSearchParams((prev) => {
                prev.set("title", searchString)
                return prev
            },{
                replace: true
            })
        }
    }

    function handelClickGenre(genero, queryGenre) {
        if (genero === queryGenre) {
            setSearchParams((prev) => {
                prev.delete("genre")
                return prev
            },{
                replace: true
            })
        } else {
            setSearchParams((prev) => {
                prev.set("genre", genero.toString())
                return prev
            },{
                replace: true
            })
        }
    }

    const queryGenre = Number.parseInt(QueryString.genre)
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
                <search>
                    <form action={`./${routeParams.type}?`} className="search-Form">
                        <div>
                            <input type="search" name="title" id={`${routeParams.type}searchBar`} onChange={(e) => {setSearchString(e.target.value)}}/>
                            <button>
                                Buscar
                            </button>
                        </div>
                    </form>
                </search>
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
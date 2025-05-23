import { Link, useSearchParams, useParams } from "wouter";
import { useState, useEffect, useRef } from "react";

import { Card } from "../../components/card/Card";
import { mangasController, animesController, generosController } from '../../services/newApi'

import './Search.css'

export function Search() {
    const [datos, setDatos] = useState([])
    const [generos, setGeneros] = useState([])
    const [QueryString, setQueryString] = useState({})
    const searchTitle = useRef(null)
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const routeParams = useParams()

    useEffect(() => {
        setLoading(true)
        const controller = routeParams.type === "Mangas" ? mangasController : animesController
        /*
        Utilizo un objeto local en lugar de QueryString
        ya que usar QueryString me obligaria a tenerlo 
        como dependecia y esto me causaria un loop infinito
        de renders por usar el setQueryString, por eso 
        uso un objeto local y luego lo actualizo al estado
        QueryString.

        Al usar newQueryString[key] = value, evito errores
        al declarar una variable como nombre de atributo (llave),
        por eso asigno al objeto newQueryString la llave [key]
        con el valor = value, esto tambien me permite mapear todos
        los parametros de la ruta para posterior mente enviar el objeto
        con todos los atributos y desestructurar los atributos en la API,
        para asi usar solo los que necesito.
        */
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

        if (searchTitle.current.value.length === 0) {
            setSearchParams((prev) => {
                prev.delete("title")
                return prev
            },{
                replace: true
            })
        } else {
            setSearchParams((prev) => {
                prev.set("title", searchTitle.current.value)
                return prev
            },{
                replace: true
            })
        }
    }

    function handelClickGenre(genero, queryGenre) {
        /*
        setSearchParams((prev))
        prev es un iterador y por ende me permite usar
        metodos como .has(key), .delete(key), .set(key, value)
        .get(key), con esto puedo modificar el objeto que me trae
        prev y para actualizar SearchParams le devuelvo el objeto
        plano prev.

        Utilizo en el Objeto {} de opciones el atributo replace
        en true para no guardar las modificaciones en el history.
        */
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

    /*
    En el formulario no uso el -
    action={(e) => {`./${routeParams.type}?title=${document.getElementById(`${routeParams.type}searchBar`).value}`}}
    porque esto me eliminaria cualquiero otro parametro de -
    ruta, y me recarga la pagina por su comportamiento de 
    formulario, lo cual no necesito ya que debo controlar
    y validar los valores antes de re-renderizar.
    */

    const queryGenre = Number.parseInt(QueryString.genre)
    return (
        <>
            <search className="search-Section ">
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
                <form onSubmit={(e) => { handleSearchBarAction(e)} } className="search-Form">
                    <div>
                        <input type="search" name="title" id={`${routeParams.type}searchBar`} ref={searchTitle}/>
                        <button>
                            Buscar
                        </button>
                    </div>
                </form>
            </search>
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
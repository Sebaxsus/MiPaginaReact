// Funcionalidades
import { Link, useSearchParams, useParams } from "wouter";
import { useState, useEffect } from "react";
import { searchController, generosController } from '../../services/newApi'
import { createPortal } from "react-dom";

// Componentes
import { Card } from "../../components/card/Card";
import { Search } from "../../components/search/Search";

// Estilos
import './Landing.css'

export function Home(props) {
    const [datos, setDatos] = useState([])
    const [generos, setGeneros] = useState([])
    const [loading, setLoading] = useState(true)
    const [QueryString, setQuerySting] = useState({})
    const [searchParams] = useSearchParams()
    const routeParams = useParams()

    useEffect(() => {
        setLoading(true)
        const newQueryString = {}
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
        searchParams.forEach((value, key) => {
            newQueryString[key] = value
        })
        setQuerySting(newQueryString)
        /*
        Aqui utlizo el controlador para la ruta
        "/search" que me maneja los datos de las dos tablas
        (anime,manga) y "cuenta con mejores consultas para -
        optimizar los tiempos de respuesta (latencia)",
        uso comillas ya que al final siguien siendo dos consultas unidas
        con el OPERADOR DE MySQL UNION ALL.
        */
        Promise.all([
            searchController.get(newQueryString).catch(() => []),
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
            {
                createPortal(
                    {}

                )
            }
            <search className="search">
                <Search
                    generos={generos}
                    queryGenre={queryGenre}
                    handleClickGenre={props.handleClickGenre}
                    handleSearchBarAction={props.handleSearchBarAction}
                    setSearchTitle={props.setSearchTitle}
                />
            </search>
            {loading ? <h2>Loading...</h2> : datos.map((item, index) => {
                return (
                    <>
                        <Link key={item.id} to={`/View/${item.type}/${item.id}`} className={"justify-items-center w-full"}>
                            <Card
                                key={index}
                                data={item}
                                cardClass={"w-4/5 hover:scale-105 hover:shadow-lg hover:shadow-cyan-300/90 duration-300 min-w-[250px]"}
                                type={item.type}
                            />
                        </Link>
                    </>
                )
            })}
        </>
    )
}
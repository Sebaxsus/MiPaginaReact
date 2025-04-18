// Funcionalidades
import { Link, useParams } from "wouter";
import { createPortal } from "react-dom";
// Hooks Personalizados
import { useSearchContent } from "../../hooks/useSearchContent.jsx";

// Componentes
import { Card } from "../../components/card/Card";
import { Search } from "../../components/search/Search";
import { PageNavegation } from "../../components/pageNavegation/PageNavegation.jsx";

// UI
import { Loader } from "../../components/UI/Loader/Loader.jsx";
import { PopUp } from "../../components/UI/NotificationPopUp/NotificationPopUp.jsx";

// Estilos
import './Landing.css'

// Quité props para que el linter no me joda con que se declaro y no se usa 😡
export function Home() {
    
    const routeParams = useParams()

    const { 
        datos,
        generos,
        loading,
        QueryString,
        pagination,
        handleClickGenre,
        handleSearchBarAction,
        handleSearchInputChange,
        handlePageNav
    } = useSearchContent(routeParams.type) 

    const queryGenre = Number.parseInt(QueryString.genre)
    return (
        <>
            <search className="search">
                <Search
                    generos={generos}
                    queryGenre={queryGenre}
                    handleClickGenre={handleClickGenre}
                    handleSearchBarAction={handleSearchBarAction}
                    setSearchTitle={handleSearchInputChange}
                />
            </search>
            {loading ? <Loader /> : datos.map((item, index) => {
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
            <PageNavegation 
                handlePageNav={handlePageNav}
                hasNext={pagination.hasNext}
                hasPrevius={pagination.hasPrevius}
                totalPages={pagination.totalPages}
                currentPage={pagination.currentPage}
            />
            {loading ? null : createPortal(<PopUp title="Completado" message="Se cargo correctamente" open={true} type={1}/>, document.getElementById("modalDiv")) }
        </>
    )
}

// import { useSearchParams } from "wouter";
// import { useState, useEffect } from "react";
// import { searchController, generosController } from '../../services/newApi'
// import { createPortal } from "react-dom";
// const [datos, setDatos] = useState([])

// const [generos, setGeneros] = useState([])
// const [loading, setLoading] = useState(true)
// const [QueryString, setQuerySting] = useState({})

// useEffect(() => {
//     setLoading(true)
//     const newQueryString = {}
//     /*
//     Utilizo un objeto local en lugar de QueryString
//     ya que usar QueryString me obligaria a tenerlo 
//     como dependecia y esto me causaria un loop infinito
//     de renders por usar el setQueryString, por eso 
//     uso un objeto local y luego lo actualizo al estado
//     QueryString.

//     Al usar newQueryString[key] = value, evito errores
//     al declarar una variable como nombre de atributo (llave),
//     por eso asigno al objeto newQueryString la llave [key]
//     con el valor = value, esto tambien me permite mapear todos
//     los parametros de la ruta para posterior mente enviar el objeto
//     con todos los atributos y desestructurar los atributos en la API,
//     para asi usar solo los que necesito.
//     */
//     searchParams.forEach((value, key) => {
//         newQueryString[key] = value
//     })
//     setQuerySting(newQueryString)
//     /*
//     Aqui utlizo el controlador para la ruta
//     "/search" que me maneja los datos de las dos tablas
//     (anime,manga) y "cuenta con mejores consultas para -
//     optimizar los tiempos de respuesta (latencia)",
//     uso comillas ya que al final siguien siendo dos consultas unidas
//     con el OPERADOR DE MySQL UNION ALL.
//     */
//     Promise.all([
//         searchController.get(newQueryString).catch(() => []),
//         generosController.get().catch(() => [])

//     ]).then(([data, genres]) => {

//         setDatos(data)
//         setGeneros(genres)

//     }).catch((e) => {

//         alert("No se pudo obtener los datos")
//         console.log(e)

//     }).finally(
//         setLoading(false)
//     )



// }, [routeParams, searchParams])

/*
En el formulario no uso el -
action={(e) => {`./${routeParams.type}?title=${document.getElementById(`${routeParams.type}searchBar`).value}`}}
porque esto me eliminaria cualquiero otro parametro de -
ruta, y me recarga la pagina por su comportamiento de 
formulario, lo cual no necesito ya que debo controlar
y validar los valores antes de re-renderizar.
*/
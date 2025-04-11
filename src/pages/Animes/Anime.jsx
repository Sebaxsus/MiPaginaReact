// Funcionalidades
import { Link, useSearchParams } from "wouter";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { animesController } from "../../services/newApi";

// Componentes
import { Card } from "../../components/card/Card";
import { Search } from "../../components/search/Search";

// Paginas
import AnimePost from "./AnimePost";


export function Anime(props) {
    
    const [datos, setDatos] = useState([])
    // const [generos, setGeneros] = useState([]) 
    // Como los generos no cambian regularmente, no voy a generar una peticion de los generos
    // Al servidor, voy usar los que ya tengo que se piden y almacenan al renderizar la pagina
    const [QueryString, setQueryString] = useState([])
    const [searchParams] = useSearchParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        const newQueryString = {}

        searchParams.forEach((value, key) => {

            newQueryString[key] = value
        })

        setQueryString(newQueryString)

        animesController.get(newQueryString).then((data) => {

            setDatos(data)

        }).catch((e) => {

            alert("No se pudo obtener los datos")
            console.log(e)

        }).finally(
            // Falle o no igual se cambiara el estado
            // de loading
            setLoading(false)

        )

    }, [searchParams])

    const queryGenre = Number.parseInt(QueryString.genre)
    return (
        <>
            <search className="search">
                <Search
                    generos={props.generos}
                    queryGenre={queryGenre}
                    handleClickGenre={props.handleClickGenre}
                    handleSearchBarAction={props.handleSearchBarAction}
                    setSearchTitle={props.setSearchTitle}
                />
            </search>
            {loading ? <h1>Cargando...</h1> : datos.map((anime, index) => {
                return (
                    <>
                        <Link key={anime.id} to={`/View/Animes/${anime.id}`} className={"justify-items-center w-full"}>
                            <Card
                                className="border-red-50"
                                key={index}
                                data={anime}
                                cardClass={"Card w-4/5 min-w-[250px]"}
                                type={"Anime"}
                            />
                        </Link>
                        {createPortal(<AnimePost reload={props.reload} generos={props.generos} />, document.getElementById("modalDiv"))}
                    </>
                )
            })}
        </>
    )

}

//console.log(props.data)
// Este esta mejor estructurado pero como esta diseñado desde antes el encargado del grid es el padre
// Por esto el main daña todo el diseño toca devolver las cartas como elemento hijo del padre section
// return (
//     <main className="grid w-3/4 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
//         {props.data.map((anime, index) => {
//             return (
//                 <Card 
//                     key={index}
//                     index={index}
//                     title={anime.title}
//                     desc={anime.desc}
//                     img={anime.img}
//                 />            
//             )
//         })}
//     </main>
// )
// props.postA(<AnimePost reload={props.reload} />)
// console.log("Generos: ", props.generos)
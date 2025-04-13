import { useState, useEffect } from "react";

import { useSearchParams } from "wouter";

import { animesController, mangasController, searchController, generosController } from "../services/newApi";

export function useSearchContent(type) {
    const [datos, setDatos] = useState([])
    const [generos, setGeneros] = useState([])
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)
    const [QueryString, setQuerySting] = useState({})
    const [searchTitle, setSearchTitle] = useState("")
    const [searchParams, setSearchParams] = useSearchParams()

    function handleSearchInputChange(title) {
        // console.log("HandleSearch ", title)
        setSearchTitle(title)
    }

    function handleSearchBarAction(e) {
        // console.log("Handle, ", e, " title: ",searchTitle)
        e.preventDefault()

        if (searchTitle.length === 0) {
            setSearchParams((prev) => {
                prev.delete("title")
                return prev
            },{
                replace: true
            })
        } else {
            setSearchParams((prev) => {
                prev.set("title", searchTitle)
                return prev
            },{
                replace: true
            })
        }
    }

    function handleClickGenre(genero, queryGenre) {
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

    useEffect(() => {
        setLoading(true)
        const newQueryString = {}
        const controller = type === undefined ? searchController : type === "Mangas" ? mangasController : animesController
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



    }, [type, searchParams, reload])

    return {
        datos,
        generos,
        loading,
        QueryString,
        searchTitle,
        reload: () => {setReload(!reload)},
        handleSearchInputChange,
        handleClickGenre,
        handleSearchBarAction
    }
}
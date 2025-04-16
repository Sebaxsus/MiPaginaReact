import { useState, useEffect } from "react";

import { useSearchParams } from "wouter";

import { animesController, mangasController, searchController, generosController } from "../services/newApi";

export function useSearchContent(type) {
    // Manejo de datos
    const [datos, setDatos] = useState([])
    const [generos, setGeneros] = useState([])
    const [QueryString, setQuerySting] = useState({})
    const [searchTitle, setSearchTitle] = useState("")
    const [pagination, setPagination] = useState({})
    // Funcionales
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    function handlePageNav(navType) {
        /*
            Si le paso un numero significa que le pase
            el numero de pagina, Si le paso un string
            le pase que accion quiero hacer, si quiero
            ir a la pagina siguiente o anterior.
        */

        if (typeof navType === "number") {
            
            setSearchParams((prev) => {
                prev.set("page", navType)
                return prev
            },{
                replace: true
            })
            
        } else {
            
            navType === "Next" ?
                setSearchParams((prev) => {
                    const next = pagination.currentPage + 1
                    prev.set("page", next)
                    return prev
                }, {
                    replace: true
                }) :
                setSearchParams((prev) => {
                    const previus = pagination.currentPage - 1
                    prev.set("page", previus)
                    return prev
                },{
                    replace: true
                })

        }
            
    }

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
                prev.set("page", 1)
                return prev
            },{
                replace: true
            })
        } else {
            setSearchParams((prev) => {
                prev.set("title", searchTitle)
                prev.set("page", 1)
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
                prev.set("page", 1)
                return prev
            },{
                replace: true
            })
        } else {
            setSearchParams((prev) => {
                prev.set("genre", genero.toString())
                prev.set("page", 1)
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

        ]).then(([content, genres]) => {

            setDatos(content.data)
            setPagination(content.pagination)
            setGeneros(genres)

        }).catch((e) => {

            alert("No se pudo obtener los datos")
            console.log(e)

        }).finally(
            setLoading(false)
        )



    }, [type, searchParams, reload])

    /*
    La API en peticiones getAll() ahora devuelve un objeto de dos
    Atributos, el primero es la lista de objetos conteniendo cada
    Registro de las tablas anime, manga.

    El segundo atributo es el objeto de paginacion, que contiene
    datos importantes para paginar como
        la pagina actual: currentPage
        el contenido designado por pagina: pageSize
        la cantidad de paginas disponibles: totalPages (Cuantas veces puedo tener una pagina con el limite de contenido por respuesta)
        la cantidad de registros encontrados: totalRows
        si tiene una pagina siguiente: hasNext
        si tiene una pagina previa: hasPrevius
        "data": [],
        "pagination": {
            "currentPage": 2,
            "pageSize": 6,
            "totalPages": 1,
            "totalRows": 2,
            "hasNext": false,
            "hasPrevius": true
        }
    */

    return {
        datos,
        generos,
        loading,
        QueryString,
        searchTitle,
        pagination,
        reload: () => {setReload(!reload)},
        handleSearchInputChange,
        handleClickGenre,
        handleSearchBarAction,
        handlePageNav,
    }
}
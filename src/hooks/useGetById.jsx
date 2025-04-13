import { useState, useEffect } from "react";

import { animesController, mangasController, generosController } from "../services/newApi";

export function useGetById(routeParams) {
    const [data, setData] = useState({})
    const [generos, setGeneros] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(true)

        const controller = routeParams.type === "Mangas" ? mangasController : animesController
        Promise.all([
            controller.getById({ id: routeParams.id }).catch(() => []),
            generosController.get().catch(() => []).catch(() => [])
        ]).then(([data, generos]) => {
            setData(data)
            setGeneros(generos)
        }).finally(() => setLoading(false))
        // controller.getById({ id: routeParams.id }).then(data => {
        //     // console.log("View data: ",data)
        //     setData(data)
        // }).catch(e => {
        //     console.error("Error Obteniendo la informacion: ", e)
        // })
        //     .finally(() => {
        //         setLoading(false)
        //     })

    }, [routeParams.id, routeParams.type])

    const reloadData = () => {
        setLoading(true)
        const controller = routeParams.type === "Mangas" ? mangasController : animesController
        Promise.all([
            controller.getById({ id: routeParams.id }).catch(() => []),
            generosController.get().catch(() => []).catch(() => [])
        ]).then(([data, generos]) => {
            setData(data)
            setGeneros(generos)
        }).finally(() => setLoading(false))
        // controller.getById({ id: routeParams.id }).then(data => {
        //     // console.log("View data: ",data)
        //     setData(data)
        // }).catch(e => {
        //     console.error("Error Obteniendo la informacion: ", e)
        // })
        //     .finally(() => {
        //         setLoading(false)
        //     })
    }

    return {
        data,
        generos,
        loading,
        reloadData
    }
}
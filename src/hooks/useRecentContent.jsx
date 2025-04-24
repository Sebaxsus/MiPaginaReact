import { useState, useEffect } from "react";

import { searchController, generosController } from "../services/newApi";

export function useRecentContent(type) {
    const [data, setData] = useState([])
    const [generos, setGeneros] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const search = type === undefined || type === "" ? "All" : type
        let dataLoad = true

        Promise.all([
            searchController.getRecent({type: search}).catch(() => []),
            generosController.get().catch(() => [])
        ]).then(([datos, generosData]) => {
            setData(datos)
            setGeneros(generosData)
            dataLoad = datos === undefined ? true : false
        }).catch((e) => {
            console.warn("Fallo el obtener los datos para Agregados Recientemente: ", e)
            dataLoad = true
        }).finally(() => {
            setLoading(dataLoad)
        })

    }, [type])

    return {
        data,
        generos,
        loading
    }
}
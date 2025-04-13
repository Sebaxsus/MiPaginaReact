import { useState, useEffect } from "react";

import { searchController, generosController } from "../services/newApi";

export function useRecentContent(type) {
    const [data, setData] = useState([])
    const [generos, setGeneros] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const search = type === undefined || type === "" ? "All" : type

        Promise.all([
            searchController.getRecent({type: search}).catch(() => []),
            generosController.get().catch(() => [])
        ]).then(([datos, generosData]) => {
            setData(datos)
            setGeneros(generosData)
        }).catch((e) => {
            console.error("Fallo el obtener los datos para Agregados Recientemente: ", e)
        }).finally(
            setLoading(false)
        )

    }, [type])

    return {
        data,
        generos,
        loading
    }
}
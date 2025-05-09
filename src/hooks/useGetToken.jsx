import { useState, useEffect } from "react";

import { authController } from "../services/newApi";

export function useGetToken({userData}) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        let dataLoad = true

        authController.login({userData}).then((datos) => {
            setData(datos)
            dataLoad = datos === undefined ? true : false
        }).catch((e) => {
            console.warn("Fallo el obtener los datos para Agregados Recientemente: ", e)
            dataLoad = true
        }).finally(() => {
            setLoading(dataLoad)
        })

    }, [userData])

    return {
        data,
        loading
    }
}
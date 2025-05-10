import { useState, useEffect } from "react";

import { useMainContext } from "../Context";
import { authController } from "../services/newApi";

export function useGetToken({userData}) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const { isLogged, setIsLogged } = useMainContext()

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

    if (data.status === 200) {
        setIsLogged({logged: true, token: res.data, user: {name: data.user, email: data.email} })
        setIsLogged({logged: true})
    }

    return {
        data,
        loading
    }
}
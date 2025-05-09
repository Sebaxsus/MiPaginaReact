import { useState, useRef } from "react"

import { useLocation } from "wouter"

import { authController } from "../../services/newApi"
import { useMainContext } from "../../Context"

export function Auth() {
    const [formUser, setFormUser] = useState("")
    const [formEmail, setFormEmail] = useState("")
    const [formPassword, setFormPassword] = useState("")

    const { setIsLogged, setIsPopUp } = useMainContext()
    const [location, navigate] = useLocation()

    const popUpText = useRef({title: "Completado", message: "Se cargo correctamente", type: 1})
    
    async function login(data) {
        try {
            const res = await authController.login({data})
            // console.log(res)
            if (res.status === 200 || res.statusCode == 200) {

                popUpText.current = {title: "Completado", message: res.data.message, type: 1}

                setIsLogged({logged: true, token: res.data, user: {name: data.user, email: data.email} })
                 // Reiniciando los valores de los campos
                setFormUser("");setFormEmail("");setFormPassword("")
                
                navigate("/")
            } else {
                console.log("Error al autenticar el usuario!")
                popUpText.current = {title: res.data.title, message: res.data.message, type: 2}
            }
        } catch (e) {
            console.log("Fallo el obtener token: ", e)
            popUpText.current = {title: "Fallo del Cliente", message: "Ocurrio un error inesperado en el cliente", type: 2}
            return e
        } finally {
            setIsPopUp({open: true, ...popUpText.current})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            user: formUser,
            email: formEmail,
            password: formPassword,
        }

        if (location.includes("Login") ) {
            login(data)
        } else {
            
            try {
                const res = await authController.register(data)
    
                if (res.status === 201 || res.data.code === 201) {
                    popUpText.current = {title: "Completado", message: res.data.message, type: 1}
                    setFormUser("");setFormEmail("");setFormPassword("")
                    login(data)
                } else {
                    console.log("Error al registrar el usuario!")
                    popUpText.current = {title: res.data.title, message: res.data.message, type: 2}
                }
            } catch (e) {
                console.log("Fallo el registro del usuario")
                popUpText.current = {title: "Fallo del Cliente", message: "Ocurrio un error inesperado en el cliente", type: 2}
                return e
            } finally {
                setIsPopUp({open: true, ...popUpText.current})
            }
        }

    }

    return (
        <>
            <section className="[grid-area:1/1/4/4] w-full flex justify-center">
                
                <form onSubmit={handleSubmit} className="modal-Form ">
                    <h1 className="self-center mb-6 text-xl border-b border-purple-800 p-2">{location.slice(1,)}</h1>
                    <label htmlFor="">
                        <h2>Nombre de usuario: </h2>
                        <input 
                            type="text"
                            title="Ingresa el nombre de usuario que deseas tener!"
                            placeholder="Ej: Sebaxsus"
                            value={formUser}
                            onChange={(e) => {setFormUser(e.target.value)}}
                            id="authUser"
                        />
                    </label>
                    <label htmlFor="">
                        <h2>Dirrecion de Correo Electronico: </h2>
                        <input 
                            type="email"
                            title="Ingresa tu email"
                            placeholder="Ej: sebax@gmail.com"
                            value={formEmail}
                            onChange={(e) => {setFormEmail(e.target.value)}}
                            id="authEmail"
                        />
                    </label>
                    <label htmlFor="">
                        <h2>Contraseña</h2>
                        <input 
                            type="password"
                            title="Ingresa tu contraseña"
                            placeholder="**********"
                            value={formPassword}
                            onChange={(e) => {setFormPassword(e.target.value)}}
                            id="authPass"
                        />
                    </label>
                    <button
                        type="submit"
                        className="modal-Form-Btn"
                    >
                        LogIn
                    </button>
                </form>
            </section>
        </>
    )
}
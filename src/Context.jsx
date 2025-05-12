import { createContext, useContext, useState, useEffect, useRef } from "react";
import { authController } from "./services/newApi";
import { useLocation } from "wouter";

const MainContext = createContext(null)

export const useMainContext = () => useContext(MainContext)

const ConfigContext = ({children}) => {
    const [isPopUp, setIsPopUp] = useState({open: false, type: 2, title: "Completado", message: "Se cargo correctamente"})
    const [isLogged, setIsLogged] = useState({logged: false, token: null, user: null})
    const [, navigate] = useLocation()

    const refreshTimeoutRef = useRef(null);

    function clearRefreshTimeout() {
        if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current);
            refreshTimeoutRef.current = null;
        }
    }

    async function refreshTimeOut({ tokenData, user }) {
        clearRefreshTimeout();

        const { refresh_token, access_token, token_type, expires_in } = tokenData;

        refreshTimeoutRef.current = setTimeout(async () => {
            const res = await authController.refreshToken({
                refreshToken: refresh_token,
                accessToken: access_token,
                tokenType: token_type,
            });

            if (res?.status === 200 && res?.data?.access_token) {
                const newToken = { ...res.data, refresh_token };
                setIsLogged({ logged: true, token: newToken, user });
                localStorage.setItem("auth", JSON.stringify({ logged: true, token: newToken, user }));
                refreshTimeOut({ tokenData: newToken, user });
            } else {
                console.warn("Refresh fallido, cerrando sesión.");
                setIsLogged({ logged: false, token: null, user: null });
                localStorage.removeItem("auth");
            }
        }, (expires_in * 1000) - 120000);
    }

    useEffect(() => {
        // Restaurar sesión si hay datos en localStorage
        const stored = localStorage.getItem("auth");
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.logged && parsed.token && parsed.user) {
                setIsLogged(parsed);
                refreshTimeOut({ tokenData: parsed.token, user: parsed.user });
            }
        }
    }, []);

    useEffect(() => {
        // Guardar estado en localStorage cada vez que se actualiza
        if (isLogged.logged) {
            localStorage.setItem("auth", JSON.stringify(isLogged));
        } else {
            localStorage.removeItem("auth");
            clearRefreshTimeout();
        }
    }, [isLogged]);

    function logout() {
        setIsLogged({ logged: false, token: null, user: null })
        localStorage.removeItem("auth");
        clearRefreshTimeout();
        navigate('/')
    }

    return (
        <MainContext.Provider value={{isPopUp, setIsPopUp, isLogged, setIsLogged, logout}}>
            {children}
        </MainContext.Provider>
    )
}

export default ConfigContext
import { createContext, useContext, useState } from "react";

const MainContext = createContext(null)

export const useMainContext = () => useContext(MainContext)

const ConfigContext = ({children}) => {
    const [isPopUp, setIsPopUp] = useState({open: false, type: 2, title: "Completado", message: "Se cargo correctamente"})
    const [isLogged, setIsLogged] = useState({logged: false, token: null, user: null})

    return (
        <MainContext.Provider value={{isPopUp, setIsPopUp, isLogged, setIsLogged}}>
            {children}
        </MainContext.Provider>
    )
}

export default ConfigContext
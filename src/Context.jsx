import { createContext, useContext, useState } from "react";

const MainContext = createContext(null)

export const useMainContext = () => useContext(MainContext)

const ConfigContext = ({children}) => {
    const [isPopUp, setIsPopUp] = useState({open: false, type: 2, title: "Completado", message: "Se cargo correctamente"})

    return (
        <MainContext.Provider value={{isPopUp, setIsPopUp}}>
            {children}
        </MainContext.Provider>
    )
}

export default ConfigContext
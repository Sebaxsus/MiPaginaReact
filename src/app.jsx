//Estilos
import './index.css'

//Componentes
import { NavBar } from './components/navBar/navBar.jsx'
import { useState } from 'react'

//Componente Manga a Renderizar
const Manga = ({ children, estado, index, desc}) => {

    {/*Asi se hace un comentario dentro de un componente react */}

    {/*
        Creo un Estado para cambiar la clase del componente
        Para Cambiar sus estilos
     */
    }
    // el Metodo useState me devuelve un array de dos posiciones
    // La posicion 0 es el valor,se puede dar un valor incial inicializando -el que esta en ()-
    // Esta inicializacion solo ocurrira una vez cuando se renderice el componente
    // La posicion 1 es la funcion para modificar el valor que se guarda
    const [ClassName, setClassName] = useState('Manga')
    const [Description, setDescription] = useState(desc[0])

    //Aqui lo uso ClassName como Bool y si es true lo ponga en manga
    //Si es False lo ponga en Manga-View
    //const style = ClassName ? 'Manga' : 'Manga-View'

    return (
        <div className={ClassName} onClick={() => {
            {/* 
                Aqui verifico que si el Nombre en ClassName
                es Igual a 'Manga' lo cambie a 'Manga-View'
                Y si no es 'Manga' lo cambie a 'Manga'
             */
            }
            setClassName(ClassName === 'Manga' ? 'Manga-View': 'Manga')
            setDescription(ClassName === 'Manga' ? desc[1]: desc[0])
        }}>
            {children}
            <p>{Description}</p>
        </div>
    )
}


/*
<div className='Manga'>
    <span className='Manga-Content'>
        {index}
    </span>
</div>
*/

export function App() {
    // Array de Mangas
    const mangaList = [
        {title: "Manga", desc: ["Bueno", "Un Anime Completo con Trama de..."], img: './Eula.jpg'},
        {title: "Manga", desc: ["Bueno", "Un Anime Completo con Trama de..."], img: './Eula.jpg'},
        {title: "Manga", desc: ["Bueno", "Un Anime Completo con Trama de..."], img: './Eula.jpg'}
    ]

    return (
        <>
            <header>
                <NavBar />
            </header>
            <div className='Body'>
                <section className='section-Mangas'>
                    {
                        mangaList.map((_, index) => {
                            return (
                                <Manga
                                    key={index}
                                    index={index}
                                    desc={mangaList[index].desc}
                                >
                                    <h1>{mangaList[index].title}</h1>
                                    <img src='/Eula.jpg' alt={mangaList[index].img}></img>
                                </Manga>
                            )
                        })
                    }
                </section>
                <div className='Display'>
                </div>
            </div>
            <footer>

            </footer>
        </>
    )
}
//No importo react al ser jsx
import { useState } from 'react'
import { Link } from 'wouter'
//Estilo
import './Manga.css'

//Componente que genera el cuerpo del manga

const MangaComp = ({children, index, estado, desc}) => {

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

    //HandleClick es una funcion para poner la logica del evento Click
    
    const handleClick = () => {
            {/* 
                Aqui verifico que si el Nombre en ClassName
                es Igual a 'Manga' lo cambie a 'Manga-View'
                Y si no es 'Manga' lo cambie a 'Manga'
             */
            }

            setClassName(ClassName === 'Manga' ? 'Manga-View': 'Manga')
            setDescription(ClassName === 'Manga' ? desc[1]: desc[0])
    }

    return (

        <div className={ClassName} onClick={handleClick}>

            {children}
            <p>{Description}</p>

        </div>

    )

}

//Para que react(Wooter) lo entienda como componente -No se si es cierto-
//Toca ponerlo como export default function NombreFunc ({ props }) { return( code )}
//En lugar de export function NombreFunc ({ props }) { return( code )}
//Si se usa como export func para que wooter lo renderice toca ponerlo como children <Route > children </Route>
export function Mangas ({mangaList = []}) {

    return (
        mangaList.map((_, index) => {

            return (
                <Link to={`/View-${mangaList[index].title}`}>
                    <MangaComp
                        key={index}
                        index={index}
                        desc={mangaList[index].desc} 
                    >
                        <h1>{mangaList[index].title}</h1>
                        <img src={mangaList[index].img} alt={`Imgaen de portada para el Manga ${mangaList[index].title}`}></img>

                    </MangaComp>
                </Link>

            )

        })
        
    )
}
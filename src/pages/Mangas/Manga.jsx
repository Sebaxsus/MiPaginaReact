//No importo react al ser jsx
import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { Card } from '../../components/card/Card'
import { createPortal } from 'react-dom'
import MangaPost from './MangaPost'
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
    const [Description, setDescription] = useState(desc)

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
           // ###### NOTAAAA
           // No estoy verificando nada ya que hardcodeo el cambio apenas entra al evento onClick con el manejador handleClick
           // Efectiva mente cambio el state de Classname y Description pero no los uso en ningun lado 🤣
        }
        document.querySelector('main').classList.replace('main-Mangas', 'view-Manga')

        setClassName(ClassName === 'Manga' ? 'Manga-View': 'Manga')
        setDescription(ClassName === 'Manga' ? "Desc Corta" : "Desc Larga")
        console.log(Description, "Condicion: ", ClassName === 'Manga' ? "Desc Corta" : "Desc Larga")
        // ^^^ Descripcion no cambia | Ya que dentro del handleClick no modifico ningun elemento
        // Html o vuelvo a renderizar algo, Solo ejecuto la funcion y cambio el nombre de la clase del elemento con id "main".
        // Usando el document.querySelector('main').classList.replace('main-Mangas', 'view-Manga')
    }

    return (
        //console.log("Return: ",Description),
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
export function Mangas (props) {

    // return (
    //     mangaList.map((manga, index) => {
    //         //console.log(manga)
    //         return (
    //             <Link key={manga.id} to={`/View-${manga.title}`}>
    //                 <MangaComp
    //                     index={index}
    //                     desc={manga.description} 
    //                 >
    //                     <h1>{manga.title}</h1>
    //                     <img className='mangaImg' src={manga.img} alt={`Imgaen de portada para el Manga ${manga.title}`}></img>

    //                 </MangaComp>
    //             </Link>

    //         )

    //     })
        
    // )
    // props.postM(<MangaPost reload={props.reload} />)

    
    return (
        props.mangaList.map( (manga, index) => {
            return (
                <>
                
                <Link key={manga.id} to={`/View/Manga/${manga.id}`} className={"justify-items-center w-full"}>
                    <Card
                        key={index}
                        data={manga}
                        cardClass={"w-4/5 hover:scale-105 hover:shadow-lg hover:shadow-cyan-300/90 duration-300 min-w-[250px]"}
                        type={"Manga"}
                    />
                </Link>
                {createPortal(<MangaPost reload={props.reload} />, document.getElementById("modalDiv"))}
                </>
            )
        })
    )
}
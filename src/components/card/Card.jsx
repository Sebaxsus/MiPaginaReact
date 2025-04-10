import { useState } from "react";

import './Card.css'

export function Card({ data = {}, cardClass, type }) {
    // new Image().src = img ######### Esto Obliga al navegador a precargar la imagen
    /*
    useEffect(() => {
            new Image().src = img
        }, [])
    
    Info sobre esto: https://stackoverflow.com/a/67924817
    */
    const [card, setCard] = useState('card-Container')
    // const [Desc, setDesc] = useState(desc)

    // Como voy a acceder a los datos completos del Anime/Manga
    // Ahora voy a pedir todos los datos en lugar de pedir cada uno
    // Mi duda es cual es el impato en rendimiento entre
    // Acceder a las propiedades del objeto en cada lugar que lo necesito
    // O declarar constantes locales y almacenar las propiedades ahi.

    // ############ ACTUALIZACION

    // Preguntando a chatGPT en mi caso ya que no se usa mucho las propiedades y el objeto no contiene propiedades anidadas o complejas
    // Es mejor acceder a las propiedades del objeto, en lugar de desestructurar el objeto en constantes
    // Al final la diferencia en rendimiento es minima, pero no cero, al usar las constantes en mi caso que no utilizo muchas veces la propiedad
    // o no tengo una funcion getter compleja que acceda muchas veces a la misma propiedad dentro del render

    // La unica propiedad que voy a poner en memoria va a ser el arreglo de generos
    const genre = data.genre?.length ? data.genre : [{name:"Not Found!"}]
    // Aqui se usa el Encadenamiento opcional, Este metodo `?.` me permite verificar el valor de una propiedad dentro de una cadena de objetos
    // y verifica que el valor no sea null o undefined | si llega a ser null o undefined retornara undefined
    // Pero yo modifico el retorno a ["Not Found!"]
    // Recurso para saber mas MDN (https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
    // console.log(`${data.genre} 1 ${data.genre?.length ? data.genre : ["Not Found!"]}, 2 ${(data.genre === undefined || data.genre.length === 0)}`)

    const handleClick = () => {

        setCard(card === 'card-Container' ? 'card-Container-view' : 'card-Container')
        //setDesc(card === 'card-Container' ? desc[0] : desc[1])
    }

    // return (
    //     <div className={`${card} ${cardClass}`} onClick={handleClick}>
    //         <h2 className="cardTitle">{titulo}</h2>
    //         <img className="cardImg" src={img} alt="Imagen"></img>
    //         <p className="cardContent">
    //             Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
    //             Omnis, natus necessitatibus, fugiat dolorem quidem fuga, 
    //             maiores consequatur delectus sint aut unde impedit expedita debitis. 
    //             Dignissimos nemo aliquid consequuntur vel cupiditate.
    //         </p>
    //     </div>
    // )

    return (
        // Al Final me toco usar estilo en linea para usar la imagen
        // De manera dinamica como fondo (background)
        // Con tailwind se supone que la propieda para esto es
        // bg-[url(/img/mountains.jpg)] en mi caso seria bg-[url(${img.slice(1,)})]
        // Pero esto no funciona \_(シ)_/
        <article style={{ backgroundImage: `url(${data.img.startsWith('.') ? data.img.slice(1,) : data.img})` }} aria-label={`Imagen de fondo del ${type} ${data.title}`} className={`${cardClass} aspect-[15/18] grid grid-rows-2 border border-[#f5f5f5] rounded-lg overflow-hidden text-ellipsis duration-300 bg-cover`}>

            <h2 className="text-center justify-self-center border-b-2 border-b-[#70deff] w-4/5 backdrop-blur backdrop-brightness-75 h-fit mt-1 rounded-2xl">
                {data.title}
            </h2>

            <section className="flex flex-col gap-y-4 px-2 pt-2 justify-evenly">
                <p className={data.description === undefined ? "hidden" : "text-clip overflow-auto indent-[2ch] [scrollbar-width:none] [scrollbar-gutter:stable] [scrollbar-color:#244_#242424] p-1 backdrop-blur-md backdrop-brightness-[0.6] rounded-2xl"} aria-label={`Descripcion del ${type} ${data.titulo}`}>
                    {data.description}
                </p>

                <ul className="flex gap-x-3 pb-1 justify-center items-end flex-wrap text-xs" aria-label={`Lista de Genero del ${type} ${data.title}`}>
                    {genre.map((genero, index) => {
                        return (
                            <li
                                key={index}
                                className="bg-black/20 rounded-lg font-semibold backdrop-blur-[24px] backdrop-brightness-[0.9] border border-purple-800 [box-shadow:#ff76ff_inset_-20px_-20px_10px_-25px] px-[2px] py-[4px]"
                            >
                                {genero.name}
                            </li>
                        )
                    })}
                </ul>
            </section>

        </article>
    )

}

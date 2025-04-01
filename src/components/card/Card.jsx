import { useState } from "react";

import './Card.css'

export function Card ({titulo, desc, img, genre, cardClass, type}) {
    // new Image().src = img ######### Esto Obliga al navegador a precargar la imagen
    /*
    useEffect(() => {
            new Image().src = img
        }, [])
    
    Info sobre esto: https://stackoverflow.com/a/67924817
    */
    const [card, setCard] = useState('card-Container')
   // const [Desc, setDesc] = useState(desc)

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
    if (genre === undefined) {
        genre = ["Not Found!"]
    }

    return (
        // Al Final me toco usar estilo en linea para usar la imagen
        // De manera dinamica como fondo (background)
        // Con tailwind se supone que la propieda para esto es
        // bg-[url(/img/mountains.jpg)] en mi caso seria bg-[url(${img.slice(1,)})]
        // Pero esto no funciona \_(シ)_/
        <article style={{backgroundImage: `url(${img})`}} aria-label={`Imagen de fondo del ${type} ${titulo}`} className={`${cardClass} aspect-[15/18] grid grid-rows-2 border border-[#f5f5f5] rounded-lg overflow-hidden text-ellipsis duration-300 bg-cover`}>

            <h2 className="text-center justify-self-center border-b-2 border-b-[#70deff] w-4/5 backdrop-blur backdrop-brightness-75 h-fit mt-1 rounded-2xl">
                {titulo}
            </h2>

            <section className="flex flex-col gap-y-4 px-2 pt-2 justify-end">
                <p className={desc === undefined ? "hidden" : "text-clip overflow-auto indent-[2ch] [scrollbar-width:none] [scrollbar-gutter:stable] [scrollbar-color:#244_#242424] p-1 backdrop-blur-md backdrop-brightness-[0.6] rounded-2xl"} aria-label={`Descripcion del ${type} ${titulo}`}>
                    {desc}
                </p>

                <ul className="flex gap-x-3 pb-1 justify-center items-end" aria-label={`Lista de Genero del ${type} ${titulo}`}>
                    {genre.map((genero, index) => {
                        return (
                            <li 
                                key={index}
                                className=" rounded-xl font-semibold backdrop-blur-[24px] brightness-[0.9] border border-purple-800 [box-shadow:#ff76ff_inset_-20px_-20px_10px_-25px] px-[2px] py-[4px]"
                            >
                                {genero}
                            </li>
                        )
                    })}
                </ul>
            </section>
            
        </article>
    )

}

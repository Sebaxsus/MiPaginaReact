import { useState } from "react";

import './Card.css'

function card1BackgroundImg_TextBlur({ titulo, img, cardClass }) {

    return (
        // Al Final me toco usar estilo en linea para usar la imagen
        // De manera dinamica como fondo (background)
        // Con tailwind se supone que la propieda para esto es
        // bg-[url(/img/mountains.jpg)] en mi caso seria bg-[url(${img.slice(1,)})]
        // Pero esto no funciona \_(シ)_/
        <div style={{backgroundImage: `url(${img})`}}  className={`cardBackgroudnPer ${cardClass} grid grid-rows-2 border border-[#f5f5f5] rounded-lg overflow-hidden text-ellipsis duration-300 bg-cover`}>

            <h2 className="text-center justify-self-center border-b-2 border-b-[#244] w-4/5 backdrop-blur backdrop-brightness-75 h-fit mt-1 rounded-2xl">{titulo}</h2>

            <p className="text-clip overflow-auto indent-[2ch] [scrollbar-width:none] [scrollbar-gutter:stable] [scrollbar-color:#244_#242424] h-[22ch] my-0 mx-1 pt-2 px-1 backdrop-blur-md backdrop-brightness-[0.3] rounded-2xl">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Omnis, natus necessitatibus, fugiat dolorem quidem fuga,
                maiores consequatur delectus sint aut unde impedit expedita debitis.
                Dignissimos nemo aliquid consequuntur vel cupiditate.
            </p>
            
        </div>
    )
}

export function Card ({index, titulo, desc = [], img, cardClass}) {
    // new Image().src = img ######### Esto Obliga al navegador a precargar la imagen
    /*
    useEffect(() => {
            new Image().src = img
        }, [])
    
    Info sobre esto: https://stackoverflow.com/a/67924817
    */
    const [card, setCard] = useState('card-Container')
    const [Desc, setDesc] = useState(desc[0])

    const handleClick = () => {
    
        setCard(card === 'card-Container' ? 'card-Container-view' : 'card-Container')
        setDesc(card === 'card-Container' ? desc[0] : desc[1])
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
        card1BackgroundImg_TextBlur({titulo, img, cardClass})
    )

}

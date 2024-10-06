import { useState, useEffect } from "react";

import './Card.css'

export function Card ({index, titulo, desc = [], img}) {

    const [card, setCard] = useState('card-Container')
    const [Desc, setDesc] = useState(desc[0])

    const handleClick = () => {
    
        setCard(card === 'card-Container' ? 'card-Container-view' : 'card-Container')
        setDesc(card === 'card-Container' ? desc[0] : desc[1])
    }

    return (
        <div className={card} onClick={handleClick}>
            <h2>{titulo}</h2>
            <img src={img} alt="Imagen"></img>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                Omnis, natus necessitatibus, fugiat dolorem quidem fuga, 
                maiores consequatur delectus sint aut unde impedit expedita debitis. 
                Dignissimos nemo aliquid consequuntur vel cupiditate.
            </p>
        </div>
    )


}

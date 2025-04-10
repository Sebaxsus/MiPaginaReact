import { useState } from "react";

import './Card-option2.css'

function card1BackgroundImg_TextBlur ({ titulo, img, cardClass}) {
 return (
    <div className={`${cardClass} grid grid-rows-2 border border-[#f5f5f5] rounded-lg overflow-hidden text-ellipsis duration-300 bg-[url("${img.slice(2,)}")] bg-cover`}>
            <h2 className="text-center justify-self-center border-b-2 border-b-[#244] w-4/5 backdrop-blur backdrop-brightness-75 mb-[40%] mt-1 rounded-2xl">{titulo}</h2>
            
            <p className="text-clip indent-[2ch] [scrollbar-width:none;scrollbar-gutter:stable;scrollbar-color:#244_#242424] h-[22ch] my-0 mx-1 pt-2 px-1 backdrop-blur-md backdrop-brightness-[30] rounded-2xl">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                Omnis, natus necessitatibus, fugiat dolorem quidem fuga, 
                maiores consequatur delectus sint aut unde impedit expedita debitis. 
                Dignissimos nemo aliquid consequuntur vel cupiditate.
            </p>
    </div>
 )
}

export function Card1 ({index, titulo, desc = [], img, cardClass}) {

    const [card, setCard] = useState('card-Container')
    const [Desc, setDesc] = useState(desc[0])

    const handleClick = () => {
    
        setCard(card === 'card-Container' ? 'card-Container-view' : 'card-Container')
        setDesc(card === 'card-Container' ? desc[0] : desc[1])
    }

    return (
        <div className={`${card} ${cardClass}`} onClick={handleClick}>
            <h2 className="cardTitle">{titulo}</h2>
            
            <p className="cardContent">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                Omnis, natus necessitatibus, fugiat dolorem quidem fuga, 
                maiores consequatur delectus sint aut unde impedit expedita debitis. 
                Dignissimos nemo aliquid consequuntur vel cupiditate.
            </p>
        </div>
    )


}

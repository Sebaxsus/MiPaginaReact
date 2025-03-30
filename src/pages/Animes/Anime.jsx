import { Card } from "../../components/card/Card";


export function Anime(props) {
    //console.log(props.data)
    // Este esta mejor estructurado pero como esta diseñado desde antes el encargado del grid es el padre
    // Por esto el main daña todo el diseño toca devolver las cartas como elemento hijo del padre section
    // return (
    //     <main className="grid w-3/4 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
    //         {props.data.map((anime, index) => {
    //             return (
    //                 <Card 
    //                     key={index}
    //                     index={index}
    //                     title={anime.title}
    //                     desc={anime.desc}
    //                     img={anime.img}
    //                 />            
    //             )
    //         })}
    //     </main>
    // )
    return (
        props.data.map((anime, index) => {
            return (
                <Card
                    className="border-red-50"
                    key={index}
                    index={index}
                    titulo={anime.title}
                    desc={anime.desc}
                    img={anime.img}
                    cardClass={"w-4/5 hover:scale-105 hover:shadow-lg hover:shadow-cyan-300/90 duration-300 "}
                />
            )
        })
    )
}
import { Link } from "wouter";
import { Card } from "../../components/card/Card";
import AnimePost from "./AnimePost";
import { createPortal } from "react-dom";


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
    // props.postA(<AnimePost reload={props.reload} />)
    // console.log("Generos: ", props.generos)
    return (
        props.data.map((anime, index) => {
            return (
                <>
                <Link key={anime.id} to={`/View/Anime/${anime.id}`} className={"justify-items-center w-full"}>
                    <Card
                        className="border-red-50"
                        key={index}
                        data={anime}
                        cardClass={"w-4/5 hover:scale-110 hover:shadow-lg hover:shadow-cyan-300/90 duration-300 min-w-[250px]"}
                        type={"Anime"}
                    />
                </Link>
                {createPortal(<AnimePost reload={props.reload} generos={props.generos}/>, document.getElementById("modalDiv"))}
                </>
            )
        })
    )
}
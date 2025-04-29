// Funcionalidades
import { Link } from "wouter";
import { createPortal } from "react-dom";
import { memo } from "react";
// Hook Personalizado
import { useSearchContent } from "../../hooks/useSearchContent";

// Componentes
import { Card } from "../../components/card/Card";
import { Search } from "../../components/search/Search";

//UI
import { PopUp } from "../../components/UI/NotificationPopUp/NotificationPopUp";
import { Loader } from "../../components/UI/Loader/Loader";

// Paginas
import AnimePost from "./AnimePost";
import { PageNavegation } from "../../components/pageNavegation/PageNavegation";

// Quité props para que el linter no me joda con que se declaro y no se usa 😡
export const Anime =  memo(function Anime() {
    
    const {
        datos,
        generos,
        loading,
        QueryString,
        pagination,
        reload,
        handleClickGenre,
        handleSearchBarAction,
        handleSearchInputChange,
        handlePageNav
    } = useSearchContent("Animes")

    const queryGenre = Number.parseInt(QueryString.genre)
    return (
        <>
            <search className="search">
                <Search
                    generos={generos}
                    queryGenre={queryGenre}
                    handleClickGenre={handleClickGenre}
                    handleSearchBarAction={handleSearchBarAction}
                    setSearchTitle={handleSearchInputChange}
                />
            </search>
            {loading ? <Loader /> : datos.map((anime, index) => {
                return (
                    <>
                        <Link key={anime.id} to={`/View/Animes/${anime.id}`} className={"justify-items-center w-full"}>
                            <Card
                                className="border-red-50"
                                key={index}
                                data={anime}
                                cardClass={"Card w-4/5 min-w-[250px]"}
                                type={"Anime"}
                            />
                        </Link>
                        {createPortal(<AnimePost reload={reload} generos={generos} />, document.getElementById("modalDiv"))}
                    </>
                )
            })}
            <PageNavegation
                handlePageNav={handlePageNav}
                hasNext={pagination.hasNext}
                hasPrevius={pagination.hasPrevius}
                totalPages={pagination.totalPages}
                currentPage={pagination.currentPage}
            />
            {loading ? null : createPortal(<PopUp title="Completado" message="Se cargo correctamente" open={true} type={1}/>, document.getElementById("modalDiv")) }
        </>
    )

}
)

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
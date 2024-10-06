//Imports de React
import { Route } from 'wouter'

//Estilos

import './index.css'

//Componentes

import { NavBar } from './components/navBar/navBar.jsx'
import { Mangas } from './pages/Mangas/Manga.jsx'
import { Card } from './components/card/Card.jsx'
import { View } from './pages/View/View.jsx'


/*
<div className='Manga'>
    <span className='Manga-Content'>
        {index}
    </span>
</div>
*/

const lorem = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis, natus necessitatibus, fugiat dolorem quidem fuga, maiores consequatur delectus sint aut unde impedit expedita debitis. Dignissimos nemo aliquid consequuntur vel cupiditate"

export function App() {
    const lastAdded = [
        { type: "Anime", title: "Anime", desc: ["Suave", "No me termino de convencer por..."], img: './CasualEula.png'},
        { type: "Anime", title: "Anime", desc: ["Suave", "No me termino de convencer por..."], img: './CasualEula.png'},
        { type: "Anime", title: "Anime", desc: ["Suave", "No me termino de convencer por..."], img: './CasualEula.png'},
        { type: "Anime", title: "Anime", desc: ["Suave", "No me termino de convencer por..."], img: './CasualEula.png'},
    ]
    // Array de Mangas
    const mangaList = [
        { title: "Manga", desc: ["Bueno", lorem], img: './Eula.jpg' },
        { title: "Manga", desc: ["Bueno", lorem], img: './Eula.jpg' },
        { title: "Manga", desc: ["Bueno", lorem], img: './Eula.jpg' },
        { title: "Manga", desc: ["Bueno", lorem], img: './Eula.jpg' },
        { title: "Manga", desc: ["Bueno", lorem], img: './Eula.jpg' },
        { title: "Manga", desc: ["Bueno", lorem], img: './Eula.jpg' }
    ]

    return (
        <>
            <header>
                <NavBar />
            </header>
            <div className='Body'>
                <section className="section-Mangas">
                    {console.log(window.location.pathname)}
                    {/* Aqui en route Tiene una propiedad -Atributo- component={}
                        Para Renderizar el componente,
                        Ahora mismo este renderizando un Childre <Rote>Child</Route> 
                    */}
                    {
                        <>
                            <Route
                                path={"/Mangas"}
                            >
                                <Mangas mangaList={mangaList} />
                            </Route>
                            <Route path={`/View-${mangaList[0].title}`}>
                                <View />
                            </Route>
                        </>
                    }
                </section>
                
                <aside className='Display-aside'>
                    <h1>Agregados Recientemente</h1>
                    {lastAdded.map((_, index) => {
                        return (
                            <Card
                                key={index}
                                index={index}
                                titulo={lastAdded[index].title}
                                desc={lastAdded[index].desc}
                                img={lastAdded[index].img} 
                            />
                        )
                    })}
                </aside>
            </div>
            <footer>

            </footer>
        </>
    )
}
//Imports de React
import { Route } from 'wouter'
import { useEffect, useState } from 'react'

//Estilos

import './index.css'

//Componentes

import { NavBar } from './components/navBar/navBar.jsx'
import { Mangas } from './pages/Mangas/Manga.jsx'
import { Card } from './components/card/Card.jsx'
import { View } from './pages/View/View.jsx'

// Servicios

import { getMangas } from './services/api.js'
// import Post from './pages/Mangas/MangaPost.jsx'

/*
<div className='Manga'>
    <span className='Manga-Content'>
        {index}
    </span>
</div>
*/

const lorem = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis, natus necessitatibus, fugiat dolorem quidem fuga, maiores consequatur delectus sint aut unde impedit expedita debitis. Dignissimos nemo aliquid consequuntur vel cupiditate"

export function App() {
    // const [view, setView] = useState('section-' + window.location.pathname.replace('/', ''))

    console.log(Route.className)
    const lastAdded = [
        { type: "Anime", title: "Anime", desc: ["Suave", "No me termino de convencer por..."], img: './CasualEula.png'},
        { type: "Anime", title: "Anime", desc: ["Suave", "No me termino de convencer por..."], img: './CasualEula.png'},
        { type: "Anime", title: "Anime", desc: ["Suave", "No me termino de convencer por..."], img: './CasualEula.png'},
        { type: "Anime", title: "Anime", desc: ["Suave", "No me termino de convencer por..."], img: './CasualEula.png'},
    ]
    // Array de Mangas
    const mangaListBack = [
        { title: "Manga", desc: ["Bueno", lorem], img: './Eula.jpg' },
        { title: "Manga", desc: ["Bueno", lorem], img: './Eula.jpg' },
        { title: "Manga", desc: ["Bueno", lorem], img: './Eula.jpg' },
        { title: "Manga", desc: ["Bueno", lorem], img: './Eula.jpg' },
        { title: "Manga", desc: ["Bueno", lorem], img: './Eula.jpg' },
        { title: "Manga", desc: ["Bueno", lorem], img: './Eula.jpg' }
    ]

    const [mangaList, setMangasList] = useState(mangaListBack)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMangas('').then(data => {setMangasList(data);setLoading(false)})
    }, [])

    return (
        <>
            <header className="nav-container">
                <NavBar />
            </header>
            <div className='Body'>
                <section className={`section-Mangas`}>
                    {/* Aqui en route Tiene una propiedad -Atributo- component={}
                        Para Renderizar el componente,
                        Ahora mismo este renderizando un Children <Rote>Child</Route> 
                    */}
                    {
                        <>
                            <Route
                                path={"/Mangas"}
                            >
                               {loading ? <h1>Cargando...</h1> : <Mangas mangaList={mangaList} />} 
                            </Route>
                            <Route path={`/View-${mangaList[0].title}`}>
                                <View />
                            </Route>
                        </>
                    }
                </section>
                
                <aside className='Display-aside'>
                    <header>
                        <h1>Agregados Recientemente</h1>
                    </header>
                    <body className='aside-cards-container'>
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
                    </body>
                </aside>
            </div>
            <footer>

            </footer>
        </>
    )
}
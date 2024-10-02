//Estilos
import './index.css'

//Componentes
import { NavBar } from './components/navBar/navBar.jsx'
import { useState } from 'react'

//Componente Manga a Renderizar
const Manga = ({ children, estado, index}) => {
    return (
        <div className='Manga'>
            {children}
        </div>
    )
}


/*
<div className='Manga'>
    <span className='Manga-Content'>
        {index}
    </span>
</div>
*/

export function App() {
    // Array de Mangas
    const [mangaList, setMangaList] = useState([
        {title: "Manga", desc: "Bueno", img: './Eula.jpg'},
        {title: "Manga", desc: "Bueno", img: './Eula.jpg'},
        {title: "Manga", desc: "Bueno", img: './Eula.jpg'}
    ])

    return (
        <>
            <header>
                <NavBar />
            </header>
            <div className='Body'>
                <section className='section-Mangas'>
                    {
                        mangaList.map((_, index) => {
                            return (
                                <Manga
                                    key={index}
                                    index={index}
                                >
                                    <h1>{mangaList[index].title}</h1>
                                    <p>{mangaList[index].desc}</p>
                                    <img src='/Eula.jpg' alt={mangaList[index].img}></img>
                                </Manga>
                            )
                        })
                    }
                </section>
                <div className='Display'>
                </div>
            </div>
            <footer>

            </footer>
        </>
    )
}
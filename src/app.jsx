//Imports de React
import { Route } from 'wouter'

//Estilos

import './index.css'

//Componentes

import { NavBar } from './components/navBar/navBar.jsx'
import { Mangas } from './pages/Mangas/Manga.jsx'


/*
<div className='Manga'>
    <span className='Manga-Content'>
        {index}
    </span>
</div>
*/

export function App() {
    // Array de Mangas
    const mangaList = [
        {title: "Manga", desc: ["Bueno", "Un Anime Completo con Trama de..."], img: './Eula.jpg'},
        {title: "Manga", desc: ["Bueno", "Un Anime Completo con Trama de..."], img: './Eula.jpg'},
        {title: "Manga", desc: ["Bueno", "Un Anime Completo con Trama de..."], img: './Eula.jpg'}
    ]

    return (
        <>
            <header>
                <NavBar />
            </header>
            <div className='Body'>
                <section className='section-Mangas'>
                    {/* Aqui en route Tiene una propiedad -Atributo- component={}
                        Para Renderizar el componente,
                        Ahora mismo este renderizando un Childre <Rote>Child</Route> 
                    */}
                    {
                        <Route 
                            component={<Mangas mangaList={mangaList}/>} 
                            path={"/Mangas"}
                        />
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
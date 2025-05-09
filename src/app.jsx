//Imports de React
import { Route, useLocation, Link } from 'wouter'

//Estilos

import './index.css'

//Componentes

import { NavBar } from './components/navBar/navBar.jsx'
import { Card } from './components/card/Card.jsx'

// UI
import { Loader } from './components/UI/Loader/Loader.jsx'


// Paginas
import { View } from './pages/View/View.jsx'
import { Anime } from './pages/Animes/Anime.jsx'
import { Mangas } from './pages/Mangas/Manga.jsx'
import { Home } from './pages/Landing/Landing.jsx'
import { Auth } from './pages/Auth/Auth.jsx'
// import { Search } from './pages/Search/Search.jsx'
import { useRecentContent } from './hooks/useRecentContent.jsx'
import { PopUp } from './components/UI/NotificationPopUp/NotificationPopUp.jsx'

/*
<div className='Manga'>
    <span className='Manga-Content'>
        {index}
    </span>
</div>
*/

// const lorem = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis, natus necessitatibus, fugiat dolorem quidem fuga, maiores consequatur delectus sint aut unde impedit expedita debitis. Dignissimos nemo aliquid consequuntur vel cupiditate"

export function App() {
    // const [view, setView] = useState('section-' + window.location.pathname.replace('/', ''))
    // const [location, navigate] = useLocation() // Location se usa para obtener la ruta actual de la app
    // navigate se usa para modificar la ruta de la app
    
    const [location, navigate] = useLocation()

    const mainClass = location.includes("View") ? "view" : "main-Cards"
    // Si la url tiene View saquele "Animes" o "Mangas" de /View/Animes/7f681b26-1709-11f0-a11a-a8a15907d61f si no solo quitele "/"
    const {data, loading} = useRecentContent(location.includes("View") ? location.slice(6,12) : location.slice(1,).includes("Login") || location.slice(1,).includes("Register") ? undefined : location.slice(1,))
    // const {data, loading } = useRecentContent("Animes")
    // console.log(location)

    // console.log(location !== '/' ? ((location === '/Mangas') ? "MangaPost" : (location.includes("View")) ? "ModalView" : "AnimePost") : "No", location)

    /*
    Creando un eventListener para verificar los cambios de
    Ancho y alto (resolusion) de la ventana del navegador
    
    Paro esto uso el evento del resize de la API nativa del
    navegador Window, Este evento se activa en el momento que la
    resolusion de la ventana cambia

    Para evitar problemas de rendimiento con el evento se utilizan
    dos tecnicas Throttling (Embotellamiento) y
    Debouncing (No se que es jaja).

    Throttling se encarga de "Embotellar" bloquear la ejecucion
    cada determinado tiempo


    Debouncing se encarga de esperar a que la ventana deje de cambiar de
    tamaño (Activar el evento) para despues ejecutar el codigo.

    ----------------- De aqui para abajo es un copy paste de la documentacion de MDN generado con Copilot ------------------
    // https://developer.mozilla.org/es/docs/Web/API/Window/resize_event
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#syntax
    // https://developer.mozilla.org/en-US/docs/Web/API/Screen/width
    // https://bencentra.com/code/2015/02/27/optimizing-window-resize.html
    // https://css-tricks.com/debouncing-throttling-explained-examples/
    // https://remysharp.com/2010/07/21/throttling-function-calls
    // https://es.linkedin.com/posts/midudev_crea-una-funci%C3%B3n-debounce-en-react-en-s%C3%B3lo-activity-7048968258250526720-AEqR#:~:text=El%20%22debouncing%22%20es%20una%20t%C3%A9cnica%20que%20se,la%20actualizaci%C3%B3n%20del%20estado%20en%20un%20componente.&text=En%20lugar%20de%20eso%2C%20con%20el%20debounce%2C,por%20si%20el%20usuario%20vuelve%20a%20escribir.

    El Debouncing y el Throttling son tecnicas de optimizacion
    de eventos que se utilizan para limitar la cantidad de veces que
    se ejecuta una funcion en respuesta a un evento.

    Ambas tecnicas son utiles para mejorar el rendimiento de las
    aplicaciones web, especialmente cuando se trata de eventos
    que se activan con frecuencia, como el scroll o el resize de la
    ventana.

    La diferencia entre ambas tecnicas es la siguiente:

    Debouncing es reiniciar el timeout cada vez que se activa el evento
    y si no se activa el evento en el tiempo determinado se ejecuta el
    codigo. En este caso el timeout es de 100ms, por lo que si el evento
    se activa cada 100ms, el timeout se reinicia y no se ejecuta el
    codigo. Si el evento no se activa en 100ms, se ejecuta el codigo.

    Throttling es ejecutar el evento cada determinado tiempo

    Throttiling es mas util para eventos que se activan constantemente
    como el scroll, resize, etc. En este caso no es necesario
    ya que el evento resize no se activa constantemente, sino cada vez que
    sino cada vez que se cambia el tamaño de la ventana.
    En este caso no es necesario, pero lo dejo para aprender como se hace
    un debounce
    y un throttle.
    */
    function debounce(fn, delay) {
        // Variable declarada con let
        // Para asegurar su uso exclusivo dentro del alcance
        // de la funcion (funtion scope)
        let timer = null

        // devuelvo una funcion para que se ejecute 
        // dentro del event listener
        return function () {
            let context = this
            let args = arguments
            // Limpio el timeout si existe para
            // Reiniciarlo (Crear uno nuevo con el mismo delay)
            clearTimeout(timer)

            // Creo el timeout (Throttle Function)
            // Que le aplica a la funcion creada en el event listener
            // el contexto y los argumentos de la funcion
            // que se ejecuta dentro del event listener
            // Esto es para que la funcion no se ejecute cada vez que
            // se activa el evento resize
            // sino cada vez que se deja de activar el evento

            // El contexto es el objeto que se esta ejecutando
            // y los argumentos son los argumentos que se le pasan a la funcion

            timer = setTimeout(() => {
                // console.log("Cambio la resolusion de la ventana 1, Ancho: ", window.innerWidth, " Alto: ", window.innerHeight)
                fn.apply(context, args)
            }, delay)
        }
    }

    window.addEventListener("resize", debounce(() => {
        // console.log("Cambio la resolusion de la ventana, Ancho: ", window.innerWidth, " Alto: ", window.innerHeight)
        window.innerHeight >= 900 
            ? 
            document.documentElement.style.setProperty("--modalHeigth", "750px")
            :
            document.documentElement.style.setProperty("--modalHeigth", "540px")
    }, 100))

    return (
        <>
            <header className="nav-container">
                {/* Le paso change para actualizar la info al momento de hacer un post,put,patch,delete*/}
                <NavBar/>
            </header>
            <div className='sticky top-20 z-[1]' id='modalDiv'>
                <PopUp />
                {/* {location !== '/' ? ( (location === '/Mangas') ? <MangaPost reaload={reloadData}/> : ( (location.includes("View")) ? modalContent : <AnimePost reload={reloadData}/> ) ) : <></>} */}
            </div>
            
            <div className='Body'>
                <aside className='Display-aside'>
                    <header>
                        <h1>Agregados Recientemente</h1>
                    </header>
                    <section className='aside-cards-container'>
                        {/* Esto actualmente no tiene sentido ya que el mismo lastAdded[index] seria _ */}
                        {loading ? <Loader /> : data.map((item) => {
                            return (
                                <Link key={item.id} to={`/View/${item.type}/${item.id}`}>
                                    <Card
                                        key={item.id}
                                        data={item}
                                        cardClass={"aside-card text-sm w-[150px]"}
                                        type={item.type}
                                    />
                                </Link>
                            )
                        })}
                    </section>
                </aside>

                <main className={mainClass}>
                    {/* Aqui en route Tiene una propiedad -Atributo- component={}
                        Para Renderizar el componente,
                        Ahora mismo este renderizando un Children <Rote>Child</Route> 
                    */}
                    {
                        <>
                            {/* <Route path={"/"}>
                                <BubbleLoader />
                                <Loader />
                                <BubbleSpinner />
                            </Route> */}
                            <Route path={"/"}>
                                <Home />
                            </Route>
                            <Route path={"/Login"}>
                                <Auth />
                            </Route>
                            <Route path={"/Register"}>
                                <Auth />
                            </Route>
                            <Route
                                path={"/Mangas"}
                            >
                               <Mangas />
                            </Route>
                            <Route
                                path={"/Animes"}
                            >
                                <Anime />
                            </Route>
                            <Route path={`/View/:type/:id`}>
                                <View navigate={navigate}/>
                            </Route>
                            {/* <Route path={"/Search/:type"}>
                                {/* Deprecieado ya que de esto se encarga un componente /}
                                {loading ? <h1>Cargando...</h1> : <Search />}
                            </Route>
                            */}
                        </>
                    }
                </main>
                
            </div>
           
            <footer>
                    <section>
                        <ul>
                            <li className='footerAncor'>
                                <a 
                                    href='https://github.com/Sebaxsus' 
                                    target='_blank'
                                    referrerPolicy='no-referrer'
                                >
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <p>
                                    No Poseo los derechos de las Imagenes aqui usadas,
                                    ya que esta pagina es para uso personal y educativo.
                                </p>
                            </li>
                            <li className='footerAncor'>
                                <a
                                    href='https://portafolio-astro-phi.vercel.app/'
                                    target='_blank'
                                    referrerPolicy='no-referrer'
                                >
                                    About Me
                                </a>
                            </li>
                        </ul>
                    </section>
            </footer>
        </>
    )
}

// Remplazando el estado `change` por una funcion
// Que maneje la misma logica que usar de dependencia
// Change en el effect
// const reloadData = () => {
//     setLoading(true)

//     Promise.all([
//         mangasController.get("").catch(() => []),
//         animesController.get("").catch(() => []),
//         generosController.get().catch(() => [])
//     ]).then(([mangas, animes, generos]) => {
//         setMangasList(mangas)
//         setAnimeList(animes)
//         setLastAdded([...mangas.slice(0, 2), ...animes.slice(0, 2)])
//         setGeneros(generos)
//     }).finally(() => setLoading(false))
// }

// useEffect(() => {
//     // console.log("Effect", change)
//     setLoading(true)

//     Promise.all([
//         mangasController.get("").catch(() => []),
//         animesController.get("").catch(() => []),
//         generosController.get().catch(() => [])
//     ]).then(([mangas, animes, generos]) => {
//         setMangasList(mangas)
//         setAnimeList(animes)
//         setLastAdded([...mangas.slice(0, 2), ...animes.slice(0, 2)])
//         setGeneros(generos)
//     }).finally(() => setLoading(false))
//     // mangasController.get().then(data => {setMangasList(data);setLoading(false)})
// }, [])
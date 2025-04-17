import "./Loader.css"

export function Loader() {

    /*
        Semantica del Componente

        Como el contenedor es con un fin estetico
        no se utiliza otra etiqueta
    */
    return (
        <div
            className="loaderContainer" 
            aria-current={"step"}
            aria-label="Grafico animado indicando que esta cargando el contenido"
        >
            <svg className="loaderSvg" viewBox="0 0 48 48">
                {/* 
                    Tanto el ciclre con los atributos
                    cx, cy, r
                    Como el path En los atributos
                    M x, y
                    A rx, ry, x, y.
                    
                    Estan multiplicados por 2,
                    Por lo tanto al dividirlos en 2
                    Seguiran funcionando normal pero 
                    con Menos resolucion???/Mas Grande
                */}
                <circle
                    cx={24} cy={24} r={20}
                    stroke="currentColor"
                    strokeWidth={4}
                    fill="none"
                />
                <path
                    fill="none"
                    stroke="white"
                    strokeWidth={4}
                    d="M 4 24 A 20 20 0 0 0 6 32"
                />
            </svg>
        </div>
    )
}

export function BubbleLoader() {

    return (
        <div className="BubbleLoader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export function BubbleSpinner() {
    
    return (
        <div className="BubbleSpinner">
            <div>
                <span></span>
            </div>
            <div>
                <span></span>
            </div>
            <div>
                <span></span>
            </div>
            <div>
                <span></span>
            </div>
        </div>
    )
}

export function CompleteLoader({size=20}) {
    return (
        <svg
            height={size}
            width={size}
            viewBox="0 0 40 40"
            className="CompleteLoader"
        >
            <g>
                <circle cx="20" cy="20" r="19" stroke="green" strokeWidth="1" fill="none" />
                <line x1="10" y1="20" x2="18" y2="28" stroke="green" strokeWidth="2" />
                <line x1="18" y1="28" x2="32" y2="12" stroke="green" strokeWidth="2" />
            </g>
        </svg>       
    )
}

/*
Desgloce del SVG

viewBox
    Atributo que indica el tamaño del SVG
    en este caso es de 48 x 48

Circle

    Elemento de la libreria SVG que permite
    Crear un circulo.

    En este caso el circulo es el contenedor
    de la animacion y el fondo del loader.
    El circulo se dibuja con el atributo "cx" y "cy"
    que indican el centro del circulo y el atributo
    "r" que indica el radio del circulo.

    En este caso el circulo tiene los parametros:
    strokeWidth = 4, fill = none y stroke = currentColor
    El strokeWidth indica el grosor del borde del circulo,
    el fill indica que el circulo no tiene color de fondo
    y el stroke indica que el color del borde del circulo
    es el color actual del texto.

Path

    Elemento de la libreria SVG que permite
    Crear figuras complejas combinando varias lineas
    y curvas.

    La figura es definida con el parametro "d"
    que contiene una serie de comandos y coordenadas
    que definen la forma del path.

    En este caso, el path es un arco que se dibuja
    desde el punto (4, 24) hasta el punto (6, 32).

    El arco tiene un radio de 20 unidades y se dibuja
    en sentido contrario a las agujas del reloj.

    Los atributos/Comandos usados son:

        M = Move to y recibe dos coordenadas (x, y) para mover el cursor sin dibujar.
        A = Arc y recibe los siguientes atributos:
            rx = radio en el eje x
            ry = radio en el eje y
            x-axis-rotation = rotacion del arco
            large-arc-flag = indica si el arco es mayor a 180 grados
            sweep-flag = indica la direccion del arco (0 o 1)
            x, y = coordenadas finales del arco
    M || m = x y
        x = 4
        y = 24
    A || a = Arc rx ry x-axis-rotation large-arc-flag sweep-flag x y
        rx = 20
        ry = 20
        x-axis-rotation = 0
        large-arc-flag = 0
        sweep-flag = 0
        x = 6
        y = 32
*/

/*
    Snippet del Svg para ver como esta hecho el circle y path

<svg style="background-color: blue;width: 400px;height: 150px;" viewbox="0 0 24 24">
  <circle
      cx="12" cy="12" r="10"
      stroke="currentColor"
      stroke-width="4"
      fill="none"
  />
  <path 
    fill="none"
    d="M 2 12 A 10 10 0 0 0 3 16"
    stroke="white"
    stroke-width="4"
  />
</svg>
*/
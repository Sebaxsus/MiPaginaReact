const re = /^((https?:\/\/)|www\.)[a-zA-Z0-9-]{3,192}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?$|^(\/[\w\-./]{3,192})$|^(data:image\/(webp|png|jpeg|jpg|gif);base64,[a-zA-Z0-9+/=]+)$/gi

export function validateURL(url = "") {
    
    return re.test(url)
}

/*
    El patron de la expresion regular de arriba se compone de 3 grupos distintos

    1. ^((https?:\/\/)|www\.)[a-zA-Z0-9-]{3,192}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?$

        Se encarga de verificar que empiece con http o https seguido de ://
        seguido de minimo 3 letras o numeros y maximo 192 letras o numeros
        Luego verifica que contenga un dominio de minimo dos letras y si tiene
        otro subdominio verifica que sea de minimo dos letras.

    2. ^(\/[\w\-./]{3,192})$

        Se encarga de verificar que empiece con el simbolo / seguido de minimo 3
        letras, guiones (-), puntos (.) o slash (/) y maximo de 192.
    
    3. ^(data:image\/(webp|png|jpeg|jpg|gif);base64,[a-zA-Z0-9+/=]+)$

        Se encarga de verificar que empiece por data:imaga seguido de un slash (/)
        seguido de cualquiera de las siguientes extensiones (webp|png|jpeg|jpg|gif)
        seguido de punto y como (;) seguido de base64, seguido de cualquier letra, numero
        simbolo mas (+), slash (/) o simbolo igual (=).
    
    Desgloce del los simbolos del patron

        ^: Simboliza el inicio de una cadena de texto

        (): Demarca un grupo de captura

        ?: Simboliza el hecho de que puede estar o no el caso anterior (Que puede estar o no ese match)

        \: Simbolo de escape para usar simbolos que estan reservados para algun caso

        |: Operador logico AND (Mientras se cumpla alguna de las dos hay un match)

        []: Demarcar una clase de caracteres especifica de captura (Letras minusculas [a-z])

        -: Rango entre uno - otro a-x

        {}: Demarca un rango de busqueda en una cadena {min,max} (Es decir si quiero que sea minimo 3 letras despues de / y un maximo de 2000 uso \/[a-z]{3,2000})

        $: Simboliza el final de una cadena de texto

        \w: Simboliza cualquier caracter de una palabra (Es lo mismo que [a-zA-Z0-9_])

        +: Simboliza emparejar uno o infinitas veces el caso de emparejamiento anterior

        gi: Se descompone en dos flags (banderas, condiciones, accionadores)

            g: global, Don't return after first match

            i: insensitive, No importa si es minuscula o mayuscula
*/
// validateURL("/hola.jpg")

// validateURL("http://hola")
// validateURL("http://hola.co")
// validateURL("http://hola.com")

// validateURL("https://hola")
// validateURL("https://hola.co")
// validateURL("https://hola.com")

// validateURL("http://hola")
// validateURL("data:image/webp;base64,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")
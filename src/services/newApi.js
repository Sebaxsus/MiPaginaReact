import axios from "axios"

const BASE_URL = "http://localhost:3000"

// Cuando halla el error que esta al final del documento
// Y esté configurado CORS | Hay que revisar la url de conexion 🤣😢


/*
            ############## IMPORTANTE!!!!!

    No se estan teniendo en cuenta los codigos de respuesta del servidor

    Ya que puedo recuperar el codigo de respuesta con el metodo .status()
*/

export class mangasController {

    static async getMangas (title) {
        try {
            const res = await axios.get(`${BASE_URL}/mangas`)
            // const data = res.data.filter((manga) => {
            //     if (manga.title.toLowerCase().includes(title)) return manga
            // })
            const data = res.data
            return data
        } catch (err) {
            console.error("Fallo el get Mangas: ", err)
            return err
        }
    }
    
    static async postManga (body = {}) {
        //console.log("data Post Manga: ", body)
        try {
            const res = await axios.post(`${BASE_URL}/mangas`, body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return res
        } catch (err) {
            console.error(`Fallo el post Manga: `, err)
            return err
        }
    }
    
    static async deleteManga ({ id }) {
        // console.log(id)
        try {
            const res = await axios.delete(`${BASE_URL}/mangas/${id}`)
            return res
        } catch (err) {
            console.error("Fallo el delete Manga: ", err)
            return err
        }
    }
    
    static async updateManga ({ id, body}) {
        // console.log(id, body)
        try {
            const res = await axios.patch(`${BASE_URL}/mangas/${id}`, body, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            return res
        } catch (err) {
            console.error("Fallo el PATCH Manga: ", err)
            return err
        }
    }

}

export class animesController {

    static async getAnimes ({ title }) {
        try {
            const res = await axios.get(`${BASE_URL}/animes`)
            console.log("Codigo de respuesta: ",res.status, " Headers: ", res.headers)
            // const data = res.data
            // return data
            return res.data
        } catch (e) {
            console.error("Fallo el metodo get Anime, Error: ", e)
            return e
        }
    }

    static async getById ({ id }) {
        try {
            const res = await axios.get(`${BASE_URL}/animes/${id}`)
            return res.data
        } catch (e) {
            console.error("Fallo el GET ID Anime, Error: ", e)
            return e
        }
    }

    static async postAnime ({ body = {}}) {
        if (body.length === undefined) {
            console.error(
                "El metodo postAnime no esta recibiendo un body o esta vacio\nBody: ",
                body,
            )
            return new Error("El metodo postAnime no recibio ningun dato")
        }

        try {
            const res = await axios.post(`${BASE_URL}/animes`, body, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
        } catch (e) {
            console.error("Fallo el metodo POST anime, Error: ", e)
            return e
        }
    }

    static async deleteAnime({ id }) {
        try {
            const res = await axios.delete(`${BASE_URL}/animes/${id}`)
            if (res.status === 204) {
                console.log("Se elimino el anime con exito!: ",res.headers)
            }
            return res
        } catch (e) {
            console.error("Fallo el metodo DELETE anime, Error: ", e)
            return e
        }
    }

    static async updateAnime ({id, body = {}}) {
        if (body.length === undefined) {
            console.error(
                "El metodo updateAnime no esta recibiendo un body o esta vacio\nbody: ",
                body,
            )
            return new Error("El metodo updateAnime no recibio ningun dato")
        }

        try {
            const res = await axios.patch(`${BASE_URL}/animes/${id}`, body, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            return res.data
        } catch (e) {
            console.error("Fallo el PATCH Anime, Error: ", e)
            return e
        }
    }
}
/*
newApi.js:82 Fallo el metodo get Anime, Error:  
AxiosError {message: 'Network Error', name: 'AxiosError', code: 'ERR_NETWORK', config: {…}, request: XMLHttpRequest, …}
code
: 
"ERR_NETWORK"
config
: 
adapter
: 
(3) ['xhr', 'http', 'fetch']
allowAbsoluteUrls
: 
true
data
: 
undefined
env
: 
{FormData: ƒ, Blob: ƒ}
headers
: 
AxiosHeaders {Accept: 'application/json, text/plain, * / *, Content-Type: undefined}
maxBodyLength
: 
-1
maxContentLength
: 
-1
method
: 
"get"
timeout
: 
0
transformRequest
: 
[ƒ]
transformResponse
: 
[ƒ]
transitional
: 
{silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false}
url
: 
"http://localhost:300/animes"
validateStatus
: 
ƒ validateStatus(status)
xsrfCookieName
: 
"XSRF-TOKEN"
xsrfHeaderName
: 
"X-XSRF-TOKEN"
[[Prototype]]
: 
Object
message
: 
"Network Error"
name
: 
"AxiosError"
request
: 
XMLHttpRequest {m_isAborted: false, onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, …}
stack
: 
"AxiosError: Network Error\n    at XMLHttpRequest.handleError (http://localhost:5173/node_modules/.vite/deps/axios.js?v=362e8310:1580:14)\n    at Axios.request (http://localhost:5173/node_modules/.vite/deps/axios.js?v=362e8310:2108:41)\n    at async animesController.getAnimes (http://localhost:5173/src/services/newApi.js:76:25)\n    at async Promise.all (index 1)"
[[Prototype]]
: 
Error
getAnimes	@	newApi.js:82
await in getAnimes		
(anonymous)	@	app.jsx?t=1743403913253:99



*/
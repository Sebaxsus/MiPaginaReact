import axios from "axios"

const BASE_URL = "http://localhost:3000"

// Cuando halla el error que esta al final del documento
// Y esté configurado CORS | Hay que revisar la url de conexion 🤣😢


/*
            ############## IMPORTANTE!!!!!

    No se estan teniendo en cuenta los codigos de respuesta del servidor

    Ya que puedo recuperar el codigo de respuesta con el metodo .status()

    Al Obtner un error por parte de la peticion, Axios genera un Objeto de Error
    Llamado AxiosError el cual posee varias propiedades de Objeto.
    
    Para devolver la respuesta del servido debo acceder a la Propiedad "response"

*/

export class mangasController {

    static async get (title) {
        try {
            const res = await axios.get(`${BASE_URL}/mangas`)
            // const data = res.data.filter((manga) => {
            //     if (manga.title.toLowerCase().includes(title)) return manga
            // })
            const data = res.data
            return data
        } catch (err) {
            console.error("Fallo el get Mangas: ", err)
            // Para devolver la respuesta del servido debo acceder a la Propiedad "response"
            // Del objeto AxiosError, Ver el objeto Axios Error mas Abajo.
            return err.response
        }
    }

    static async getById ({ id }) {
        try {
            const res = await axios.get(`${BASE_URL}/mangas/${id}`)
            return res.data
        } catch (e) {
            console.log("Fallo el get Manga By Id, Error: ", e)
            return e.response
        }
    }
    
    static async post (body = {}) {
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
    
    static async delete ({ id }) {
        // console.log(id)
        try {
            const res = await axios.delete(`${BASE_URL}/mangas/${id}`)
            return res
        } catch (err) {
            console.error("Fallo el delete Manga: ", err)
            return err.response
        }
    }
    
    static async update ({ id, body}) {
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
            return err.response
        }
    }

}

export class animesController {

    static async get ({ title }) {
        try {
            const res = await axios.get(`${BASE_URL}/animes`)
            console.log("Codigo de respuesta: ",res.status, " Headers: ", res.headers)
            // const data = res.data
            // return data
            return res.data
        } catch (e) {
            console.error("Fallo el metodo get Anime, Error: ", e)
            // Para devolver la respuesta del servido debo acceder a la Propiedad "response"
            // Del objeto AxiosError, Ver el objeto Axios Error mas Abajo.
            return e.response
        }
    }

    static async getById ({ id }) {
        try {
            const res = await axios.get(`${BASE_URL}/animes/${id}`)
            return res.data
        } catch (e) {
            console.error("Fallo el GET ID Anime, Error: ", e)
            // Para devolver la respuesta del servido debo acceder a la Propiedad "response"
            // Del objeto AxiosError, Ver el objeto Axios Error mas Abajo.
            return e.response
        }
    }

    static async post ({ body = {}}) {
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
            return res
        } catch (e) {
            console.error("Fallo el metodo POST anime, Error: ", e)
            // Para devolver la respuesta del servido debo acceder a la Propiedad "response"
            // Del objeto AxiosError, Ver el objeto Axios Error mas Abajo.
            return e.response
        }
    }

    static async delete({ id }) {
        try {
            const res = await axios.delete(`${BASE_URL}/animes/${id}`)
            if (res.status === 204) {
                console.log("Se elimino el anime con exito!: ",res.headers)
            }
            return res
        } catch (e) {
            console.error("Fallo el metodo DELETE anime, Error: ", e)
            // Para devolver la respuesta del servido debo acceder a la Propiedad "response"
            // Del objeto AxiosError, Ver el objeto Axios Error mas Abajo.
            return e.response
        }
    }

    static async update ({id, body = {}}) {
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
            // Para devolver la respuesta del servido debo acceder a la Propiedad "response"
            // Del objeto AxiosError, Ver el objeto Axios Error mas Abajo.
            return e.response
        }
    }
}

export class generosController {
    static async get () {
        try {

            const res = await axios.get(`${BASE_URL}/generos`)

            return res.data
            
        } catch (e) {
            console.error("Fallo el get Generos: ", e)
            // Para devolver la respuesta del servido debo acceder a la Propiedad "response"
            // Del objeto AxiosError, Ver el objeto Axios Error mas Abajo.
            return e.response
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

// ################# OBJETO AXIOS ERROR
/*
{
    "message": "Request failed with status code 400",
    "name": "AxiosError",
    "stack": "AxiosError: Request failed with status code 400\n    at settle (http://localhost:5173/node_modules/.vite/deps/axios.js?v=362e8310:1218:12)\n    at XMLHttpRequest.onloadend (http://localhost:5173/node_modules/.vite/deps/axios.js?v=362e8310:1550:7)\n    at Axios.request (http://localhost:5173/node_modules/.vite/deps/axios.js?v=362e8310:2108:41)\n    at async animesController.postAnime (http://localhost:5173/src/services/newApi.js:111:25)\n    at async handleSubmit (http://localhost:5173/src/pages/Animes/AnimePost.jsx?t=1743576801757:78:25)",
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http",
            "fetch"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, * / *",
            "Content-Type": "application/json"
        },
        "method": "post",
        "url": "http://localhost:3000/animes",
        "data": "{\"title\":\"One Piece\",\"desc\":\"Esta historia se sitúa en el momento más álgido de la Gran Era de los Piratas, cuando el joven Monkey D. Luffy quiere llegar a ser el Rey de los Piratas y hacerse al fin con un legendario tesoro, el One Piece.\",\"img\":\"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTfccULK6AgKWW9SVSfl-ignZFu2ArX-sw5a-wgo55lnDdEXEbDpk3WYmwEMhc67Dud5ZswhqOuRrCeGOxyuY1DJqbiD5vI8Ru8-A2eUDtwjQ\",\"genre\":[\"Action\",\"Adventure\",\"Comedy\",\"Fantasy\"]}",
        "allowAbsoluteUrls": true
    },
    "request": {
        "m_isAborted": false
    },
    "response": {
        "data": {
            "message": "Error!, No se pudo crear el Anime",
            "error": [
                {
                    "received": "Comedy",
                    "code": "invalid_enum_value",
                    "options": [
                        "Drama",
                        "Action",
                        "Crime",
                        "Adventure",
                        "Sci-Fi",
                        "Romance",
                        "Isekai",
                        "Slice of Life"
                    ],
                    "path": [
                        "genre",
                        2
                    ],
                    "message": "Invalid enum value. Expected 'Drama' | 'Action' | 'Crime' | 'Adventure' | 'Sci-Fi' | 'Romance' | 'Isekai' | 'Slice of Life', received 'Comedy'"
                },
                {
                    "received": "Fantasy",
                    "code": "invalid_enum_value",
                    "options": [
                        "Drama",
                        "Action",
                        "Crime",
                        "Adventure",
                        "Sci-Fi",
                        "Romance",
                        "Isekai",
                        "Slice of Life"
                    ],
                    "path": [
                        "genre",
                        3
                    ],
                    "message": "Invalid enum value. Expected 'Drama' | 'Action' | 'Crime' | 'Adventure' | 'Sci-Fi' | 'Romance' | 'Isekai' | 'Slice of Life', received 'Fantasy'"
                }
            ]
        },
        "status": 400,
        "statusText": "Bad Request",
        "headers": {
            "content-length": "693",
            "content-type": "application/json; charset=utf-8"
        },
        "config": {
            "transitional": {
                "silentJSONParsing": true,
                "forcedJSONParsing": true,
                "clarifyTimeoutError": false
            },
            "adapter": [
                "xhr",
                "http",
                "fetch"
            ],
            "transformRequest": [
                null
            ],
            "transformResponse": [
                null
            ],
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "maxBodyLength": -1,
            "env": {},
            "headers": {
                "Accept": "application/json, text/plain, * /*",
                "Content-Type": "application/json"
            },
            "method": "post",
            "url": "http://localhost:3000/animes",
            "data": "{\"title\":\"One Piece\",\"desc\":\"Esta historia se sitúa en el momento más álgido de la Gran Era de los Piratas, cuando el joven Monkey D. Luffy quiere llegar a ser el Rey de los Piratas y hacerse al fin con un legendario tesoro, el One Piece.\",\"img\":\"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTfccULK6AgKWW9SVSfl-ignZFu2ArX-sw5a-wgo55lnDdEXEbDpk3WYmwEMhc67Dud5ZswhqOuRrCeGOxyuY1DJqbiD5vI8Ru8-A2eUDtwjQ\",\"genre\":[\"Action\",\"Adventure\",\"Comedy\",\"Fantasy\"]}",
            "allowAbsoluteUrls": true
        },
        "request": {
            "m_isAborted": false
        }
    }
    "code": "ERR_BAD_REQUEST",
    "status": 400
}
*/
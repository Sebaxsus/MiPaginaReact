import axios from "axios";

const BASE_URL = "http://localhost:3000"

export const getMangas = async (title) => {
    try {
        const res = await axios.get(`${BASE_URL}/mangas`)
        const data = res.data.filter((manga) => {
            if (manga.title.toLowerCase().includes(title)) return manga
        })

        return data
    } catch (err) {
        console.error("Fallo el get Mangas: ", err)
        throw err
    }
}

export const  postManga = async (body = {}) => {
    console.log("data Post Manga: ", body)
    try {
        const res = await axios.post(`${BASE_URL}/mangas`, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res
    } catch (err) {
        console.error(`Fallo el post Manga: `, err)
        throw err
    }
}

export default { getMangas, postManga}
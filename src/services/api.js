import axios from "axios";

const BASE_URL = "http://localhost:3000"

export const getMangas = async (title) => {
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

export const  postManga = async (body = {}) => {
    //console.log("data Post Manga: ", body)
    try {
        const res = await axios.post(`${BASE_URL}/mangas`, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res
    } catch (err) {
        console.error(`Fallo el post Manga: `, err)
        return err
    }
}

export const deleteManga = async ({ id }) => {
    console.log(id)
    try {
        const res = await axios.delete(`${BASE_URL}/mangas/${id}`)
        return res
    } catch (err) {
        console.error("Fallo el delete Manga: ", err)
        return err
    }
}

export const updateManga = async ({ id, body}) => {
    console.log(id, body)
    try {
        const res = await axios.patch(`${BASE_URL}/mangas/${id}`)
        return res
    } catch (err) {
        console.error("Fallo el PATCH Manga: ", err)
        return err
    }
}

export default { getMangas, postManga, deleteManga, updateManga }
import { AnimeModel } from "../../Models/Anime/MySQL/anime.js"
import { validateAnime, validatePartialAnime } from "../../Schemas/animeScheme.js"

export class AnimeController {

    static async getAll(req, res) {
        console.log(`Peticion GET Anime desde: ${req.header('origin')}`)
        const { title, genre, limit = 6, page = 1 } = req.query

        const offset = (parseInt(page) - 1) * parseInt(limit)

        const anime = await AnimeModel.getAll({ genre, title, limit: parseInt(limit), offset })

        if (anime instanceof Error) {
            console.error(anime)
            return res.status(500).json({message: "Error por causa desconocida " + anime.message})
        }

        const totalPages = Math.ceil(anime[1] / parseInt(limit))

        return res.status(200).json({
            data: anime[0],
            pagination: {
                currentPage: parseInt(page),
                pageSize: parseInt(limit),
                totalPages,
                totalRows: anime[1],
                hasNext: parseInt(page) < totalPages,
                hasPrevius: parseInt(page) > 1,
            }
        })
    }

    static async getById(req, res) {
        console.log(`Peticion GET by Id Anime desde: ${req.header('origin')}`)
        const { id } = req.params

        const anime = await AnimeModel.getById({id})
        // Al usar MySQL y la ID llega a ser una UUID Valida pero no esta en la base de datos
        // Retornara un Null
        //            Mensaje,               object,               true,             donde se produjo, mensaje           
        //console.log(anime.message, "\n", typeof(anime), anime instanceof Error, anime.stack, anime.message)
        if (anime instanceof Error) {
            //console.log(anime)
            return res.status(404).json({message: "Error 404, Not Found " + anime.message})
        }

        return res.status(200).json(anime)
    }

    static async create(req, res) {
        console.log(`Peticion POST Anime desde: ${req.header('origin')}`)
        const result = validateAnime(req.body)

        if (result.error) {
            return res.status(400).json({
                message: "Error!, No se pudo crear el Anime",
                code: 400,
                error: JSON.parse(result.error.message)
            })
        }

        const newAnime = await AnimeModel.create({data: result.data})
        
        if (newAnime instanceof Error) {
            return res.status(500).json({
                message: newAnime.message,
                code: 500
            })
        }

        return res.status(201).json({
            message: "Se creo el anime con exito!",
            code: 201,
            animeSaved: [newAnime],
        })
    }

    static async update(req, res) {
        console.log(`Peticion PATCH Anime desde: ${req.header('origin')}`)
        const { id } = req.params
        
        const result = validatePartialAnime(req.body)

        if (result.error) {
            return res.status(400).json({
                message: "Error!, No se pudo actualizar el Anime",
                error: JSON.parse(result.error.message)
            })
        }

        const updatedAnime = await AnimeModel.update({id: id,data: result.data})

        if (typeof(updatedAnime) === "boolean") {
            return res.status(404).json({
                message: "Error!, No se encontro el anime",
                code: 404,
            })
        }

        return res.status(200).json({
            message: "El anime se actualizo con exito",
            code: 200,
            updatedAnime: [updatedAnime],
        })
    }

    static async delete(req, res) {
        
        console.log(`Peticion DELETE Anime desde: ${req.header('origin')}`)

        const { id } = req.params

        const result = await AnimeModel.delete({id})

        if (result === false) {
            return res.status(404).json({
                message: "Error!, No se encontro el anime",
                code: 404
            })
        }

        // Aqui uso el codigo 204 No content Para indicar que el contenido se Elimino
        res.append('Delete-Status', `200 ${result} Anime Eliminado!`)
        return res.status(204).send("Anime Eliminado!")
    }

}
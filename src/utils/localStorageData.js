export function saveData({type, id, chapterViewed}) {

    const dataType = type === "Mangas" ?
        "MangaData"
        :
        "AnimeData"

    const data = JSON.parse(window.localStorage.getItem(dataType))

    if (data === null) {
        // console.log("Null", type ," Mangas?", type === "Mangas" ? true : false)

        const newData = {id, chapterViewed}
        
        window.localStorage.setItem(
            dataType,
            JSON.stringify(
                [newData]
            )
        )

        console.log("New Local Data", dataType, " Data ", newData )
        return true
    }
    // console.log("DataL:", data)
    const itemIndex = data.findIndex(item => item.id === id)

    // console.log("New data: ", newData, "Data Object: ", data)

    if (itemIndex !== -1) {

        const newData = {...data[itemIndex], chapterViewed}

        data.splice(itemIndex, 1, newData)

        window.localStorage.setItem(
            dataType,
            JSON.stringify(
                data
            )
        )

        // console.log("Updated object: ", window.localStorage.getItem("AnimeData"))

        return true
    } else {
        const newData = {id, chapterViewed}

        data.push(newData)

        window.localStorage.setItem(
            dataType,
            JSON.stringify(
                data
            )
        )

        return true
    }

}

export function resetData({ type }) {
    type === "Mangas" ? 
        window.localStorage.removeItem("MangaData")
        :
        window.localStorage.removeItem("AnimeData")
}

export function readData({ id, type }) {

    const dataType = type === "Mangas" ?
        "MangaData"
        :
        "AnimeData"

    // console.log("readAnime Id: ", id)
    const data = JSON.parse(window.localStorage.getItem(dataType))

    // console.log("Data?", data ? true : false, data)

    const filtredData = data ? data.filter(data => {return data.id === id ? data : undefined}) : []

    // console.log("filtre: ", filtredData)

    // console.log(filtredAnime.length, filtredAnime.length === 0)

    return filtredData.length === 0 ? {chapterViewed: 0} : filtredData[0]

}
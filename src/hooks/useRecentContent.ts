// import { useEffect, useState } from "react";

// import { animesController, mangasController, searchController, generosController } from "../services/newApi";

// type ContentType = "anime" | "manga" | "all"
// type Filter = {title: "", genre: number}
// export const useRecentContent = (type: ContentType,filter: Filter) => {
//     const [recent, setRecent] = useState([])
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         const controller = type === "all" ? searchController : type === "anime" ? animesController : mangasController

//         const data = controller.get(filter).then((data) => {
            
//         })

//     })

// }
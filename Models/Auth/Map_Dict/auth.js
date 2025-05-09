import crypto from "node:crypto"

// Tokens se comporta como un diccionario (clave:valor)
// Hay que tener en cuenta que no es lo mismo que un objeto
// Ya que en los objetos la clave tiene que ser un string o symbol,
// Pero en los Map (Estructura de datos [dict]) la calve puede ser 
// Cualquier tipo de dato (int, str, float, etc..)

// Tambien cuenta con metodos como `.set(), .get(), .has(), .delete(), .clear()`
// Y tienen mejor rendimiento en estructuras de datos grandes
const tokens = new Map()

export function generarToken(usuario) {
    const token = crypto.randomBytes(32).toString('hex')

    const expires = Date.now() + (3600 * 1000) // 3600 Equivale a una hora en segundos | x 1000 para poner los segundos en milisegundos (3.600.000)
    // console.log(`Entro generar token, usuario: ${usuario}, token: ${token}`)
    tokens.set(token, {usuario, expires} )
    // console.log(`Token en el dict: ${tokens.get(token)}`)
    return {
        access_token: token,
        token_type: "Bearer",
        expires_in: tokens.get(token).expires
    }

}

export function verificarToken(token) {

    const data = tokens.get(token)
    // console.log(`Token verificar: ${token}`)

    // tokens.forEach((item, key) => {
    //     console.log(key, item)
    // })
    if (!data) return null

    if (Date.now() > data.expires) {
        tokens.delete(token)
        return null
    }

    return data.usuario
}
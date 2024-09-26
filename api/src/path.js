import { dirname } from 'path'
import { fileURLToPath } from 'url'


export const __filename = fileURLToPath(import.meta.url) // nombre del archivo
export const __dirname = dirname(__filename) //ruta al archivo

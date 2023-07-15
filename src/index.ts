import 'reflect-metadata'
import app from './app'
import { AppDataSource } from './db'
import {PORT} from './config'

async function main(){
  try {
    await AppDataSource.initialize()
    console.log('Database Connected...')
    app.listen(PORT, () => console.log(`listening server on port ${PORT}`))
  } catch (error) {
    console.log(error);
  }
}

main()

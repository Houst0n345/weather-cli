#!/user/bin/env node
import { parseArgs } from './helpers/parseArgs.js'
import {printError, printHelp, printSuccess} from './services/log.service.js';
import {saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather} from "./services/api.service.js";
import {config} from "dotenv"

config()

const saveMetaData = async (key, value) => {
    try{
        await saveKeyValue(key, value)
        printSuccess(`${key} сохранён`)
    } catch (e){
        printError(e.message)
    }
}

const getForecast = async () => {
    try {
       const weather = await getWeather()
       console.log(weather)
    } catch (e) {
       if (e?.response?.status === 404){
           printError('Неверно указан город')
       } else if(e?.response.status === 401) {
           printError('Неверно указан токен')
       } else {
           printError(e.message)
       }
    }
}

const weatherCLI = async () => {
    const { h, s, t } = parseArgs(process.argv)
    if (h) return printHelp()
    if (s) return saveMetaData(TOKEN_DICTIONARY.city, s)
    if (t) return saveMetaData(TOKEN_DICTIONARY.token, t)
    return getForecast()
}

weatherCLI()


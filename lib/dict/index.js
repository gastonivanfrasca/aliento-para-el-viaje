
const ENGLISH_WORDINGS = {
    "menu": {
        "selectLanguage": "Select language",
        "languages" : {
            "english": "English",
            "spanish": "Español"
        }
    }
}

const SPANISH_WORDINGS = {
    "menu": {
        "selectLanguage": "Selecciona el idioma",
        "languages" : {
            "english": "English",
            "spanish": "Español"
        }
    }
}

const dictionaries = {
    en: ENGLISH_WORDINGS,
    es: SPANISH_WORDINGS,
}

export const getWording = (locale, path) => {
    const pathArray = path.split('.')
    let result = dictionaries[locale]
    pathArray.forEach((key) => {
        result = result[key]
    })
    return result
}

export const getDictionary = (locale) => dictionaries[locale]
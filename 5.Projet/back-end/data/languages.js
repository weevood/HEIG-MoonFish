const db = require.main.require('./app/models')
const Language = db.models.Language

const languages = {
    // TODO load full list
    'en': 'English',
    'fr': 'Francais',
    'de': 'Deutsh',
    'it': 'Italiano'
}

Object.entries(languages).forEach(([code, name]) => {
    Language.create({ code, name })
})

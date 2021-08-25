const mariadb = require('../app/models/mariadb')
const Language = mariadb.models.Language

const languages = {
    // 'aa': 'Afaraf',
    // 'ae': 'Avesta',
    // 'af': 'Afrikaans',
    // 'ak': 'Akan',
    // 'an': 'Aragonés',
    // 'av': 'авар мацӀ',
    // 'ay': 'Aymar aru',
    // 'az': 'Azərbaycan dili',
    // 'ba': 'башҡорт теле',
    // 'be': 'Беларуская',
    // 'bg': 'български език',
    // 'bi': 'Bislama',
    // 'bm': 'Bamanankan',
    // 'br': 'Brezhoneg',
    // 'bs': 'Bosanski jezik',
    // 'ca': 'Català',
    // 'ch': 'Chamoru',
    // 'co': 'Corsu',
    // 'cs': 'Česky',
    // 'cu': 'Словѣньскъ',
    // 'cv': 'чӑваш чӗлхи',
    // 'cy': 'Cymraeg',
    // 'da': 'Dansk',
    'de': 'Deutsch',
    // 'ee': 'Ɛʋɛgbɛ',
    // 'el': 'Ελληνικά',
    'en': 'English',
    // 'eo': 'Esperanto',
    // 'es': 'Español; castellano',
    // 'et': 'Eesti keel',
    // 'eu': 'Euskara',
    // 'ff': 'Fulfulde',
    // 'fi': 'Suomen kieli',
    // 'fj': 'Vosa Vakaviti',
    // 'fo': 'Føroyskt',
    'fr': 'Français',
    // 'fy': 'Frysk',
    // 'ga': 'Gaeilge',
    // 'gd': 'Gàidhlig',
    // 'gl': 'Galego',
    // 'gv': 'Ghaelg',
    // 'ho': 'Hiri Motu',
    // 'hr': 'Hrvatski',
    // 'ht': 'Kreyòl ayisyen',
    // 'hu': 'magyar',
    // 'hy': 'Հայերեն',
    // 'hz': 'Otjiherero',
    // 'ia': 'Interlingua',
    // 'id': 'Bahasa Indonesia',
    // 'ie': 'Interlingue',
    // 'ig': 'Igbo',
    // 'ik': 'Iñupiaq',
    // 'io': 'Ido',
    // 'is': 'Íslenska',
    'it': 'Italiano',
    // 'jv': 'Basa Jawa',
    // 'kg': 'KiKongo',
    // 'ki': 'Gĩkũyũ',
    // 'kj': 'Kuanyama',
    // 'kk': 'Қазақ тілі',
    // 'kl': 'Kalaallisut',
    // 'kr': 'Kanuri',
    // 'kw': 'Kernewek',
    // 'ky': 'кыргыз тили',
    // 'la': 'Latine',
    // 'lb': 'Lëtzebuergesch',
    // 'lg': 'Luganda',
    // 'li': 'Limburgs',
    // 'ln': 'Lingála',
    // 'lo': 'ພາສາລາວ',
    // 'lt': 'Lietuvių kalba',
    // 'lu': 'tshiluba',
    // 'lv': 'Latviešu valoda',
    // 'mg': 'Fiteny malagasy',
    // 'mh': 'Kajin M̧ajeļ',
    // 'mi': 'Te reo Māori',
    // 'mk': 'македонски јазик',
    // 'mn': 'Монгол',
    // 'mt': 'Malti',
    // 'na': 'Ekakairũ Naoero',
    // 'nb': 'Norsk bokmål',
    // 'nd': 'isiNdebele',
    // 'ng': 'Owambo',
    // 'nl': 'Nederlands',
    // 'nn': 'Norsk nynorsk',
    // 'no': 'Norsk',
    // 'nr': 'Ndébélé',
    // 'nv': 'Diné bizaad',
    // 'ny': 'ChiCheŵa',
    // 'oc': 'Occitan',
    // 'om': 'Afaan Oromoo',
    // 'os': 'Ирон ӕвзаг',
    // 'pl': 'Polski',
    // 'pt': 'Português',
    // 'qu': 'Runa Simi',
    // 'rm': 'Rumantsch grischun',
    // 'rn': 'kiRundi',
    // 'ro': 'Română',
    // 'ru': 'русский язык',
    // 'rw': 'Kinyarwanda',
    // 'sc': 'sardu',
    // 'se': 'Davvisámegiella',
    // 'sg': 'Yângâ tî sängö',
    // 'sk': 'Slovenčina',
    // 'sl': 'Slovenščina',
    // 'sn': 'chiShona',
    // 'so': 'Soomaaliga',
    // 'sq': 'Shqip',
    // 'sr': 'српски језик',
    // 'ss': 'SiSwati',
    // 'st': 'seSotho',
    // 'su': 'Basa Sunda',
    // 'sv': 'Svenska',
    // 'sw': 'Kiswahili',
    // 'tk': 'Türkmen',
    // 'tl': 'Tagalog',
    // 'tn': 'seTswana',
    // 'to': 'faka Tonga',
    // 'tr': 'Türkçe',
    // 'ts': 'xiTsonga',
    // 'tw': 'Twi',
    // 'vo': 'Volapük',
    // 'wa': 'Walon',
    // 'wo': 'Wollof',
    // 'xh': 'isiXhosa',
    // 'yo': 'Yorùbá',
    // 'za': 'Saɯ cueŋƅ',
    // 'zu': 'isiZulu'
}

Object.entries(languages).forEach(([code, name]) => {
    Language.create({ code, name })
})

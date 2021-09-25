const mariadb = require('../app/models/mariadb')
const Project = mariadb.models.Project
const Resource = mariadb.models.Resource
const Trans = mariadb.models.ProjectTranslation
const faker = require('faker')
const neo4j = require('../config/neode')
const uuid = require('uuid')
const {
    PROJECT_STATUS_ABANDONED,
    PROJECT_STATUS_PROPOSAL,
    PROJECT_STATUS_ONGOING
} = require('../app/models/enums/projectStatus')

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const allTags = ['.NET', 'AMOS BASIC', 'AMPL', 'ANS Forth', 'ANSI Common Lisp', 'ActionScript', 'Ada', 'Agda', 'Alma-0',
    'Amiga E', 'AppleScript', 'AspectJ', 'Ballerina', 'Boo', 'Delphi', 'Pascal', 'Bosque', 'Brainfuck', 'C#', 'C++',
    'Ceylon', 'Chapel', 'Claire', 'Clojure', 'Cobra', 'CoffeeScript', 'ColdFusion', 'Crystal', 'Cuneiform', 'Curl',
    'D', 'Dafny', 'DarkBasic', 'Dart', 'Dylan', 'E', 'ECMAScript', 'Elixir', 'Elm', 'EuLisp', 'Euphoria', 'F#',
    'F-Script', 'Factor', 'Fantom', 'Fortran', 'Fortress', 'FreeBASIC', 'GDScript', 'GNU E', 'Gambas', 'Genie',
    'Go', 'Gosu', 'Groovy', 'Hack', 'Harbour', 'Haskell', 'Haxe', 'Hopscotch', 'ISLISP', 'Idris', 'Io', 'J', 'Java',
    'JavaScript', 'Join Java', 'Joy', 'Julia', 'K', 'Kotlin', 'LOLCODE', 'Lasso', 'Little b', 'LiveCode', 'LiveScript',
    'Logtalk', 'Lua', 'Mercury', 'Nemerle', 'NetRexx', 'NewtonScript', 'Nim', 'OCaml', 'Oberon-07', 'Oberon-2',
    'Object Oberon', 'Opa', 'OptimJ', 'Oxygene', 'Oz', 'P', 'P4', 'PHP', 'PWCT', 'Parasail', 'Perl', 'Pico', 'Pike',
    'PowerShell', 'Processing', 'Pure', 'PureBasic', 'PureScript', 'Python', 'Q', 'QB64', 'R', 'RAPID', 'REBOL',
    'Racket', 'Raku', 'Reason', 'Red', 'Ruby', 'Rust', 'S-Lang', 'Sather', 'Scala', 'Scratch', 'Seed7', 'Squeak',
    'Squirrel', 'Subtext', 'Swift', 'Swift', 'Tea', 'Transcript', 'TypeScript', 'UnrealScript', 'VBScript', 'Vala',
    'Visual Basic', 'Whiley', 'Xojo', 'Z Shell', 'ZPL', 'Zig']

const projects = [];
for (let i = 1; i <= process.env.RELDB_NB_OF_SEEDS; i++) {
    const tags = [], resources = []
    const status = random(PROJECT_STATUS_PROPOSAL, PROJECT_STATUS_ABANDONED)
    for (let j = 0; j <= random(0, 4); j++)
        tags.push(allTags[random(0, allTags.length - 1)])
    for (let j = 0; j <= random(0, 2); j++)
        resources.push({
            name: (!j && status > PROJECT_STATUS_ONGOING ? '[Feedback] ' : '') + faker.system.commonFileName(),
            link: faker.internet.url(),
            type: faker.system.commonFileType(),
            privacy: random(0, 1) ? 'public' : 'private',
            authorId: 1
        })
    projects.push({
        resources,
        project: {
            id: i,
            uuid: uuid.v4(),
            status: status,
            deadline: status <= PROJECT_STATUS_ONGOING ? faker.date.future() : faker.date.past(),
            tags: JSON.stringify(tags)
        },
        trans: [
            {
                projectId: i,
                lang: 'en',
                title: 'Project ' + faker.lorem.word(),
                description: faker.commerce.productDescription()
            }
        ]
    })
}

return new Promise(async (resolve, reject) => {
    try {
        await neo4j.deleteAll('Project').then((() => {
            projects.forEach((project) => {
                try {
                    Project.create(project.project)
                        .then((item) => {
                            if (project.resources)
                                project.resources.forEach(resource => {
                                    resource.projectId = item.id
                                    try {
                                        Resource.create(resource)
                                    } catch (e) {
                                    }
                                })
                        })
                        .then(() => {
                            for (const trans of project.trans)
                                Trans.create(trans)
                        })
                        .then(() => {
                            neo4j.create('Project', project.project)
                        })
                } catch (err) {
                    console.error(err)
                }
            })
            resolve()
        }))
    } catch (error) {
        reject(error)
    }
})

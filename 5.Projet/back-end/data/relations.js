const { getNodes } = require('../app/middleware/db')
const { findTeamsNodes } = require('../app/controllers/teams/helpers')
const { findProjectsNodes } = require('../app/controllers/projects/helpers')
const { STATUS_ACTIVE } = require("../app/models/enums/status");

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

getNodes('User').then(users => {
    findTeamsNodes().then(teams => {
        findProjectsNodes().then(projects => {

            let max = (users.length - 1)

            // isMemberOf
            for (const team of teams) {
                let u1 = random(0, max)
                let u2 = random(0, max)
                let u3 = random(0, max)
                users[u1].relateTo(team, 'isMemberOf', { isOwner: true, status: STATUS_ACTIVE })
                if (u1 !== u2)
                    users[u2].relateTo(team, 'isMemberOf', { isOwner: false, status: STATUS_ACTIVE })
                if (u1 !== u3 && u2 !== u3)
                    users[u2].relateTo(team, 'isMemberOf', { isOwner: false })
            }

            // arbitrates
            users[random(0, max)]
                .relateTo(projects[random(0, max)], 'arbitrates', { type: 'mediate', status: 'done' })

            max = (teams.length - 1)
            for (const project of projects) {
                // mandates
                let t1 = random(0, max)
                teams[t1].relateTo(project, 'mandates', { endDate: new Date(), mark: random(1, 10) })
                // applies
                let t2 = random(0, max)
                while (t1 === t2)
                    t2 = random(0, max)
                teams[t2].relateTo(project, 'applies', { price: random(1, 100000), specifications: random(1, 500) })
                let t3 = random(0, max)
                if (t1 !== t3 && t2 !== t3)
                    teams[t3].relateTo(project, 'applies', { price: random(1, 100000), specifications: random(1, 500) })
                // develops
                let t4 = random(t2, t3)
                if (t4 !== t1)
                    teams[t4].relateTo(project, 'develops')
            }
        })
    })
})

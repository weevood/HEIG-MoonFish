module.exports = {

    uuid: {
        primary: true,
        type: 'uuid',
        required: true,
    },

    tags: {
        type: 'string',
    },

    isMemberOf: {
        type: 'relationship',
        relationship: 'IS_MEMBER_OF',
        target: 'Team',
        direction: 'out',
        properties: {
            since: {
                type: 'localdatetime',
                required: true,
                default: () => new Date,
            },
            isOwner: {
                type: 'boolean',
                required: true,
                default: false,
            },
        },
    },

    arbitrates: {
        type: 'relationship',
        relationship: 'ARBITRATES',
        target: 'Project',
        direction: 'out',
        properties: {
            date: {
                type: 'localdatetime',
                required: true,
                default: () => new Date,
            },
            type: {
                type: 'string',
                required: true
            },
            status: {
                type: 'string',
                required: true
            },
        },
    },

    createdAt: {
        type: 'datetime',
        default: () => new Date,
    }

};

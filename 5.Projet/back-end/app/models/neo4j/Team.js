module.exports = {

    uuid: {
        primary: true,
        type: 'uuid',
        required: true,
    },

    name: {
        type: 'string',
        index: true,
        unique: true,
    },

    status: {
        type: 'integer',
        required: true,
    },

    mandates: {
        type: 'relationship',
        relationship: 'MANDATES',
        target: 'Project',
        direction: 'out',
        properties: {
            publishDate: {
                type: 'localdatetime',
                required: true,
                default: () => new Date,
            },
            endDate: {
                type: 'localdatetime',
            },
            mark: {
                type: 'integer',
            },
            feedback: {
                type: 'string'
            },
        },
    },

    applies: {
        type: 'relationship',
        relationship: 'APPLIES',
        target: 'Project',
        direction: 'out',
        properties: {
            date: {
                type: 'localdatetime',
                required: true,
                default: () => new Date,
            },
            price: {
                type: 'integer',
                required: true
            },
            specifications: {
                type: 'string',
                required: true
            },
        },
    },

    develops: {
        type: 'relationship',
        relationship: 'DEVELOPS',
        target: 'Project',
        direction: 'out',
        properties: {
            startDate: {
                type: 'localdatetime',
                required: true,
                default: () => new Date,
            },
            endDate: {
                type: 'localdatetime',
            }
        },
    },

    createdAt: {
        type: 'datetime',
        default: () => new Date,
    }

};

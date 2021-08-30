const { RELATION_MANDATES, RELATION_DEVELOPS, RELATION_APPLIES } = require('../enums/relations')

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

    color: {
        type: 'string',
        default: 'blue',
    },

    grade: {
        type: 'float',
        default: 0.0,
    },

    status: {
        type: 'integer',
        required: true,
    },

    mandates: {
        type: 'relationship',
        relationship: RELATION_MANDATES,
        target: 'Project',
        direction: 'out',
        properties: {
            publishDate: {
                type: 'datetime',
                required: true,
                default: () => new Date,
            },
            endDate: {
                type: 'datetime',
            },
            mark: {
                type: 'integer',
            },
            feedback: {
                type: 'integer'
            },
        },
    },

    applies: {
        type: 'relationship',
        relationship: RELATION_APPLIES,
        target: 'Project',
        direction: 'out',
        properties: {
            date: {
                type: 'datetime',
                required: true,
                default: () => new Date,
            },
            price: {
                type: 'integer',
                required: true
            },
            specifications: {
                type: 'integer',
                required: true
            },
        },
    },

    develops: {
        type: 'relationship',
        relationship: RELATION_DEVELOPS,
        target: 'Project',
        direction: 'out',
        properties: {
            startDate: {
                type: 'datetime',
                required: true,
                default: () => new Date,
            },
            endDate: {
                type: 'datetime',
            }
        },
    },

    createdAt: {
        type: 'datetime',
        default: () => new Date,
    }

};

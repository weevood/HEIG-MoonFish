const { RELATION_IS_MEMBER_OF, RELATION_ARBITRATES } = require('../enums/relations')
const { STATUS_INACTIVE } = require('../enums/status')

module.exports = {

    uuid: {
        primary: true,
        type: 'uuid',
        required: true,
    },

    tags: 'string',

    createdAt: {
        type: 'datetime',
        default: () => new Date,
    },

    isMemberOf: {
        type: 'relationship',
        relationship: RELATION_IS_MEMBER_OF,
        target: 'Team',
        direction: 'out',
        properties: {
            since: {
                type: 'datetime',
                required: true,
                default: () => new Date,
            },
            isOwner: {
                type: 'boolean',
                required: true,
                default: false,
            },
            status: {
                type: 'integer',
                required: true,
                default: STATUS_INACTIVE,
            }
        },
    },

    arbitrates: {
        type: 'relationship',
        relationship: RELATION_ARBITRATES,
        target: 'Project',
        direction: 'out',
        properties: {
            date: {
                type: 'datetime',
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
            }
        },
    }

};

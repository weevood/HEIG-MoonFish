module.exports = {

    uuid: {
        primary: true,
        type: 'uuid',
        required: true,
    },

    status: {
        type: 'string',
        required: true,
    },

    deadline: {
        type: 'localdatetime',
        required: true,
    },

    tags: {
        type: 'string',
    },

    createdAt: {
        type: 'datetime',
        default: () => new Date,
    }

};

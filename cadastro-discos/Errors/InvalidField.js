class InvalidField extends Error {
    constructor(field) {
        super(`The field '${field}' is invalid!`)
        this.name = 'InvalidField'
        this.idError = 3
    }
}

module.exports = InvalidField
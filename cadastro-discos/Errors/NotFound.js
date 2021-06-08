class NotFound extends Error {
    constructor() {
        super("Disk not found!")
        this.name = 'NotFound'
        this.idErro = 2
    }
}

module.exports = NotFound
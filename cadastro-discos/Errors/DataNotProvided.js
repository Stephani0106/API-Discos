class DataNotProvided extends Error {
    constructor() {
        super("No data provided to update!")
        this.name = 'DataNotProvided'
        this.idError = 4
    }
}

module.exports = DataNotProvided
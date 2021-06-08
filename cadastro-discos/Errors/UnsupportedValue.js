class UnsupportedValue extends Error{
    constructor(contentType) {
        super(`Content type '${contentType}' is not supported `)
        this.name = "UnsupportedValue"
        this.idError = 1
    }
}

module.exports = UnsupportedValue
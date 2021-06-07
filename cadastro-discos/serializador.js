const unsupportedValue = require('./Erros/UnsupportedValue.js')

class serializer {
    json(data) {
        return JSON.stringify(data)
    }

    xml(data) {
        let tag = this.tagSingular

        if(Array.isArray(data)) {
            tag = this.tagPlural
            data = data.map((item) => {
                return { [this.tagSingular]: item }
            })
        }

        return jsonToXml({ [tag]: data })
    }

    serialize(data) {
        data = this.filter(data)

        if(this.contentType === 'application/json') {
            return this.json(data)
        }

        if(this.contentType === 'applicatin/xml') {
            return this.xml(data)
        }

        throw new unsupportedValue(this.contentType)
    }

    filterObject(data) {
        const newObject = {}

        this.publicFields.forEach((field) => {
            if(data.hasOwnProperty(field)) {
                newObject[field] = data[field]
            }
        })

        return newObject
    }

    filter(data) {
        if(Array.isArray(data)) {
            data = data.map(item => {
                return this.filterObject(item)
            })
        } else {
            data = this.filterObject(data)
        }

        return data
    }
}

class SerializerError extends serializer {
    constructor(contentType, extraFields) {
        super()
        this.contentType = contentType
        this.publicFields = [
            'id',
            'mensage'
        ].concat(extraFields || [])
        this.tagSingular = 'erro'
        this.tagPlural = 'erros'
    }
}

module.exports = {
    serializer: serializer,
    SerializerError: SerializerError,
    acceptedFormats: ['application/json', 'application/xml']
}
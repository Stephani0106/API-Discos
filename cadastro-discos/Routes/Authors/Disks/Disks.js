const TableDisk = require('./TableDisks.js')
const DataNotProvided = require('../../../Errors/DataNotProvided.js')
const InvalidField = require('../../../Errors/InvalidField.js')

class Disk {
    constructor({ id, name, author, year, gender, price, creationDate, updatedDate }) {
        this.id = id 
        this.name = name
        this.author = author 
        this.year = year
        this.gender = gender
        this.price = price 
        this.creationDate = creationDate  
        this.updatedDate = updatedDate       
    }

    //Validate the fields
    validate() {
        if(typeof this.name !== 'string' || this.name.length === 0) {
            throw new InvalidField('name')
        }

        if(typeof this.author !== 'string' || this.author.length === 0) {
            throw new InvalidField('author')
        }

        if(typeof this.gender !== 'string' || this.gender.length === 0) {
            throw new InvalidField('gender')
        }

        if(typeof this.price !== 'number' || this.price === 0) {
            throw new InvalidField('price')
        }
    }

    //Search for information
    async search() {
        const disk = await TableDisk.findByID(this.id)

        this.id = disk.id
        this.name = disk.name
        this.author = disk.author
        this.year = disk.year
        this.gender = disk.gender
        this.price = disk.price
        this.creationDate = disk.creationDate
        this.updatedDate = disk.updatedDate
    }

    //Forward the information that must be added
    async add() {
        this.validate()
        const result = await TableDisk.insert({
            name: this.name,
            author: this.author,
            year: this.year,
            gender: this.gender,
            price: this.price
        })

        this.id = result.id,
        this.creationDate = result.creationDate
        this.updatedDate = result.updatedDate
    }

    //Update information
    async update() {
        await TableDisk.findByID(this.id)

        const fields = ['name', 'author', 'year', 'gender', 'price']
        const dataToUpdate = {}

        fields.forEach((field) => {
            const value = this[field]

            if(typeof value === 'number') {
                dataToUpdate[field] = value
            }

            if(typeof value === 'string' && value.length > 0) {
                dataToUpdate[field] = value
            }
        })

        if(Object.keys(dataToUpdate).length === 0) {
            throw new DataNotProvided()
        }

        await TableDisk.revise(this.id, dataToUpdate)
    }

    //Forwards the reference of what should be deleted
    remove() {
        return TableDisk.delete(this.id)
    }
}

module.exports = Disk
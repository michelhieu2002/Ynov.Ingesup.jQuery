
class Operation {
    constructor(type, value) {
        this.Type = type
        this.Value = value
    }
    static GetTypeName(value) {
        switch (value) {
            case OperationType.Add: return "Additionner"
            case OperationType.Substract: return "Soustraire"
            case OperationType.Multiply: return "Multiplier"
            case OperationType.Divide: return "Diviser"
        }
    }
    static GenerateRandom() {
        let properties = Object.keys(OperationType)
        let property = properties[Math.floor(properties.length * Math.random())]

        let type = OperationType[property]
        let value = Math.ceil(Math.random() * 100)

        return new Operation(type, value)
    }
    Execute(value) {
        switch (this.Type) {
            case OperationType.Add: return value + this.Value
            case OperationType.Substract: return value - this.Value
            case OperationType.Multiply: return value * this.Value
            case OperationType.Divide: return Math.round(value / this.Value)
        }
    }
}

const OperationType = Object.freeze({
    Add: "add",
    Substract: "substract",
    Multiply: "multiply",
    Divide: "divide"
})

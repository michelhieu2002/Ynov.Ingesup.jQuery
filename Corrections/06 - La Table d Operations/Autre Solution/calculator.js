/// <reference path="operation.js" />
/// <reference path="operationPanel.js" />
/// <reference path="operationTable.js" />

class Calculator {
    constructor() {
        this.Panel = new OperationPanel()
        this.Table = new OperationTable()
    }
    RegisterOnReady() {
        this.Panel.RegisterOnReady()
        this.Table.RegisterOnReady()

        $($.proxy(this.onReady, this))
    }
    onReady() {
        $(this.Panel).on("Ajouter", (e, data) => this.onPanelAdd(e, data))
        $(this.Panel).on("Generer", (e, data) => this.onPanelGenerate(e, data))

        console.log("Calculator.onReady")
    }
    onPanelAdd(e, operation) {
        this.Table.Add(operation)
    }
    onPanelGenerate(e, data) {
        this.Table.AddMultiple(data.operations)
    }
}

let calculator = new Calculator()
calculator.RegisterOnReady()

/// <reference path="operation.js" />

class OperationPanel {
    constructor() {
    }
    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }
    onReady() {
        $("#BtnRandom").on("click", () => this.onBtnRandomClick())
        $("#BtnAdd").on("click", () => this.onBtnAddClick())
        $("#BtnGenerate").on("click", () => this.onBtnGenerateClick())

        console.log("OperationPanel.onReady")
    }
    onBtnRandomClick() {
        let operation = Operation.GenerateRandom()
        $("#OperationType").val(operation.Type)
        $("#OperationValue").val(operation.Value)
    }
    onBtnAddClick() {
        let value = $("#OperationValue").val()
        if (value === "") {
            alert("Veuillez saisir les informations.")
            return
        }

        let type = $("#OperationType").val()
        let operation = new Operation(type, parseInt(value))
        $(this).trigger("Ajouter", operation)
    }
    onBtnGenerateClick() {
        let operations = new Array()

        let number = parseInt($("#OperationNumber").val())
        for (let i = 0; i < number; i++) {
            // $(this).trigger("Ajouter", Operation.GenerateRandom())
            operations.push(Operation.GenerateRandom())
        }

        $(this).trigger("Generer", { operations: operations })
    }
}

/// <reference path="operation.js" />

class OperationTable {
    constructor() {
    }
    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }
    onReady() {
        $("#Operations > tbody").on("click", ".delete", (e) => this.onDeleteClick(e))
        $("#Operations > tbody").on("click", ".execute", (e) => this.onExecuteClick(e))

        $("#BtnExecuteAll").on("click", (e) => this.onExecuteAllClick(e))

        console.log("OperationTable.onReady")
    }
    static GetHtmlRow(type, value) {
        let html = '<tr>'
        html += '<td class="delete"><img src="img/delete.png" title="Supprimer" /></td>'
        html += '<td class="operation">' + Operation.GetTypeName(type) + '</td>'
        html += '<td class="value">' + value + '</td>'
        html += '<td class="result">&nbsp;</td>'
        html += '<td class="execute"><button>Ex&eacute;cuter</button></td>'
        html += '</tr>'
        return html
    }
    Add(operation) {
        // $("#Operations > tbody").append(OperationTable.GetHtmlRow(operation.Type, operation.Value))
        $(OperationTable.GetHtmlRow(operation.Type, operation.Value)).data("operation", operation).appendTo("#Operations > tbody")
    }
    AddMultiple(operations) {
        for (let i = 0; i < operations.length; i++) {
            this.Add(operations[i])
        }
    }
    onDeleteClick(e) {
        $(e.currentTarget).parent().nextAll('tr').each((i, e) => {
            this.Clear(e)
        })

        $(e.currentTarget).parent().remove()
    }
    Clear(row) {
        $(row).removeClass('highlight').removeData('result').children('.result').empty()
    }
    Execute(row) {
        let operation = row.addClass('highlight').data("operation")
        let previousResult = null

        if (row.prev('tr').length === 0) {
            previousResult = parseInt($("#StartValue").val())
        }
        else {
            previousResult = row.prev('tr').removeClass('highlight').data('result')
            if (previousResult === undefined) {
                alert('Veuillez exécuter les opérations précédentes')
                return
            }
        }

        let result = operation.Execute(previousResult)
        row.data('result', result).children('.result').text(result)
    }
    onExecuteClick(e) {
        let row = $(e.currentTarget).parent()
        this.Execute(row)
    }
    ExecuteAll(row) {
        this.Execute(row)

        let nextRow = row.next('tr')
        if (nextRow.length === 0) {
            return
        }

        setTimeout(() => this.ExecuteAll(nextRow), 500)
    }
    onExecuteAllClick(e) {
        $("#Operations > tbody > tr").each((i, e) => this.Clear(e))

        let row = $('#Operations > tbody > tr:first')
        this.ExecuteAll(row)
    }
}


class Dom {
    constructor() {
    }
    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }
    onReady() {
        $("#btnMenu").on("click", (e) => this.onBtnMenuClick(e))
        $("#btnValidate").on("click", $.proxy(this.onBtnValidateClick, this))
        $("#btnAdd").on("click", $.proxy(this.onBtnAddClick, this))
        $("#chkAll").on("change", $.proxy(this.onChkAllChange, this))
        $("#btnRemove").on("click", $.proxy(this.onBtnRemoveClick, this))

        console.log("Dom.onReady")
    }
    onBtnMenuClick() {
        //if ($(".menu").is(":visible")) {
        //    $(".menu").hide()
        //}
        //else {
        //    $(".menu").show()
        //}
        $(".menu").toggle()
    }
    Validate() {
        return $("select,input").removeClass("highlight").filter((i, e) => { return $(e).val() === '' }).addClass('highlight')
        //$("select,input").each((i, e) => {
        //    // debugger
        //    let isValid = $(e).val() !== ''
        //    $(e).toggleClass('highlight', !isValid)
        //})
    }
    onBtnValidateClick() {
        this.Validate()
    }
    get CurrentPerson() {
        return {
            annee: $("[name=annee]:checked").val(),
            civilite: $("#civilite").val(),
            nom: $("#nom").val(),
            prenom: $("#prenom").val(),
            date: $("#date").val(),
            email: $("#email").val(),
            stage: $("#stage").prop("checked")
        }
    }
    AddRow(person) {
        let html = '<tr>'
        html += '<td><input type="checkbox" /></td>'
        html += '<td class="annee">' + person.annee + '</td>'
        html += '<td class="civilite">' + person.civilite + '</td>'
        html += '<td class="nom">' + person.nom + '</td>'
        html += '<td class="prenom">' + person.prenom + '</td>'
        html += '<td class="date">' + person.date + '</td>'
        html += '<td class="email">' + person.email + '</td>'
        html += '<td class="stage">' + person.stage + '</td>'
        html += '</tr>'

        $("#persons > tbody").prepend(html)

        $("#chkAll").prop("checked", false)
    }
    onBtnAddClick() {
        let elems = this.Validate()
        if (elems.length > 0) {
            elems.first().focus()
            alert('Veuillez saisir tous les champs.')
            return
        }

        this.AddRow(this.CurrentPerson)
    }
    onChkAllChange() {
        let checked = $("#chkAll").prop("checked")
        $("#persons > tbody > tr > td > input:checkbox").prop("checked", checked)
    }
    onBtnRemoveClick() {
        $("#persons > tbody > tr > td > input:checkbox:checked").parent("td").parent("tr").remove()
    }
}

let dom = new Dom()
dom.RegisterOnReady()

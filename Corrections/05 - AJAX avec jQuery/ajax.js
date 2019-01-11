
class Ajax {
    constructor() {
    }
    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }
    onReady() {
        // 3.a
        this.loadImage()

        // 3.b
        $("#Id").on("change", $.proxy(this.loadImage, this))

        console.log("Ajax.onReady")
    }
    static get Url() {
        return "https://jsonplaceholder.typicode.com/photos"
    }
    // 3.a
    set ImageData(value) {
        let data = $.extend({
            title: 'N/A',
            url: 'https://via.placeholder.com/1'
        }, value)

        $(".title").text(data.title)
        $(".url").text(data.url)
        $("#Image").prop("src", data.url).prop("title", data.title)
    }
    loadImage() {
        // 3.c
        $("#Id").prop("disabled", true)

        let data = {
            id: $("#Id").val()
        }

        let onSuccess = $.proxy(function (data, status, xhr) {
            this.ImageData = data.length > 0 ? data[0] : null
        }, this)

        // 3.c
        let onComplete = $.proxy(function (xhr, status) {
            $("#Id").prop("disabled", false)
        }, this)
        // 3.c

        // 3.d
        let onError = $.proxy(function (xhr, status, error) {
            console.log(xhr.status + " - " + xhr.statusText)
        }, this)
        // 3.d

        let settings = {
            type: 'GET',
            data: data,
            dataType: 'json',
            success: onSuccess,
            complete: onComplete, // 3.c
            error: onError // 3.d
        }

        $.ajax(Ajax.Url, settings)
    }
    // 3.a
}

let ajax = new Ajax()
ajax.RegisterOnReady()

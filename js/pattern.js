
class Pattern {
    constructor() {
    }
    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }
    onReady() {
        console.log("Pattern.onReady")
        this.loadPanel()
        $("#Pattern").on("change", $.proxy(this.loadPanel, this))
    }
    static GetSelect(json, selected) {
        let html = '<select>'
        for (var property in json) {
            html += '<option value="' + property + '"'
            if (selected === property) {
                html += ' selected="selected"'
            }

            html += '>' + json[property] + '</option>'
        }

        html += '</select>'
        return html
    }
    static GetHtmlRow(step) {
        let settings = $.extend({
            if: "#FFFFFF",
            then: {
                color: "#FFFFFF",
                direction: "left"
            }
        }, step)

        let html = '<tr data-if-color="' + settings.if + '">'
        html += '<td class="if-color">' + PatternColor[settings.if] + '</td>'
        html += '<td class="then-color">' + Pattern.GetSelect(PatternColor, settings.then.color) + '</td>'
        html += '<td class="then-direction">' + Pattern.GetSelect(PatternDirection, settings.then.direction) + '</td>'
        html += '</tr>'
        return html
    }
    loadPanel() {
        // Basics
        $('.condition').show()
        let value = $('#Pattern').val() || "Simple"

        // Request
        let request = $.ajax({
            url: 'https://api.myjson.com/bins/crrrn',
            method: 'GET',
            dataType: "json"
        });

        // Done
        request.done(function (msg) {
            // Reset select
            $('#CurrentPattern > tbody > tr').remove()
            $('#Pattern > option').remove()
            
            // Process
            msg.patterns.map((e, i) => {
                if(e.name === value) {
                    $('#Pattern').append('<option selected value="' + e.name + '">' + e.name + '</option>')
                    e.steps.map((e, i) => {
                        $('#CurrentPattern').append(Pattern.GetHtmlRow(e))
                    })
                    $('#CurrentPattern').append(Pattern.GetHtmlRow(e.steps))
                } else {
                    $('#Pattern').append('<option value="' + e.name + '">' + e.name + '</option>')
                }              
            })
        });

        // Fail
        request.fail(function (jqXHR, textStatus) {
            console.log("Request failed : " + textStatus);
        });
    }
}

const PatternColor = Object.freeze({
    "#FFFFFF": "Blanc",
    "#6D9ECE": "Bleu Clair",
    "#1F5FA0": "Bleu Fonc&eacute;",
    "#6D071A": "Bordeaux",
    "#606060": "Gris",
    "#F0C300": "Jaune",
    "#000000": "Noir",
    "#FF7F00": "Orange",
    "#E0115F": "Rose",
    "#DB1702": "Rouge",
    "#008020": "Vert",
    "#7F00FF": "Violet"
})

const PatternDirection = Object.freeze({
    "left": "Gauche",
    "right": "Droite"
})

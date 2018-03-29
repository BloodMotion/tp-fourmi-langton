
class Simulation {
    constructor() {
    }
    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }
    onReady() {
        console.log("Simulation.onReady")
        $("#Reset").on("click", $.proxy(this.gridResize, this))
    }
    get Size() {
        return parseInt($("input:radio[name='size']:checked").val())
    }
    gridResize() {
        $(this).trigger("change")
    }
}

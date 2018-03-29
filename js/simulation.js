
class Simulation {
    constructor() {
    }
    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }
    onReady() {
        console.log("Simulation.onReady")
        $("#Reset").on("click", $.proxy(this.gridResize, this))
        $("#MoveForward").on("click", $.proxy(this.moveForward, this))
        $("#Start").on("click", $.proxy(this.moveStart, this))
    }
    get Size() {
        return parseInt($("input:radio[name='size']:checked").val())
    }
    gridResize() {
        $(this).trigger("reset")
    }
    moveForward() {
        $(this).trigger("run")
    }
    moveStart() {
        $(this).trigger("start")
    }
}

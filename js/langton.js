/// <reference path="ant.js" />
/// <reference path="grid.js" />
/// <reference path="pattern.js" />
/// <reference path="simulation.js" />

class Langton {
    constructor() {
        this.Pattern = new Pattern()
        this.Simulation = new Simulation()
    }
    RegisterOnReady() {
        this.Pattern.RegisterOnReady()
        this.Simulation.RegisterOnReady()

        $($.proxy(this.onReady, this))
    }
    onReady() {
        this.Grid = new Grid("Grid", this.Simulation.Size)
        this.Ant = new Ant(this.Grid.MiddleX, this.Grid.MiddleY)
        this.displayAntInfo()

        $(this.Ant).on("move", $.proxy(this.displayAntInfo, this))
        $(this.Simulation).on("reset", $.proxy(this.gridUpdate, this))
        $(this.Simulation.gridResize).on("change", $.proxy(this.gridUpdate, this))
        $(this.Simulation).on("run", $.proxy(this.moveUpdate, this))
        $(this.Simulation).on("start", $.proxy(this.moveStart, this))
        
        console.log("Langton.onReady")
    }
    displayAntInfo() {
        this.Grid.SetColor(this.Ant.X, this.Ant.Y, Ant.Color)
        $(".ant-x").html(this.Ant.X)
        $(".ant-y").html(this.Ant.Y)
        $(".ant-direction").html(this.Ant.Direction)
        $(".ant-nb-steps").html(this.Ant.NbSteps)
    }
    gridUpdate() {
        $.proxy(this.moveRun(false), this)
        this.Grid.Size = this.Simulation.Size
        this.Ant.Reset(this.Grid.MiddleX, this.Grid.MiddleY)
        $("#Start").data('state', 'run')
        $("#Start").html('D&eacute;marrer')
    }
    moveUpdate() {
        for(let i=0; i < $('#NbSteps').val(); i++) {
            $('#CurrentPattern > tbody').toArray()[0].childNodes.forEach((e, i) => {
                if(e.dataset.ifColor == this.Grid.GetColor(this.Ant.X, this.Ant.Y)) {
                    let toColor = $(e.childNodes[1]).find(":selected").val()
                    let toDirection = $(e.childNodes[2]).find(":selected").val()

                    this.Grid.SetColor(this.Ant.X, this.Ant.Y, toColor)
                    this.Ant.Turn(toDirection)
                    
                }
            })
        }
    }
    moveStart() {
        // Start & stop
        if($("#Start").data('state') === 'stop') {
            $("#Start").data('state', 'run')
            $("#Start").html('D&eacute;marrer')
            $.proxy(this.moveRun(false), this)
        } else {
            $("#Start").data('state', 'stop')
            $("#Start").html('Arreter')
            $.proxy(this.moveRun(true), this)
        }
    }
    moveRun(state) { 
        if(state) {
            this.timer = setInterval( () => {
                this.moveUpdate()
            }, $("#Interval").val())
        } else {
            clearInterval(this.timer) 
        }
    }
}

let langton = new Langton()
langton.RegisterOnReady()
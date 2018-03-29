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
        this.Grid.Size = this.Simulation.Size
        this.Ant.Reset(this.Grid.MiddleX, this.Grid.MiddleY)
    }
    moveUpdate() {
        // MOVE FORWARD WITH CONDITION
        // COLOR RESULT PREVIOUS MOVE
        for(let i=0; i < $('#NbSteps').val(); i++) {
            if(this.Grid.GetColor(this.Ant.X, this.Ant.Y) == '#FFFFFF') {
                this.Grid.SetColor(this.Ant.X, this.Ant.Y, "#000000")
                this.Ant.Turn("right")
            }
            else if(this.Grid.GetColor(this.Ant.X, this.Ant.Y) == '#000000') {
                this.Grid.SetColor(this.Ant.X, this.Ant.Y, "#FFFFFF")            
                this.Ant.Turn("left")
            }
        }
    }
    moveStart() {
        setInterval( () => {
            if(this.Grid.GetColor(this.Ant.X, this.Ant.Y) !== null)
                $.proxy(this.moveUpdate(), this)
        }, $("#Interval").val())
    }
}

let langton = new Langton()
langton.RegisterOnReady()

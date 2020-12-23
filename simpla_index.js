const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//set size of Canvas
canvas.width = innerWidth;
canvas.height = innerHeight;

class Box {
    constructor(x, y, a, b, color, velocity, position_found) {
        this.x = x
        this.y = y
        this.a = a
        this.b = b
        this.color = color
        this.velocity = velocity
        this.position_found = false
    }

    draw() {
        c.save()
        c.beginPath()
        c.rect(this.x, this.y, this.a, this.a)
        c.fillStyle = this.color
        c.fill()
        c.stroke()
        c.restore()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y

    }
}

class Container {
    constructor(x, y, a, b, color) {
        this.x = x
        this.y = y
        this.a = a
        this.b = b
        this.color = color
    }

    draw() {
        c.save()
        c.beginPath()
        c.lineWidth = 10
        c.strokeRect(this.x, this.y, this.a, this.a)
        c.restore()
    }

}


let moving_box = []
moving_box.push(new Box(20, 20, 100, 100, 'white', {x: 1, y:1}))
let container = new Container(200,200, 300, 300)
moving_box[0].draw()
container.draw()

let animationID
function animate() {

    animationID = requestAnimationFrame(animate);

    //clear canvas at begining of each animation frame
    c.fillStyle = 'rgba(30, 0, 100, 1)'
    c.fillRect(0, 0, canvas.width, canvas. height)
    container.draw() //redraw container after each clearing of canvas

    moving_box.forEach((box_element, index) => {

        //check if box is still moving or already found position
        if(box_element.position_found) {
            box_element.draw()
        } else {
            box_element.update()
        }

        //check if box is in lower left corner of container
        // if(box_element.x+box_element.a - container.x + container.a == 0 &&
        //      box_element.y+box_element.b - container.y + box_element.b == 0) {
        if(box_element.x+box_element.a - container.x + container.a == 0 ) {
            box_element.position_found=true
            console.log('hit')
        }
    })
    
} 

animate()
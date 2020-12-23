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
        this.x = (this.x + this.velocity.x)
        this.y = (this.y + this.velocity.y)

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
        c.strokeRect(this.x, this.y, this.a, this.b)
        c.restore()
    }

}


let moving_box = []
moving_box.push(new Box(20, 20, 100, 100, 'white', {x: 5, y:5}))
moving_box.push(new Box(150, 20, 100, 100, 'white', {x: 5, y:5}))
let container = new Container(canvas.width/2-450, canvas.height/2-200, 900, 400)
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

        //check if first element already finished moving
        if(index == 0 || index>0 && moving_box[index-1].position_found) {
            //check if box is still moving or already found position
            if(box_element.position_found) {
                box_element.draw()
            } else {
                box_element.update()
            }
            console.log(box_element.x + box_element.a - (container.x + container.a))
            //check if box hits border of container
            if(Math.abs(box_element.x + box_element.a - (container.x + container.a)) <=6 ||
                Math.abs(box_element.y + box_element.b - (container.y + container.b)) <=6) {
                box_element.position_found=true
            }
        } else {
            box_element.draw()
        }

        

    })
    
} 

animate()
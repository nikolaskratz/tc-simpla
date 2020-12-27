const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//set size of Canvas
canvas.width = innerWidth;
canvas.height = innerHeight;

class Box {
    constructor(x, y, a, b, color, velocity, position_found, destination) {
        this.x = x
        this.y = y
        this.a = a
        this.b = b
        this.color = color
        this.velocity = velocity
        this.position_found = position_found
        this.destination = destination
    }

    draw() {
        c.save()
        c.beginPath()
        c.rect(this.x, this.y, this.a, this.b)
        c.fillStyle = this.color
        c.fill()
        c.stroke()
        c.restore()
    }

    update(movingSpeed, secondsPassed, limit, index) {
        let x_movememt = this.velocity.x * (movingSpeed*secondsPassed)
        let y_movement = this.velocity.y * (movingSpeed*secondsPassed)

        //check if x movement is to large to detect exact hit on destination --> reduce speed
        if(x_movememt > Math.abs(x_movememt*limit) || y_movement > Math.abs(y_movement*limit)) {
            this.x += this.velocity.x
            this.y += this.velocity.y
            console.log('limit reached: ' + index+ ', x: '+this.x+', y: '+this.y+', velX: '+this.velocity.x+', velY: '+this.velocity.y)
        } else {
            this.x += this.velocity.x * (movingSpeed*secondsPassed)
            this.y += this.velocity.y * (movingSpeed*secondsPassed)
        }
        
        this.draw()
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
        c.lineWidth = 4
        c.strokeRect(this.x, this.y, this.a, this.b)
        c.restore()
    }

}

//container data
let container_width = 900
let container_height = 400
let container_position_x = canvas.width/2 - container_width/2
let container_position_y = canvas.height/2 - container_height/2

//dummy Box data
let box_width = 100
let box_height = 100
let box_position_x = 20
let box_position_y = 20

//dummy output from optimization algo (position for each element)
let element_destinations = 
    [{x: container_position_x+container_width, y: container_position_y+ container_height}, 
        {x: container_position_x+container_width-box_width, y: container_position_y+ container_height},
        {x: container_position_x+container_width-box_width*2, y: container_position_y+ container_height},
        {x: container_position_x+container_width-box_width*3, y: container_position_y+ container_height},
        {x: container_position_x+container_width-box_width*4, y: container_position_y+ container_height}]

//set up elements
let moving_box = []
moving_box.push(new Box(box_position_x, box_position_y, box_width, box_height, 'white', {x: 1, y: 1}, false, element_destinations[0]))
moving_box.push(new Box(box_position_x + box_width + 100, box_position_y, box_width, box_height, 'white', {x: 1, y: 1}, false, element_destinations[1]))
moving_box.push(new Box(box_position_x + box_width + 300, box_position_y, box_width, box_height, 'white', {x: 1, y: 1}, false, element_destinations[2]))
moving_box.push(new Box(box_position_x + box_width + 500, box_position_y, box_width, box_height, 'white', {x: 1, y: 1}, false, element_destinations[3]))
moving_box.push(new Box(box_position_x + box_width + 700, box_position_y, box_width, box_height, 'white', {x: 1, y: 1}, false, element_destinations[4]))

//calculate velocity according to final destination
moving_box.forEach((element, index) => {

    //distinguish between elements moving left or right on x axis
    let x
    let y = element.destination.y - (element.y + element.b)
    if(element.destination.x > (element.x + element.a)) {
        x = element.destination.x - (element.x + element.a)
        element.velocity.x = x/(x+y)
        element.velocity.y = y/(x+y)
    } else {
        x = (-1) * ((element.x + element.a) - element.destination.x)
        element.velocity.x = x/(Math.abs(x)+y)
        element.velocity.y = y/(Math.abs(x)+y)
    }
})

console.log('target: '+element_destinations[0].x+', '+element_destinations[0].y)

//set up container
let container = new Container(container_position_x, container_position_y, container_width, container_height)
container.draw()



let secondsPassed = 0
let oldTimeStamp = 0
let movingSpeed = 1000
let animationID
let limit = 2

function animate(timeStamp) {
    
    secondsPassed = (timeStamp - oldTimeStamp) / 1000
    oldTimeStamp = timeStamp

    //clear canvas at begining of each animation frame
    c.fillStyle = 'rgba(30, 0, 100, 1)'
    c.fillRect(0, 0, canvas.width, canvas. height)
    container.draw() //redraw container after each clearing of canvas

    moving_box.forEach((box_element, index) => {
        //check if first element already finished moving
        if(box_element.position_found == false && 
            (index == 0 || (index>0 && moving_box[index-1].position_found))) {
            // console.log(box_element.x+', '+box_element.y)
            //check if box is still moving or already found position
            if(box_element.position_found) {
                box_element.draw()
            } else {
                box_element.update(movingSpeed, secondsPassed, limit, index)
            }
        
            //check if box is close to target desitnation
            if(box_element.position_found==false && 
                (Math.abs(box_element.x + box_element.a - box_element.destination.x) <= (box_element.velocity.x* movingSpeed * secondsPassed)  ||
                 Math.abs(box_element.y + box_element.b - box_element.destination.y) <= (box_element.velocity.y* movingSpeed * secondsPassed))) {
                // console.log('object :'+index)
                limit = 0.9
            } else {
                limit = 5
            }
            //check if box is at target destination (with its lower right corner)
            if(Math.abs(box_element.x + box_element.a - box_element.destination.x) <= box_element.velocity.x ||
                Math.abs(box_element.y + box_element.b - box_element.destination.y) <= box_element.velocity.y) {
                    box_element.position_found = true
                    limit = 5
                    console.log('x: '+box_element.x+', y: '+box_element.y+', a: '+box_element.a+', b: '+box_element.b)
                }
        } else {
            box_element.draw()
        }
    })
    animationID = requestAnimationFrame(animate)

} 

animate(0.1)



// let animationID
// function animate() {

//     animationID = requestAnimationFrame(animate);

//     //clear canvas at begining of each animation frame
//     c.fillStyle = 'rgba(30, 0, 100, 1)'
//     c.fillRect(0, 0, canvas.width, canvas. height)
//     container.draw() //redraw container after each clearing of canvas
//     target.draw()

//     moving_box.forEach((box_element, index) => {

//         //check if first element already finished moving
//         if(index == 0 || index>0 && moving_box[index-1].position_found) {
//             //check if box is still moving or already found position
//             if(box_element.position_found) {
//                 box_element.draw()
//             } else {
//                 box_element.update()
//             }
        
//             //check if box is at target destination (with its lower right corner)
//             if(Math.abs(box_element.x + box_element.a - box_element.destination.x) <=4 ||
//                 Math.abs(box_element.y + box_element.b - box_element.destination.y) <=4) {
//                     box_element.position_found = true
//                     console.log('x: '+box_element.x+', y: '+box_element.y+', a: '+box_element.a+', b: '+box_element.b)
//                 }
//         } else {
//             box_element.draw()
//         }
//     })
// } 

// animate()
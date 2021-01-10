const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//set size of Canvas
canvas.width = innerWidth;
canvas.height = innerHeight;

class Box {
    constructor(name, x, y, a, b, color, velocity, position_found, destination) {
        this.name = name
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
            // console.log('limit reached: ' + index+ ', x: '+this.x+', y: '+this.y+', velX: '+this.velocity.x+', velY: '+this.velocity.y)
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

//create elements for dummy boxes

let moving_box = []
var amountOfBoxes = 5
let box_position_y = 20
let first_box_position = innerWidth/10
var fixedDistanceBetweenElements = (innerWidth-first_box_position)/amountOfBoxes 
var sumWidth = 0 //only to generate destinationX, remove once output from opt.alg is available

for(var i = 0; i<amountOfBoxes; i++) {

    //create random sizes of boxes
    let box_width = Math.floor(Math.random()*Math.floor(100)) + 100
    let box_height = Math.floor(Math.random()*Math.floor(100)) + 100
    // let box_width = 100
    // let box_height = 100
    let boxName = 'box'+i
    let box_position_x
    let destination_x
    let destination_y

    if(i==0){
        box_position_x = first_box_position*1.5
        destination_x = container_position_x+container_width //dummy --> should normally come from optimization algo
        destination_y = container_position_y+ container_height //dummy --> should normally come from optimization algo
    } else {
        // box_position_x = moving_box[i-1].x + moving_box[i-1].a + fixedDistanceBetweenElements
        box_position_x = moving_box[i-1].x + fixedDistanceBetweenElements
        destination_x = container_position_x+container_width-sumWidth //dummy --> should normally come from optimization algo
        destination_y = container_position_y+container_height //dummy --> should normally come from optimization algo
    }
    sumWidth += box_width
    
    let velocity = getVelocity(box_width, box_height, box_position_x, box_position_y, destination_x, destination_y)
    
    console.log('xdest: '+destination_x+', ydest: '+destination_y)
    console.log('x velocity: '+velocity.x+', y velocity:'+velocity.y)
    moving_box.push(new Box(
        boxName,
        box_position_x,
        box_position_y,
        box_width,
        box_height,
        "#"+((1<<24)*Math.random()|0).toString(16) ,
        velocity, 
        false, 
        {x:destination_x, y:destination_y}))
    moving_box[i].draw()
}

//calculate velocity according to final destination and initially draw elements
function getVelocity(box_width, box_height, box_position_x, box_position_y, destination_x, destination_y) {
    //distinguish between elements moving left or right on x axis
    let velocity = {x: 1, y: 1}
    let x
    let y = destination_y - (box_position_y + box_height)
    console.log('containerLowerY: '+destination_y+' vs. calcY: '+y)
    if(destination_x> (box_position_x + box_width)) {
        x = destination_x - (box_position_x + box_width)
        velocity.x = x/(x+y)
        velocity.y = y/(x+y)
    } else {
        x = (-1) * ((box_position_x + box_width) - destination_x)
        velocity.x = x/(Math.abs(x)+y)
        velocity.y = y/(Math.abs(x)+y)
    }
    return velocity
}


//set up container
let container = new Container(container_position_x, container_position_y, container_width, container_height)
container.draw()



let secondsPassed = 0
let oldTimeStamp = 0
let movingSpeed = 1500
let animationID
let limit = 2
let animationStart = true

function animate(timeStamp) {

    secondsPassed = (timeStamp - oldTimeStamp) / 1000
    oldTimeStamp = timeStamp

    //clear canvas at begining of each animation frame
    c.fillStyle = '#ccc'
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
                    // console.log('x: '+box_element.x+', y: '+box_element.y+', a: '+box_element.a+', b: '+box_element.b
                    // +', destX: '+box_element.destination.x+', destY: '+box_element.destination.y)
                }
        } else {
            box_element.draw()
        }
    })
    animationID = requestAnimationFrame(animate)

} 

// animate(0)

const generateSuggestionBtn = document.querySelector('#generateSuggestionBtn')

generateSuggestionBtn.addEventListener('click', () => {
    oldTimeStamp = window.performance.now()+0.001
    animate(window.performance.now())
})

const ModelButton = document.querySelector('#open3d')

ModelButton.addEventListener('click', () => {
    window.open("3d_container.html", "_self")
    console.log('openmodel')
})

//----------------------------------------------------------------------------------------
//Table Stuff
//----------------------------------------------------------------------------------------


moving_box.forEach((element, index) => {
    addColumn('topTable', element)

})

function addColumn(tblId, element) {
	var tblBodyObj = document.getElementById(tblId).tBodies[0]
	for (var i=0; i<tblBodyObj.rows.length; i++) {
        var newCell = tblBodyObj.rows[i].insertCell(-1)
        // newCell.innerHTML = element.name +', ' + i
        
        //set text according to row
        switch(i) {
            case 0:
                //name
                newCell.innerHTML = element.name
                break
            case 1:
                //dimensions
                newCell.innerHTML = element.a+'x'+element.b
                break
            case 2:
                //quantity
                newCell.innerHTML = 1
                break
        }
	}
}


//container dimensions
var container_width = 100
var container_height = 50
var container_depth = 55
var container_vol = container_depth*container_height*container_width

//input for  dummy elements and algorithm output (Dube et. al)
elementPos = [
    {x: -80, y: 50, z: 0},
    {x: -80, y: 50, z: 0},
    {x: -80, y: 50, z: 0},
    {x: -80, y: 50, z: 0},
    {x: -45, y: 50, z: 0},
    {x: 0, y: 50, z: 0},
    {x: 45, y: 50, z: 0},
    {x: 110, y: 50, z: 0}
]

elementDim = [
    {width: 15, height: 15, depth: 15},
    {width: 15, height: 15, depth: 15},
    {width: 15, height: 15, depth: 15},
    {width: 15, height: 15, depth: 15},
    {width: 40, height: 30, depth: 10},
    {width: 40, height: 30, depth: 10},
    {width: 35, height: 25, depth: 35},
    {width: 60, height: 20, depth: 40}
]

elementDest = [
    {x: 0, y: 0, z: 0},
    {x: 15, y: 0, z: 0},
    {x: 30, y: 0, z: 0},
    {x: 45, y: 0, z: 0},
    {x: 60, y: 0, z: 0},
    {x: 0, y: 15, z: 0},
    {x: 0, y: 0, z: 15},
    {x: 35, y: 0, z: 15}
]

elementRot = [0,0,0,0,0,0,0,0]
elementWeight = [50, 50, 50, 50, 453, 399, 629, 301]
elememntColor = [0xFFCC00, 0xff0000, 0xff8000, 0x808080, 0x00ff00, 0x00ffff, 0x0040ff, 0xff00ff]


//TODO #2
//adapt pos according to rotation factor
elementDim.forEach((elDim, index) => {
    let temp
    switch(elementRot[index]){
        case 1:
            //rotate z
            break
        case 2:
            //rotate y
            break
        case 3:
            //rotate x & y
            break
        case 4:
            //rotate x
            break
        case 5:
            //rotate x & z
            break
    }

})

//adapt destination output to match 3d model coordinate system
elementDest.forEach((dest, index) => {
    dest.x = dest.x - container_width/2 + elementDim[index].width/2
    dest.y = dest.y - container_height/2 + elementDim[index].height/2
    dest.z = dest.z - container_depth/2 + elementDim[index].depth/2 
})

let camera, controls, scene, renderer;

init()
animate()

//public vars
var movement = false
var elements = []
var infoWeight = document.getElementById('infoWeight')
var infoVolume = document.getElementById('infoVolume')
var infoAxis = document.getElementById('infoAxis')
var totalWeight = 0
var totalVolume = 0
var totalAxis = 0 //in % on left side



//element class
class Element {
    constructor(width, height, depth, posX, posY, posZ, destination, rotate, velocity, color, hit, weight) {
        this.width = width
        this.height = height
        this.depth = depth
        var geometry = new THREE.BoxGeometry(width, height, depth)
        var material = new THREE.MeshLambertMaterial({ color: color })
        var mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(posX, posY, posZ)
        this.mesh = mesh
        // elements.push(mesh)
        scene.add(mesh)
        this.destination = destination
        this.velocity = calcVelocity(width, height, depth, posX, posY, posZ, destination)
        this.hit = hit
        this.rotate = rotate
        this.weight = weight
    }

}

createElements()

function createElements() {
    for(var i=0; i<elementDim.length; i++){
        let el = new Element(
            elementDim[i].width, elementDim[i].height, elementDim[i].depth, 
            elementPos[i].x, elementPos[i].y, elementPos[i].z,
            {x: elementDest[i].x, y: elementDest[i].y, z: elementDest[i].z},
            elementRot[i],
            {x:0, y:0, z:0}, 
            elememntColor[i], 
            false,
            elementWeight[i])
        elements.push(el)
    }
}

function calcVelocity(width, height, depth, posX, posY, posZ, destination) {
    var velocity = {x:0, y:0, z:0}

    //recalculate posX, posY, posZ to match (left-lower-behind point?) of box??

    //assumption: elements are always above container (y>0), zContainer=zElement, x can be both < and >0

    // x calculation
    let xMove 
    if(posX < destination.x) {
        if(posX<0 && destination.x<0){
            xMove = Math.abs(posX) - Math.abs(destination.x)
        } else if (posX<0 && destination.x>0) {
            xMove = Math.abs(posX) + destination.x
        } else {
            xMove = destination.x - posX
        }
    } else {
        if(posX<0 && destination.x<0) {
            xMove = destination.x + Math.abs(posX)
        } else {
            xMove = destination.x-posX
        }
    }
    
    // y calculation
    let yMove = posY - destination.y

    // z calculation
    let zMove = destination.z //as z is fixed to 0

    let total = Math.abs(xMove) + Math.abs(yMove) + Math.abs(zMove)

    velocity.x = xMove/total
    velocity.y = yMove/total
    velocity.z = zMove/total

    return velocity
}

function updateInfoBoxes(element) {
    totalWeight += element.weight
    infoWeight.innerHTML = totalWeight + " kg"

    totalVolume += (element.width*element.height*element.depth)
    let usedVol = Math.round(totalVolume/container_vol*100)
    infoVolume.innerHTML = usedVol + " %"
}

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.getElementById('visualization').appendChild(renderer.domElement)

    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 50, 100);

    // controls

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 70;
    controls.maxDistance = 1000;

    controls.maxPolarAngle = Math.PI / 2;

    //container
    var geometry = new THREE.BoxGeometry(container_width, container_height, container_depth)
    var material = new THREE.MeshLambertMaterial({ color: 0x111111 })
    var mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, 0, 0)
    scene.add(mesh)
    material.blending = THREE.AdditiveBlending
    material.transparent = true

    // lights

    scene.add(new THREE.AmbientLight(0x555555));

    const light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 500, 2000);
    scene.add(light);

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);

    var speed = 2

    if(movement) {
        elements.forEach((element, index) => {
            if(index==0 || elements[index-1].hit) {

                if(element.rotate>0) {
                    // element.mesh.rotation.x +=0.05
                    // rotateAroundWorldAxis(element.mesh, xAxis, Math.PI / 180)                    
                    // console.log(element.mesh.rotation.x)
                    // this.t1 = new TimelineMax().delay(0)
                    // this.t1.to(element.mesh.rotation, 0.5, {x: Math.PI*0.5, y:Math.PI*0.5, ease: Expo.easeOut})
                    element.rotate=0


                } else if(!element.hit) {
                    // console.log('x position: '+element.mesh.position.x)
                    element.mesh.position.x += element.velocity.x*speed
                    element.mesh.position.y -= element.velocity.y*speed
                    element.mesh.position.z -= element.velocity.z*speed
        
                    //detect hit
                    let distanceY = element.mesh.position.y - element.destination.y
                    if(distanceY < (element.velocity.y*speed)) {
                        while(distanceY < (element.velocity.y*speed) && speed>0.001) {
                            speed *= 0.5
                            // console.log('speed: '+speed)
                        }
                    }
                    if(distanceY < 0.001) {
                        element.hit = true
                        updateInfoBoxes(element)
                    }
                }
            }
            
        })
    }

    controls.update();
    render();

}

var xAxis = new THREE.Vector3(1,0,0);
var yAxis = new THREE.Vector3(0,1,0);
var zAxis = new THREE.Vector3(0,0,1);
// rotateAroundWorldAxis(mesh, xAxis, Math.PI / 180);

var rotWorldMatrix;
// Rotate an object around an arbitrary axis in world space       
function rotateAroundWorldAxis(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);                // pre-multiply

    object.matrix = rotWorldMatrix;
    object.rotation.setFromRotationMatrix(object.matrix);
}

function render() {

    renderer.render(scene, camera);

}

const startMovement = document.querySelector('#startMovement')

startMovement.addEventListener('click', () => {
    if(movement) {
        movement = false
    } else {
        movement = true
    }
})



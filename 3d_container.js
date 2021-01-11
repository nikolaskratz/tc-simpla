let camera, controls, scene, renderer;

init();
// createElements()
animate();

//public vars
var movement = false
var elements = []

//element class
class Element {
    constructor(width, height, depth, posX, posY, posZ, destination, velocity, color) {
        var geometry = new THREE.BoxGeometry(width, height, depth)
        var material = new THREE.MeshLambertMaterial({ color: color })
        var mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(posX, posY, posZ)
        scene.add(mesh)
        this.destination = destination
        this.velocity = calcVelocity(width, height, depth, posX, posY, posZ, destination)
    }
}

var el = new Element(15,15,15,-100,50,0, {x:0, y:0, z:0}, {x:0, y:0, z:0}, 0xFFCC00)
elements.push(el)
// elements[0].velocity = calcVelocity(elements[0])

function calcVelocity(width, height, depth, posX, posY, posZ, destination) {
    var velocity = {x:0, y:0, z:0}

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

    console.log(element.posY)
    return velocity
}


function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 1.5, 3);

    // controls

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 100;
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI / 2;

    //container
    var geometry = new THREE.BoxGeometry(100, 50, 50)
    var material = new THREE.MeshLambertMaterial({ color: 0x111111 })
    var mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, 0, 0)
    scene.add(mesh)
    material.blending = THREE.AdditiveBlending
    material.transparent = true

    // }

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

    if(movement) {
        console.log(elements[0].position.x)
        elements[0].position.x += elements[0].velocity.x/100
        elements[0].position.y -= elements[0].velocity.y
        elements[0].position.z -= elements[0].velocity.z
        console.log('x: '+elements[0].position.x+', y: '+elements[0].position.y+', z: '+elements[0].position.z)
    }

    controls.update();
    render();

}

function render() {

    renderer.render(scene, camera);

}

const startMovement = document.querySelector('#startMovement')

startMovement.addEventListener('click', () => {
    movement=true
})

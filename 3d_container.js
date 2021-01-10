let camera, controls, scene, renderer;

init();
animate();

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(5, 5, 5);

    // controls

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 100;
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI / 2;

    // world

    //elements
    var geometry = new THREE.BoxGeometry(15, 15, 15)
    var material = new THREE.MeshLambertMaterial({ color: 0xFFCC00 })
    var mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, -17, 0)
    scene.add(mesh)

    var geometry = new THREE.BoxGeometry(15, 15, 15)
    var material = new THREE.MeshLambertMaterial({ color: 0xff00ff })
    var mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(20, -17, 0)
    scene.add(mesh)

    var geometry = new THREE.BoxGeometry(30, 15, 15)
    var material = new THREE.MeshLambertMaterial({ color: 0xFFCC00 })
    var mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(-25, -17, 17)
    scene.add(mesh)

    var geometry = new THREE.BoxGeometry(50, 15, 25)
    var material = new THREE.MeshLambertMaterial({ color: 0x4674b9 })
    var mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(-25, 5, 10)
    scene.add(mesh)

    var geometry = new THREE.BoxGeometry(30, 15, 15)
    var material = new THREE.MeshLambertMaterial({ color: 0xFFCC00 })
    var mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(-25, -17, 0)
    scene.add(mesh)

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

    controls.update();
    render();

}

function render() {

    renderer.render(scene, camera);

}

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( 800,800 );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const dvdTexture = new THREE.TextureLoader().load('DVD.png');
const dvdMaterial = new THREE.MeshBasicMaterial({ map: dvdTexture });
const geometry = new THREE.PlaneGeometry(2, 1);
const dvdScreen = new THREE.Mesh( geometry, dvdMaterial );
scene.add( dvdScreen );

dvdScreen.position.set(0, 0, 0);

camera.position.z = 5;

let dvdVelocity = new THREE.Vector2(0.05, 0.05);
let dvdPosition = new THREE.Vector2(0, 0);

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function animate() {

	dvdPosition.add(dvdVelocity);
    dvdScreen.position.set(dvdPosition.x, dvdPosition.y, 0);

	const width = 1;  
    const height = 0.5; 

	if (dvdPosition.x > (4 - width) || dvdPosition.x < (-4 + width)) {
        dvdVelocity.x = -dvdVelocity.x;
		dvdMaterial.color.set(getRandomColor());
		shrinkDVD(); 
    }
    if (dvdPosition.y > (4 - height) || dvdPosition.y < (-4 + height)) {
        dvdVelocity.y = -dvdVelocity.y;
		dvdMaterial.color.set(getRandomColor());
		shrinkDVD(); 
    }

	renderer.render( scene, camera );

}

function shrinkDVD() {
    const scaleFactor = 0.8; 
    dvdScreen.scale.x *= scaleFactor;
    dvdScreen.scale.y *= scaleFactor;

}
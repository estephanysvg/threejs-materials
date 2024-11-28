import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

// Debug UI 
const gui = new GUI()
gui.open(false);
gui.title('Materials');

/**
 * Base
*/
// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()


// Lights

// const ambientLight = new THREE.AmbientLight(0xffffff, 1)

// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4

// scene.add(pointLight)


const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (enviromentMap) => {
    enviromentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = enviromentMap
    scene.environment = enviromentMap
})



/**
 * Sizes
*/

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
*/
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
scene.add(camera)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Textures
*/

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/8.png')
const gradientTexture = textureLoader.load('./textures/gradients/5.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace
gradientTexture.colorSpace = THREE.SRGBColorSpace

// Objetos

// MeshBasicMaterial

// const material = new THREE.MeshBasicMaterial({ map: doorColorTexture})
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color('red')
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.2
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// MeshNormalMaterial

// const material = new THREE.MeshNormalMaterial()
// material.wireframe = true
// material.flatShading = true

// MeshMatCapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

//MeshDeptMaterial
// const material = new THREE.MeshDepthMaterial()

// MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial()

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial()

// gradientTexture.minFilter = THREE.NearestFilter 
// gradientTexture.magFilter = THREE.NearestFilter 
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture

// // MeshStandarMaterial
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1

// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// gui.add(material, 'aoMapIntensity').min(1).max(5).step(0.001)
// gui.add(material, 'displacementScale').min().max(1).step(0.001)

// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture

// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.alphaMap = doorAlphaTexture
// material.transparent = true
// // material.wireframe = true

// gui.add(material, 'metalness').min(0).max(2).step(0.001)
// gui.add(material, 'roughness').min(0).max(2).step(0.001)


// MeshPhisicalMaterial
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0
material.roughness = 0

// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// gui.add(material, 'aoMapIntensity').min(1).max(5).step(0.001)
// gui.add(material, 'displacementScale').min().max(1).step(0.001)

// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture

// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.alphaMap = doorAlphaTexture
// material.transparent = true
// material.wireframe = true

gui.add(material, 'metalness').min(0).max(2).step(0.001)
gui.add(material, 'roughness').min(0).max(2).step(0.001)

//Clearcoat
// material.clearcoat = 1
// material.clearcoatRoughness = 0

gui.add(material, 'clearcoat').min(0).max(1).step(0.001)
gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.001)

// // Sheen
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1, 1, 1)
gui.add(material, 'sheen').min(0).max(2).step(0.001)
gui.add(material, 'sheenRoughness').min(0).max(2).step(0.001)

// // Irisdescence
material.iridescence = 1
material.iridescenceIOR = 1
material.iridescenceThicknessRange = [100, 800]

gui.add(material, 'iridescence').min(0).max(2).step(0.001)
gui.add(material, 'iridescenceIOR').min(1).max(2).step(0.001)
gui.add(material.iridescenceThicknessRange, '0').min(0).max(1000).step(1)
gui.add(material.iridescenceThicknessRange, '1').min(0).max(1000).step(1)



// Transmission

material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, 'transmission').min(0).max(1).step(0.001)
gui.add(material, 'ior').min(0).max(10).step(0.001)
gui.add(material, 'thickness').min(0).max(1).step(0.001)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64), material
)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100), material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128), material
)

torus.position.x = 1.5

sphere.position.x = -1.5

scene.add(sphere, plane, torus)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime


    sphere.rotation.x = -0.15 * elapsedTime
    plane.rotation.x = -0.15 * elapsedTime
    torus.rotation.x = -0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
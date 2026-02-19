import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { world } from '@/experience/Experience'

class Engine {
  constructor(canvas, experience = world) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Engine requires a valid canvas element')
    }

    // Initialization
    this.canvas = canvas
    this.experience = experience
    this.isInitialized = false
    this.isRunning = false
    this.animationFrameRequestId = null
    this.scene = new THREE.Scene()

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    this.camera.position.set(0, 0, 6)

    // Orbit Controls
    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.enableDamping = true
    this.controls.enablePan = false

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.setClearColor(this.experience.backgroundColor, 1)

    // Responsive
    this.onResize = () => {
      this.resize()
    }

    // Start loop
    this.animate = this.update.bind(this)
  }

  async init() {
    if (this.isInitialized) return

    await this.experience.init(this.scene)

    this.resize()
    window.addEventListener('resize', this.onResize)

    this.isInitialized = true

    this.start()
  }

  start() {
    if (!this.isInitialized || this.isRunning) return

    this.isRunning = true
    this.update()
  }

  resize() {
    const width = this.canvas.clientWidth || window.innerWidth || 1
    const height = this.canvas.clientHeight || window.innerHeight || 1
    if (width <= 0 || height <= 0) return

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height, false)
  }

  update() {
    if (!this.isRunning) return

    this.animationFrameRequestId = requestAnimationFrame(this.animate)

    const time = performance.now()
    this.experience.update(time)
    this.renderer.setClearColor(this.experience.backgroundColor, 1)
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.isRunning = false

    if (this.animationFrameRequestId !== null) {
      cancelAnimationFrame(this.animationFrameRequestId)
      this.animationFrameRequestId = null
    }

    window.removeEventListener('resize', this.onResize)
  }
}

export { Engine }

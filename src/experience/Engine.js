import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { world } from '@/Experience/'
import { Scroll } from '@/Experience/Scroll'

class Engine {
  constructor(canvas, experience = world) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Engine requires a valid canvas element')
    }

    // Initialization
    this.canvas = canvas
    this.experience = experience
    this.debug = this.experience.debug
    this.isInitialized = false
    this.isRunning = false
    this.isDebugBound = false
    this.animationFrameRequestId = null
    this.preloadedTextures = new Map()
    this.scene = new THREE.Scene()

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    this.camera.position.set(0, 0, 6)

    // Orbit Controls
    this.orbitControlsEnabled = false
    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.enabled = this.orbitControlsEnabled
    this.controls.enableDamping = true
    this.controls.enablePan = false

    // Scroll
    this.scroll = new Scroll(this.camera, this.experience.gallery, this.debug)

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.autoClear = false

    this.onResize = () => {
      this.resize()
    }

    this.animate = this.update.bind(this)
  }

  async init() {
    if (this.isInitialized) return

    document.body.classList.add('loading')

    try {
      this.preloadedTextures = await this.preloadTextures()
      this.experience.gallery.setPreloadedTextures(this.preloadedTextures)

      await this.experience.init(this.scene, this.camera)
      this.scroll.init()
      this.bindDebug()

      this.resize()
      window.addEventListener('resize', this.onResize)
      this.scroll.bindEvents()

      this.isInitialized = true
      this.start()
    } finally {
      document.body.classList.remove('loading')
    }
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
    this.experience.gallery.updatePlaneScale()
    this.experience.gallery.layoutPlanes()
    this.experience.label.resize(width, height)
  }

  async preloadTextures() {
    const textureSources = this.experience.gallery.getTextureSources()
    if (!textureSources.length) return new Map()

    const textureLoader = new THREE.TextureLoader()
    const loadedTextures = new Map()

    await Promise.all(
      textureSources.map(async (textureSource) => {
        try {
          const texture = await textureLoader.loadAsync(textureSource)
          texture.colorSpace = THREE.SRGBColorSpace
          loadedTextures.set(textureSource, texture)
        } catch (error) {
          console.warn(`Texture failed to load: ${textureSource}`, error)
        }
      })
    )

    return loadedTextures
  }

  update() {
    if (!this.isRunning) return

    this.animationFrameRequestId = requestAnimationFrame(this.animate)

    const time = performance.now()

    this.scroll.update(this.orbitControlsEnabled)

    if (this.orbitControlsEnabled) {
      this.controls.update()
    }
    this.experience.update(time, this.camera, this.scroll)

    this.renderer.clear(true, true, true)
    this.experience.background.render(this.renderer)
    this.renderer.clearDepth()
    this.renderer.render(this.scene, this.camera)
    this.experience.label.render()
  }

  bindDebug() {
    if (!this.debug || this.isDebugBound) return

    this.debug.addBinding({
      folderTitle: 'Engine',
      targetObject: this,
      property: 'orbitControlsEnabled',
      label: 'Orbit Controls',
      onChange: (value) => {
        this.controls.enabled = value
      },
    })

    this.isDebugBound = true
  }

  dispose() {
    this.isRunning = false

    if (this.animationFrameRequestId !== null) {
      cancelAnimationFrame(this.animationFrameRequestId)
      this.animationFrameRequestId = null
    }

    window.removeEventListener('resize', this.onResize)
    this.scroll.dispose()

    this.preloadedTextures.forEach((texture) => {
      texture.dispose()
    })
    this.preloadedTextures.clear()
    this.experience.label.dispose()
    this.experience.background.dispose()
  }
}

export { Engine }

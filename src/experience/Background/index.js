import * as THREE from 'three'
import vertexShader from '@/Experience/Background/shaders/vertex.glsl'
import fragmentShader from '@/Experience/Background/shaders/fragment.glsl'

class Background {
  constructor(debug = null) {
    this.debug = debug
    this.isInitialized = false
    this.isDebugBound = false

    this.scene = null
    this.camera = null
    this.material = null
    this.mesh = null

    this.topColor = new THREE.Color('#ff0000')
    this.midColor = new THREE.Color('#00ff00')
    this.bottomColor = new THREE.Color('#0000ff')
    this.nextTopColor = new THREE.Color()
    this.nextMidColor = new THREE.Color()
    this.nextBottomColor = new THREE.Color()
    this.blobCenter = new THREE.Vector2(0.62, 0.46)
    this.blobRadius = 0.34
    this.blobStrength = 0.24
  }

  init() {
    if (this.isInitialized) return

    this.scene = new THREE.Scene()
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        uTopColor: { value: this.topColor },
        uMidColor: { value: this.midColor },
        uBottomColor: { value: this.bottomColor },
        uBlobCenter: { value: this.blobCenter },
        uBlobRadius: { value: this.blobRadius },
        uBlobStrength: { value: this.blobStrength },
      },
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    this.mesh = new THREE.Mesh(geometry, this.material)
    this.scene.add(this.mesh)
    this.setMoodColors({
      top: '#ff0000',
      mid: '#00ff00',
      bottom: '#0000ff',
    })
    this.updateBlobUniforms()
    this.bindDebug()

    this.isInitialized = true
  }

  setMoodColors({ top, mid, bottom } = {}) {
    if (top) this.topColor.set(top)
    if (mid) this.midColor.set(mid)
    if (bottom) this.bottomColor.set(bottom)

    this.updateUniformColors()
  }

  setMoodBlend({ currentMood, nextMood, blend } = {}) {
    if (!currentMood) return

    const safeBlend = THREE.MathUtils.clamp(blend ?? 0, 0, 1)
    if (!nextMood || safeBlend <= 0) {
      this.setMoodColors(currentMood)
      return
    }

    this.topColor.set(currentMood.top).lerp(this.nextTopColor.set(nextMood.top), safeBlend)
    this.midColor.set(currentMood.mid).lerp(this.nextMidColor.set(nextMood.mid), safeBlend)
    this.bottomColor
      .set(currentMood.bottom)
      .lerp(this.nextBottomColor.set(nextMood.bottom), safeBlend)

    this.updateUniformColors()
  }

  updateUniformColors() {
    if (!this.material) return

    this.material.uniforms.uTopColor.value.copy(this.topColor)
    this.material.uniforms.uMidColor.value.copy(this.midColor)
    this.material.uniforms.uBottomColor.value.copy(this.bottomColor)
  }

  updateBlobUniforms() {
    if (!this.material) return

    this.material.uniforms.uBlobRadius.value = this.blobRadius
    this.material.uniforms.uBlobStrength.value = this.blobStrength
  }

  bindDebug() {
    if (!this.debug || this.isDebugBound) return

    this.debug.addBinding({
      folderTitle: 'Background',
      targetObject: this,
      property: 'blobRadius',
      label: 'Blob Radius',
      options: {
        min: 0.05,
        max: 1,
        step: 0.01,
      },
      onChange: () => {
        this.updateBlobUniforms()
      },
    })

    this.debug.addBinding({
      folderTitle: 'Background',
      targetObject: this,
      property: 'blobStrength',
      label: 'Blob Strength',
      options: {
        min: 0,
        max: 1,
        step: 0.01,
      },
      onChange: () => {
        this.updateBlobUniforms()
      },
    })

    this.isDebugBound = true
  }

  update() {}

  render(renderer) {
    if (!this.isInitialized) return
    renderer.render(this.scene, this.camera)
  }

  dispose() {
    if (!this.isInitialized) return

    this.mesh.geometry.dispose()
    this.material.dispose()
    this.scene.clear()

    this.scene = null
    this.camera = null
    this.mesh = null
    this.material = null
    this.isInitialized = false
  }
}

export { Background }

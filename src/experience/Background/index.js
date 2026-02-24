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
    this.accentColor = new THREE.Color('#ffffff')
    this.nextTopColor = new THREE.Color()
    this.nextMidColor = new THREE.Color()
    this.nextBottomColor = new THREE.Color()
    this.nextAccentColor = new THREE.Color()
    this.blobCenter = new THREE.Vector2(0.62, 0.46)
    this.baseBlobRadius = 0.34
    this.baseBlobStrength = 0.24
    this.depthToRadiusAmount = 0.08
    this.velocityToStrengthAmount = 0.16
    this.motionSmoothing = 0.1
    this.motionDepthProgress = 0
    this.motionVelocityIntensity = 0
    this.smoothedDepthProgress = 0
    this.smoothedVelocityIntensity = 0
    this.blobRadius = this.baseBlobRadius
    this.blobStrength = this.baseBlobStrength
    this.accentStrength = 0.28
    this.noiseStrength = 0.04
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
        uAccentColor: { value: this.accentColor },
        uAccentStrength: { value: this.accentStrength },
        uNoiseStrength: { value: this.noiseStrength },
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
      accentColor: '#ffffff',
    })
    this.applyMotionToBlob()
    this.bindDebug()

    this.isInitialized = true
  }

  setMoodColors({ top, mid, bottom, accentColor } = {}) {
    if (top) this.topColor.set(top)
    if (mid) this.midColor.set(mid)
    if (bottom) this.bottomColor.set(bottom)
    if (accentColor) this.accentColor.set(accentColor)

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
    this.accentColor
      .set(currentMood.accentColor || currentMood.mid)
      .lerp(this.nextAccentColor.set(nextMood.accentColor || nextMood.mid), safeBlend)

    this.updateUniformColors()
  }

  updateUniformColors() {
    if (!this.material) return

    this.material.uniforms.uTopColor.value.copy(this.topColor)
    this.material.uniforms.uMidColor.value.copy(this.midColor)
    this.material.uniforms.uBottomColor.value.copy(this.bottomColor)
    this.material.uniforms.uAccentColor.value.copy(this.accentColor)
    this.material.uniforms.uAccentStrength.value = this.accentStrength
    this.material.uniforms.uNoiseStrength.value = this.noiseStrength
  }

  updateBlobUniforms() {
    if (!this.material) return

    this.material.uniforms.uBlobRadius.value = this.blobRadius
    this.material.uniforms.uBlobStrength.value = this.blobStrength
  }

  setMotionResponse({ depthProgress, velocityIntensity } = {}) {
    if (Number.isFinite(depthProgress)) {
      this.motionDepthProgress = THREE.MathUtils.clamp(depthProgress, 0, 1)
    }
    if (Number.isFinite(velocityIntensity)) {
      this.motionVelocityIntensity = THREE.MathUtils.clamp(velocityIntensity, 0, 1)
    }
  }

  applyMotionToBlob() {
    const nextBlobRadius =
      this.baseBlobRadius + this.smoothedDepthProgress * this.depthToRadiusAmount
    const nextBlobStrength =
      this.baseBlobStrength + this.smoothedVelocityIntensity * this.velocityToStrengthAmount

    this.blobRadius = THREE.MathUtils.clamp(nextBlobRadius, 0.05, 1)
    this.blobStrength = THREE.MathUtils.clamp(nextBlobStrength, 0, 1)

    this.updateBlobUniforms()
  }

  bindDebug() {
    if (!this.debug || this.isDebugBound) return

    this.debug.addBinding({
      folderTitle: 'Background',
      targetObject: this,
      property: 'baseBlobRadius',
      label: 'Blob Radius',
      options: {
        min: 0.05,
        max: 1,
        step: 0.01,
      },
      onChange: () => {
        this.applyMotionToBlob()
      },
    })

    this.debug.addBinding({
      folderTitle: 'Background',
      targetObject: this,
      property: 'baseBlobStrength',
      label: 'Blob Strength',
      options: {
        min: 0,
        max: 1,
        step: 0.01,
      },
      onChange: () => {
        this.applyMotionToBlob()
      },
    })

    this.debug.addBinding({
      folderTitle: 'Background',
      targetObject: this,
      property: 'depthToRadiusAmount',
      label: 'Radius Motion',
      options: {
        min: 0,
        max: 0.4,
        step: 0.01,
      },
      onChange: () => {
        this.applyMotionToBlob()
      },
    })

    this.debug.addBinding({
      folderTitle: 'Background',
      targetObject: this,
      property: 'velocityToStrengthAmount',
      label: 'Strength Motion',
      options: {
        min: 0,
        max: 0.6,
        step: 0.01,
      },
      onChange: () => {
        this.applyMotionToBlob()
      },
    })

    this.debug.addBinding({
      folderTitle: 'Background',
      targetObject: this,
      property: 'accentStrength',
      label: 'Accent Strength',
      options: {
        min: 0,
        max: 1,
        step: 0.01,
      },
      onChange: () => {
        this.updateUniformColors()
      },
    })

    this.debug.addBinding({
      folderTitle: 'Background',
      targetObject: this,
      property: 'noiseStrength',
      label: 'Noise Strength',
      options: {
        min: 0,
        max: 0.2,
        step: 0.005,
      },
      onChange: () => {
        this.updateUniformColors()
      },
    })

    this.isDebugBound = true
  }

  update() {
    this.smoothedDepthProgress = THREE.MathUtils.lerp(
      this.smoothedDepthProgress,
      this.motionDepthProgress,
      this.motionSmoothing
    )
    this.smoothedVelocityIntensity = THREE.MathUtils.lerp(
      this.smoothedVelocityIntensity,
      this.motionVelocityIntensity,
      this.motionSmoothing
    )

    this.applyMotionToBlob()
  }

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

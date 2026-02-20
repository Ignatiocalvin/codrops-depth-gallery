import * as THREE from 'three'
import { galleryPlaneData } from '@/data/galleryData'

class Gallery {
  constructor(debug = null) {
    this.isInitialized = false
    this.isDebugBound = false
    this.debug = debug
    this.planes = []
    this.texturesBySource = new Map()
    this.useTextures = true
    this.planeGap = 5
    this.desktopPlaneScale = 1
    this.mobilePlaneScale = 0.65
    this.mobileXSpreadFactor = 0.25
    this.mobileBreakpoint = 768
    this.planeConfig = galleryPlaneData
  }

  async init(scene) {
    if (this.isInitialized) return

    this.setPlanes(scene)
    this.updatePlaneMaterialMode()
    this.updatePlaneScale()
    this.layoutPlanes()
    this.bindDebug()

    this.isInitialized = true
  }

  setPlanes(scene) {
    const planeGeometry = new THREE.PlaneGeometry(3, 3)

    this.planeConfig.forEach((planeDefinition) => {
      const texture = this.texturesBySource.get(planeDefinition.textureSrc) || null
      const textureImage = texture?.image
      const aspectRatio =
        textureImage && textureImage.width > 0 && textureImage.height > 0
          ? textureImage.width / textureImage.height
          : 1
      const planeMaterial = new THREE.MeshBasicMaterial({
        color: planeDefinition.color,
        map: texture,
        side: THREE.DoubleSide
      })
      const plane = new THREE.Mesh(planeGeometry, planeMaterial)
      plane.userData.basePosition = planeDefinition.position
      plane.userData.baseColor = planeDefinition.color
      plane.userData.texture = texture
      plane.userData.aspectRatio = aspectRatio
      scene.add(plane)
      this.planes.push(plane)
    })
  }

  updatePlaneScale() {
    const isMobileViewport = window.innerWidth <= this.mobileBreakpoint
    const scale = isMobileViewport ? this.mobilePlaneScale : this.desktopPlaneScale

    this.planes.forEach((plane) => {
      const aspectRatio = plane.userData.aspectRatio || 1
      plane.scale.set(scale * aspectRatio, scale, 1)
    })
  }

  layoutPlanes() {
    const isMobileViewport = window.innerWidth <= this.mobileBreakpoint
    const xSpreadFactor = isMobileViewport ? this.mobileXSpreadFactor : 1

    this.planes.forEach((plane, index) => {
      const basePosition = plane.userData.basePosition || { x: 0, y: 0 }
      const xPosition = basePosition.x * xSpreadFactor
      plane.position.set(xPosition, basePosition.y, -index * this.planeGap)
    })
  }

  getDepthRange() {
    if (!this.planes.length) {
      return { nearestZ: 0, deepestZ: 0 }
    }

    const zPositions = this.planes.map((plane) => plane.position.z)
    return {
      nearestZ: Math.max(...zPositions),
      deepestZ: Math.min(...zPositions),
    }
  }

  getTextureSources() {
    const textureSources = this.planeConfig
      .map((planeDefinition) => planeDefinition.textureSrc)
      .filter(Boolean)

    return [...new Set(textureSources)]
  }

  setPreloadedTextures(texturesBySource) {
    this.texturesBySource = texturesBySource instanceof Map ? texturesBySource : new Map()
  }

  updatePlaneMaterialMode() {
    this.planes.forEach((plane) => {
      const planeMaterial = plane.material
      const texture = plane.userData.texture || null
      const hasTexture = Boolean(texture)

      planeMaterial.map = this.useTextures && hasTexture ? texture : null
      planeMaterial.color.set(this.useTextures && hasTexture ? '#ffffff' : plane.userData.baseColor)
      planeMaterial.needsUpdate = true
    })
  }

  bindDebug() {
    if (!this.debug || this.isDebugBound) return

    this.debug.addBinding({
      folderTitle: 'Gallery',
      targetObject: this,
      property: 'planeGap',
      label: 'Gap',
      options: {
        min: 0.4,
        max: 10,
        step: 0.1,
      },
      onChange: () => {
        this.layoutPlanes()
      },
    })

    this.debug.addBinding({
      folderTitle: 'Gallery',
      targetObject: this,
      property: 'useTextures',
      label: 'Use Textures',
      onChange: () => {
        this.updatePlaneMaterialMode()
      },
    })

    this.isDebugBound = true
  }

  update() {}
}

export { Gallery }

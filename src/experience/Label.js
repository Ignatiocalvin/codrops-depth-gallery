import * as THREE from 'three'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

class Label {
  constructor(gallery) {
    this.gallery = gallery

    this.renderer = null
    this.scene = null
    this.camera = null

    this.primaryLayer = this.createLayerState()
    this.secondaryLayer = this.createLayerState()

    this.rightOffsetX = 0.2
    this.leftOffsetX = -0.2
    this.offsetY = 0
    this.offsetZ = -2
    this.fadeOutEnd = 0.35
    this.fadeInStart = 0.7
  }

  createLayerState() {
    return {
      labelObject: null,
      element: null,
      serialElement: null,
      titleElement: null,
      subtitleElement: null,
      metaElement: null,
      activePlaneIndex: -1,
      currentOpacity: 0,
    }
  }

  createLayerElement() {
    const element = document.createElement('article')
    element.className = 'plane-label-text'
    element.innerHTML = `
      <p class="plane-label-text__serial"></p>
      <p class="plane-label-text__title"></p>
      <p class="plane-label-text__subtitle"></p>
      <p class="plane-label-text__meta"></p>
    `

    return {
      element,
      serialElement: element.querySelector('.plane-label-text__serial'),
      titleElement: element.querySelector('.plane-label-text__title'),
      subtitleElement: element.querySelector('.plane-label-text__subtitle'),
      metaElement: element.querySelector('.plane-label-text__meta'),
    }
  }

  init(scene, camera) {
    if (this.renderer) return

    this.scene = scene
    this.camera = camera

    if (!this.camera.parent) {
      this.scene.add(this.camera)
    }

    this.renderer = new CSS2DRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.domElement.className = 'label-layer'
    this.renderer.domElement.style.pointerEvents = 'none'
    document.body.append(this.renderer.domElement)

    this.setupLayer(this.primaryLayer)
    this.setupLayer(this.secondaryLayer)
  }

  setupLayer(layer) {
    const { element, serialElement, titleElement, subtitleElement, metaElement } =
      this.createLayerElement()

    layer.element = element
    layer.serialElement = serialElement
    layer.titleElement = titleElement
    layer.subtitleElement = subtitleElement
    layer.metaElement = metaElement

    layer.labelObject = new CSS2DObject(element)
    layer.labelObject.center.set(0, 0.5)
    layer.labelObject.position.set(this.rightOffsetX, this.offsetY, this.offsetZ)
    layer.currentOpacity = 0
    this.updateLayerOpacity(layer, 0)

    this.camera.add(layer.labelObject)
  }

  resize(width, height) {
    if (!this.renderer) return
    this.renderer.setSize(width, height)
  }

  getLabelBlendData(cameraZ) {
    return this.gallery.getPlaneBlendData(cameraZ)
  }

  applyPlaneToLayer(layer, planeIndex) {
    const plane = this.gallery.planes[planeIndex]
    if (!plane || layer.activePlaneIndex === planeIndex) return

    const labelData = plane.userData.label || {}
    const placeLabelOnRight = plane.position.x <= 0

    if (placeLabelOnRight) {
      layer.labelObject.center.set(0, 0.5)
      layer.labelObject.position.set(this.rightOffsetX, this.offsetY, this.offsetZ)
      layer.element.classList.add('plane-label-text--right')
      layer.element.classList.remove('plane-label-text--left')
    } else {
      layer.labelObject.center.set(1, 0.5)
      layer.labelObject.position.set(this.leftOffsetX, this.offsetY, this.offsetZ)
      layer.element.classList.add('plane-label-text--left')
      layer.element.classList.remove('plane-label-text--right')
    }

    layer.serialElement.textContent = labelData.serial || ''
    layer.titleElement.textContent = labelData.title || ''
    layer.subtitleElement.textContent = labelData.subtitle || ''
    layer.metaElement.textContent = labelData.meta || ''
    layer.element.style.color = labelData.color || ''
    layer.activePlaneIndex = planeIndex
  }

  updateLayerOpacity(layer, targetOpacity) {
    layer.currentOpacity = THREE.MathUtils.clamp(targetOpacity, 0, 1)
    layer.element.style.opacity = String(layer.currentOpacity)
  }

  update(camera = null) {
    if (!camera || !this.primaryLayer.element || !this.secondaryLayer.element) return

    const blendData = this.getLabelBlendData(camera.position.z)
    if (!blendData) {
      this.updateLayerOpacity(this.primaryLayer, 0)
      this.updateLayerOpacity(this.secondaryLayer, 0)
      return
    }

    const { currentPlaneIndex, nextPlaneIndex, blend } = blendData
    this.applyPlaneToLayer(this.primaryLayer, currentPlaneIndex)
    this.applyPlaneToLayer(this.secondaryLayer, nextPlaneIndex)

    if (currentPlaneIndex === nextPlaneIndex) {
      this.updateLayerOpacity(this.primaryLayer, 1)
      this.updateLayerOpacity(this.secondaryLayer, 0)
      return
    }

    const outgoingOpacity = 1 - THREE.MathUtils.smoothstep(blend, 0, this.fadeOutEnd)
    const incomingOpacity = THREE.MathUtils.smoothstep(blend, this.fadeInStart, 1)
    this.updateLayerOpacity(this.primaryLayer, outgoingOpacity)
    this.updateLayerOpacity(this.secondaryLayer, incomingOpacity)
  }

  render() {
    if (!this.renderer || !this.scene || !this.camera) return
    this.renderer.render(this.scene, this.camera)
  }

  disposeLayer(layer) {
    if (layer.labelObject?.parent) {
      layer.labelObject.parent.remove(layer.labelObject)
    }

    layer.labelObject = null
    layer.element = null
    layer.serialElement = null
    layer.titleElement = null
    layer.subtitleElement = null
    layer.metaElement = null
    layer.activePlaneIndex = -1
    layer.currentOpacity = 0
  }

  dispose() {
    this.disposeLayer(this.primaryLayer)
    this.disposeLayer(this.secondaryLayer)

    if (this.renderer?.domElement) {
      this.renderer.domElement.remove()
    }

    this.renderer = null
    this.scene = null
    this.camera = null
  }
}

export { Label }

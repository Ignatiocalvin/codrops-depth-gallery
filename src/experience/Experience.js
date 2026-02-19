import * as THREE from 'three'
import { Debug } from '@/experience/Debug'

class Experience {
  constructor() {
    this.isInitialized = false
    this.plane = null
    this.planeColor = '#ffffff'
    this.debug = new Debug()
  }

  async init(scene) {
    if (this.isInitialized) return

    this.setPlane(scene)
    this.debug.init(this)

    this.isInitialized = true
  }

  setPlane(scene) {
    const planeGeometry = new THREE.PlaneGeometry(3, 3)
    const planeMaterial = new THREE.MeshBasicMaterial({ color: this.planeColor })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)

    scene.add(plane)
    this.plane = plane
  }

  setPlaneColor(color) {
    this.planeColor = color

    if (this.plane && this.plane.material instanceof THREE.MeshBasicMaterial) {
      this.plane.material.color.set(color)
    }
  }

  update() {}
}

const world = new Experience()
export { Experience, world }

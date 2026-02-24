import * as THREE from 'three'
import { Gallery } from '@/Experience/Gallery'
import { Background } from '@/Experience/Background'
import { Debug } from '@/Experience/Debug'

class Experience {
  constructor() {
    this.isInitialized = false
    this.debug = new Debug()
    this.gallery = new Gallery(this.debug)
    this.background = new Background(this.debug)
  }

  async init(scene) {
    if (this.isInitialized) return

    await this.gallery.init(scene)
    this.background.init()

    this.isInitialized = true
  }

  update(time, camera = null, scroll = null) {
    this.gallery.update(time)
    if (camera) {
      const moodBlendData = this.gallery.getMoodBlendData(camera.position.z)
      if (moodBlendData) {
        this.background.setMoodBlend(moodBlendData)
      }

      const depthProgress = this.gallery.getDepthProgress(camera.position.z)
      const velocityMax = scroll?.velocityMax || 1
      const velocityIntensity = THREE.MathUtils.clamp(
        Math.abs(scroll?.velocity || 0) / Math.max(velocityMax, 0.0001),
        0,
        1
      )
      this.background.setMotionResponse({ depthProgress, velocityIntensity })
    }
    this.background.update(time)
  }
}

const world = new Experience()
export { Experience, world }

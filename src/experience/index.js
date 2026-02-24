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

  update(time, camera = null) {
    this.gallery.update(time)
    if (camera) {
      const moodBlendData = this.gallery.getMoodBlendData(camera.position.z)
      if (moodBlendData) {
        this.background.setMoodBlend(moodBlendData)
      }
    }
    this.background.update(time)
  }
}

const world = new Experience()
export { Experience, world }

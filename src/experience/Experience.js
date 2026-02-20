import { Gallery } from '@/experience/Gallery'
import { Background } from '@/experience/Background'
import { Debug } from '@/experience/Debug'

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

  update(time) {
    this.gallery.update(time)
    this.background.update(time)
  }
}

const world = new Experience()
export { Experience, world }

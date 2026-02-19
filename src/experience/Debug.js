import { Pane } from 'tweakpane'

class Debug {
  constructor() {
    this.pane = null
    this.state = {
      planeColor: '#ffffff',
    }
  }

  init(experience) {
    if (this.pane) return

    this.state.planeColor = experience.planeColor
    this.pane = new Pane({ title: 'Plane' })
    this.pane.element.classList.add('debug-pane')

    const planeColorBinding = this.pane.addBinding(this.state, 'planeColor', {
      label: 'Color',
    })

    planeColorBinding.on('change', (event) => {
      experience.setPlaneColor(event.value)
    })
  }

  dispose() {
    if (!this.pane) return
    this.pane.dispose()
    this.pane = null
  }
}

export { Debug }

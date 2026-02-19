import { Pane } from 'tweakpane'

class Debug {
  constructor() {
    this.pane = null
    this.state = {
      planeColor: '#ffffff',
      backgroundColor: '#0e1a2b',
    }
  }

  init(experience) {
    if (this.pane) return

    this.state.planeColor = experience.planeColor
    this.state.backgroundColor = experience.backgroundColor
    this.pane = new Pane({ title: 'Plane' })
    this.pane.element.classList.add('debug-pane')

    const planeColorBinding = this.pane.addBinding(this.state, 'planeColor', {
      label: 'Color',
    })

    planeColorBinding.on('change', (event) => {
      experience.setPlaneColor(event.value)
    })

    const backgroundColorBinding = this.pane.addBinding(this.state, 'backgroundColor', {
      label: 'Background',
    })

    backgroundColorBinding.on('change', (event) => {
      experience.setBackgroundColor(event.value)
    })
  }

  dispose() {
    if (!this.pane) return
    this.pane.dispose()
    this.pane = null
  }
}

export { Debug }

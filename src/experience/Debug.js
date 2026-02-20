import { Pane } from 'tweakpane'

class Debug {
  constructor() {
    this.pane = null
    this.folders = new Map()
  }

  init() {
    if (this.pane) return this.pane

    this.pane = new Pane({ title: 'Debug' })
    this.pane.element.classList.add('debug-pane')
    return this.pane
  }

  getFolder(folderTitle) {
    this.init()
    if (this.folders.has(folderTitle)) {
      return this.folders.get(folderTitle)
    }

    const folder = this.pane.addFolder({ title: folderTitle, expanded: true })
    this.folders.set(folderTitle, folder)
    return folder
  }

  addColorBinding({ folderTitle, targetObject, property, label, onChange }) {
    return this.addBinding({
      folderTitle,
      targetObject,
      property,
      label,
      onChange,
    })
  }

  addBinding({
    folderTitle,
    targetObject,
    property,
    label,
    options = {},
    onChange,
  }) {
    const folder = this.getFolder(folderTitle)
    const binding = folder.addBinding(targetObject, property, {
      label,
      ...options,
    })

    binding.on('change', (event) => {
      if (onChange) {
        onChange(event.value)
      }
    })

    return binding
  }

  dispose() {
    if (!this.pane) return
    this.pane.dispose()
    this.pane = null
    this.folders.clear()
  }
}

export { Debug }

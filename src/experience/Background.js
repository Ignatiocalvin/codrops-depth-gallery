class Background {
  constructor(debug = null) {
    this.isInitialized = false
    this.isDebugBound = false
    this.debug = debug
    this.color = '#000000'
  }

  init() {
    if (this.isInitialized) return
    this.bindDebug()
    this.isInitialized = true
  }

  setBackgroundColor(color) {
    this.color = color
  }

  bindDebug() {
    if (!this.debug || this.isDebugBound) return

    this.debug.addColorBinding({
      folderTitle: 'Background',
      targetObject: this,
      property: 'color',
      label: 'Color',
      onChange: (value) => {
        this.setBackgroundColor(value)
      },
    })

    this.isDebugBound = true
  }

  update() {}
}

export { Background }

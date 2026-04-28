class Label {
  constructor(gallery) {
    this.gallery = gallery

    this.overlayElement = null
    this.leftIndexElement = null
    this.wordElement = null
    this.chipElement = null
    
    // Explicit references for the 4 rows
    this.label1 = null; this.val1 = null;
    this.label2 = null; this.val2 = null;
    this.label3 = null; this.val3 = null;
    this.label4 = null; this.val4 = null;

    this.activePlaneIndex = -1
  }

  createElement() {
    const element = document.createElement('section')
    element.className = 'plane-label-overlay'
    
    // We provide placeholder text (Label/Value) so animation engines measure bounds correctly on load
    element.innerHTML = `
      <div class="plane-label-overlay__left">
        <p class="plane-label-overlay__index"></p>
        <p class="plane-label-card__word"></p>
        <span class="plane-label-overlay__chip"></span>
      </div>
      <article class="plane-label-card plane-label-overlay__right">
        <dl class="plane-label-card__specs">
          <div class="plane-label-card__row">
            <dt class="spec-label-1">Label</dt>
            <dd class="plane-label-card__value plane-label-card__value--cmyk spec-val-1">Value</dd>
          </div>
          <div class="plane-label-card__row">
            <dt class="spec-label-2">Label</dt>
            <dd class="plane-label-card__value plane-label-card__value--rgb spec-val-2">Value</dd>
          </div>
          <div class="plane-label-card__row">
            <dt class="spec-label-3">Label</dt>
            <dd class="plane-label-card__value plane-label-card__value--hex spec-val-3">Value</dd>
          </div>
          <div class="plane-label-card__row">
            <dt class="spec-label-4">Label</dt>
            <dd class="plane-label-card__value plane-label-card__value--pms spec-val-4">Value</dd>
          </div>
        </dl>
      </article>
    `

    // Map DOM elements exactly like the original structure
    return {
      element,
      leftIndexElement: element.querySelector('.plane-label-overlay__index'),
      wordElement: element.querySelector('.plane-label-card__word'),
      chipElement: element.querySelector('.plane-label-overlay__chip'),
      label1: element.querySelector('.spec-label-1'),
      val1: element.querySelector('.spec-val-1'),
      label2: element.querySelector('.spec-label-2'),
      val2: element.querySelector('.spec-val-2'),
      label3: element.querySelector('.spec-label-3'),
      val3: element.querySelector('.spec-val-3'),
      label4: element.querySelector('.spec-label-4'),
      val4: element.querySelector('.spec-val-4'),
    }
  }

  init() {
    if (this.overlayElement) return

    const refs = this.createElement()

    this.overlayElement = refs.element
    this.leftIndexElement = refs.leftIndexElement
    this.wordElement = refs.wordElement
    this.chipElement = refs.chipElement
    
    this.label1 = refs.label1; this.val1 = refs.val1;
    this.label2 = refs.label2; this.val2 = refs.val2;
    this.label3 = refs.label3; this.val3 = refs.val3;
    this.label4 = refs.label4; this.val4 = refs.val4;

    this.overlayElement.style.opacity = '0'
    document.body.append(this.overlayElement)
  }

  applyPlaneContent(planeIndex) {
    const plane = this.gallery.planes[planeIndex]
    if (!plane || this.activePlaneIndex === planeIndex) return

    const labelData = plane.userData.label || {}
    
    const specs = (labelData.specs && labelData.specs.length > 0) 
      ? labelData.specs 
      : [
          { label: 'DATA', value: 'MISSING' },
          { label: 'CHECK', value: 'JSON' },
          { label: 'RESTART', value: 'SERVER' },
          { label: 'INSPECT', value: 'PLANE.JS' }
        ];

    this.leftIndexElement.textContent = String(planeIndex + 1).padStart(2, '0')
    this.wordElement.textContent = labelData.word || 'Portfolio'
    this.chipElement.style.backgroundColor = plane.userData.accentColor || '#ffffff'
    
    // 1. Updates the right-hand text overlay color
    this.overlayElement.style.color = labelData.color || '#ffffff'
    
    // 2. Updates the global frame title and links to match the current slide
    document.body.style.setProperty('--color-text', labelData.color || '#ffffff')
    document.body.style.setProperty('--color-link', labelData.color || '#ffffff')

    // Helper function to render links or plain text
    const renderValue = (element, spec) => {
      if (spec.url) {
        element.innerHTML = `<a href="${spec.url}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline; text-underline-offset: 4px;">${spec.value}</a>`
        element.style.pointerEvents = 'auto' 
      } else {
        element.textContent = spec.value
        element.style.pointerEvents = 'none'
      }
    }

    // Apply the data
    this.label1.textContent = specs[0].label
    renderValue(this.val1, specs[0])
    
    this.label2.textContent = specs[1].label
    renderValue(this.val2, specs[1])
    
    this.label3.textContent = specs[2].label
    renderValue(this.val3, specs[2])
    
    this.label4.textContent = specs[3].label
    renderValue(this.val4, specs[3])

    this.activePlaneIndex = planeIndex
  }

  getTargetPlaneIndex(cameraZ) {
    const blendData = this.gallery.getPlaneBlendData(cameraZ)
    if (!blendData) return -1
    return blendData.blend >= 0.5 ? blendData.nextPlaneIndex : blendData.currentPlaneIndex
  }

  resize() {}

  update(camera = null) {
    if (!camera || !this.overlayElement) return

    const targetPlaneIndex = this.getTargetPlaneIndex(camera.position.z)
    if (targetPlaneIndex < 0) {
      this.overlayElement.style.opacity = '0'
      return
    }

    this.applyPlaneContent(targetPlaneIndex)
    this.overlayElement.style.opacity = '1'
  }

  render() {}

  dispose() {
    this.overlayElement?.remove()
    this.overlayElement = null
    this.leftIndexElement = null
    this.wordElement = null
    this.chipElement = null
    
    this.label1 = null; this.val1 = null;
    this.label2 = null; this.val2 = null;
    this.label3 = null; this.val3 = null;
    this.label4 = null; this.val4 = null;

    this.activePlaneIndex = -1
  }
}

export { Label }
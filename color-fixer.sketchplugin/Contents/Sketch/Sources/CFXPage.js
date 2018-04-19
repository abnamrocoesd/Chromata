@import 'Sources/CFXLayer.js'

class CFXPage {
  constructor(page) {
    this.page = page
  }

  getColorsForPage() {
    var colorsForAllLayers = []

    var layers = this.page.layers()
    for (var i = 0; i < layers.count(); i++) {
      var layer = layers[i]
      var colorsForLayer = new CFXLayer(layer).getColorsForLayer()

      colorsForAllLayers = colorsForAllLayers.concat(colorsForLayer)
    }

    return colorsForAllLayers
  }
}

/*
  Chromata - A sketch plugin to find and fix layers that have colors
  outside of your palette.
  Copyright (C) 2018  Vladimir Ionita

  This file is part of Chromata.

  Chromata is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Chromata is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


@import 'Parser/CHRLayerParser.js'
@import 'Core/CHRPalette.js'

/**
 * Register a palette
 *
 * Select the layers that contains all the colors you want to have
 * in your palette and run 'register palette' command
 *
 * @param context
 */
let registerPalette = function(context) {
    let selectedLayers = context.selection
    if (selectedLayers.length == 0) {
        let message = "You haven't selected any layers."
        context.document.showMessage(message)

        return
    }

    let palette = getColorsFromLayers(selectedLayers)
    if (palette.length > 0) {
        CHRPalette.savePalette(palette)
        let message = 'Palette saved. You got ' + palette.length + ' colors in your palette.'
        context.document.showMessage(message)
    } else {
        let message = "Palette saved. No colors."
        context.document.showMessage(message)
    }
}

/**
 * Get all colors from a list of layers
 *
 * @param {Array.<MSLayer>} layers
 *
 * @return {Array.<CHRLayerColorsMapping>}
 */
function getColorsFromLayers(layers) {
    let colors = []

    for (let i = 0; i < layers.length; i++) {
        let layer = layers[i]

        let layerMappings = CHRLayerParser.getLayerColorsMappingsForLayer(layer)
        for (let j = 0; j < layerMappings.length; j++) {
            let layerColors = layerMappings[j].colors
            colors = colors.concat(layerColors)
        }
    }

    return colors
}

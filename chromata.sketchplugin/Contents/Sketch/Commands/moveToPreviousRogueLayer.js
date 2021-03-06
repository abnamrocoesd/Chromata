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


@import "Core/CHRPalette.js"
@import "Core/CHRRogueLayers.js"
@import "Parser/CHRDocumentParser.js"
@import "Commands/CommandsShared.js"

/**
 * Move to next rogue layer
 *
 * This command lets you navigate through the saved rogue layers
 *
 * @param context
 */
let moveToPreviousRogueLayer = function(context) {
    let palette = CHRPalette.loadPalette()
    if (palette.length == 0) {
        context.document.showMessage("You have no colors in your palette.")
        return
    }

    let rogueLayersIds = CHRRogueLayers.loadRogueLayersIds()
    if (rogueLayersIds.length == 0) {
        context.document.showMessage("You have no rogue layers. Use 'Find all rogue layers' first")
        return
    }

    let rogueLayersIdsCursorIndex = CHRRogueLayers.getRogueLayersCursorIndex(rogueLayersIds)
    if (rogueLayersIdsCursorIndex == undefined) {
        rogueLayersIdsCursorIndex = 0
    }

    if (rogueLayersIdsCursorIndex - 1 >= 0) {
        rogueLayersIdsCursorIndex -= 1

        let rogueLayersIdsCursor = rogueLayersIds[rogueLayersIdsCursorIndex]
        let rogueLayersCursor = CHRDocumentParser.getLayerByIdFromDocument(rogueLayersIdsCursor, context.document)
        if (rogueLayersCursor != null) {
            selectLayerInDocument(rogueLayersCursor, context.document)
            moveViewportFocusToLayerInDocument(rogueLayersCursor, context.document)
        } else {
            context.document.showMessage("This layer was removed, can't select it. Move backward or reset.")
        }

        CHRRogueLayers.saveRogueLayersCursor(rogueLayersIdsCursor)
    } else {
        context.document.showMessage("There are no previous rogue layers.")
    }
}

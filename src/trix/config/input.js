import browser from "trix/config/browser"
import { makeElement, removeNode } from "trix/core/helpers/dom"

const input = {
  level2Enabled: true,

  // New option: if set to a valid accept string (e.g., "image/*"),
  // only files matching this pattern will be selectable.
  // If left null, then all file types are allowed.
  acceptFileTypes: null,

  getLevel() {
    if (this.level2Enabled && browser.supportsInputEvents) {
      return 2
    } else {
      return 0
    }
  },
  pickFiles(callback) {
    // Build input attributes. If acceptFileTypes is provided (and is a string),
    // add the accept attribute.
    const attributes = { type: "file", multiple: true, hidden: true, id: this.fileInputId }
    if (this.acceptFileTypes && typeof this.acceptFileTypes === "string") {
      attributes.accept = this.acceptFileTypes
    }

    const input = makeElement("input", attributes)

    input.addEventListener("change", () => {
      callback(input.files)
      removeNode(input)
    })

    removeNode(document.getElementById(this.fileInputId))
    document.body.appendChild(input)
    input.click()
  }
}

export default input

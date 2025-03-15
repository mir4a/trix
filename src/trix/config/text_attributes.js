import { attachmentSelector } from "trix/config/attachments"

export default {
  bold: {
    tagName: "strong",
    inheritable: true,
    parser(element) {
      const style = window.getComputedStyle(element)
      return style.fontWeight === "bold" || style.fontWeight >= 600
    },
  },
  italic: {
    tagName: "em",
    inheritable: true,
    parser(element) {
      const style = window.getComputedStyle(element)
      return style.fontStyle === "italic"
    },
  },
  href: {
    groupTagName: "a",
    parser(element) {
      const attachmentElement = element.closest(attachmentSelector)
      if (attachmentElement) {
        const attachmentDataJson = attachmentElement.getAttribute("data-trix-attachment")
        if (attachmentDataJson) {
          try {
            const attachmentData = JSON.parse(attachmentDataJson)
            if (attachmentData.contentType === "text/html" && attachmentData.href) {
              return attachmentData.href
            }
          } catch (error) {
            // Handle any JSON parsing errors if necessary
          }
        }
        return
      }
      const link = element.closest("a")
      if (link) {
        return link.getAttribute("href")
      }
    },
  },
  strike: {
    tagName: "del",
    inheritable: true,
  },
  frozen: {
    style: { backgroundColor: "highlight" },
  },
}

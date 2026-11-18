function legacyCopy(text: string): boolean {
  const previous = document.activeElement
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none'
  document.body.appendChild(area)
  area.select()
  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    area.remove()
    if (previous instanceof HTMLElement) previous.focus({ preventScroll: true })
  }
}

export async function copyText(text: string): Promise<boolean> {
  if (window.isSecureContext && typeof navigator.clipboard?.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return legacyCopy(text)
    }
  }
  return legacyCopy(text)
}

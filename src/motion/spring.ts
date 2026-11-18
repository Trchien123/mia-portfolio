export type SpringConfig = {
  omega: number
  zeta: number
  max: number
  cap: number
  /** Per-frame target in degrees (pointer-driven springs); 0 when omitted. */
  target?: (dt: number) => number
}

export type SpringEngine = {
  kick(peak: number): void
  wake(): void
  stop(): void
  busy(): boolean
  setOnScreen(on: boolean): void
}

/**
 * Damped harmonic oscillator in degrees, ported 1:1 from the approved prototype:
 * semi-implicit Euler, 4 substeps, dt clamped to 34ms. The rAF loop runs only while
 * moving and on screen, and writes `transform: rotate()` straight to the element.
 */
export function createSpring(el: HTMLElement | SVGElement, cfg: SpringConfig): SpringEngine {
  const { omega: w, zeta, max, cap } = cfg
  const k = w * w
  const c = 2 * zeta * w
  let x = 0
  let v = 0
  let target = 0
  let raf = 0
  let last = 0
  let onScreen = true

  const render = () => {
    el.style.transform = Math.abs(x) < 0.001 ? '' : `rotate(${x.toFixed(3)}deg)`
  }
  // Kicks are ignored while off screen or not displayed (the wobbler at <=719px).
  const displayed = () => onScreen && el.getClientRects().length > 0

  const settle = () => {
    x = 0
    v = 0
    raf = 0
    render()
    el.style.willChange = ''
  }

  const step = (now: number) => {
    const dt = Math.min(0.034, Math.max(0, now - last) / 1000)
    last = now
    if (cfg.target) target = cfg.target(dt)
    const h = dt / 4
    for (let i = 0; i < 4; i++) {
      v += (-k * (x - target) - c * v) * h
      x += v * h
    }
    if (x > max) {
      x = max
      if (v > 0) v = 0
    } else if (x < -max) {
      x = -max
      if (v < 0) v = 0
    }
    if (Math.abs(x - target) < 0.004 && Math.abs(v) < 0.02 && Math.abs(target) < 0.004) {
      settle()
      return
    }
    render()
    raf = requestAnimationFrame(step)
  }

  const wake = () => {
    if (raf || !displayed()) return
    el.style.willChange = 'transform'
    last = performance.now()
    raf = requestAnimationFrame(step)
  }

  const stop = () => {
    if (raf) cancelAnimationFrame(raf)
    settle()
  }

  return {
    kick(peak) {
      if (!displayed()) return
      const dir = Math.abs(v) > 1 ? Math.sign(v) : 1
      v += dir * (peak / 0.727) * w
      const amp = Math.sqrt(x * x + (v / w) * (v / w))
      if (amp > cap) {
        x *= cap / amp
        v *= cap / amp
      }
      wake()
    },
    wake,
    stop,
    busy: () => raf !== 0,
    setOnScreen(on) {
      onScreen = on
      if (!on) stop()
    },
  }
}

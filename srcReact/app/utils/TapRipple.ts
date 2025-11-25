export type TTapRippleOptional = {
	rippleColor?: string
}
export class TapRipple {
	private _name: string
	private _optional: TTapRippleOptional
	private _rippleAnimationEndActionScopeHandler: (e: AnimationEvent) => void
	constructor(name: string, optional: TTapRippleOptional = {}) {
		this._name = name
		this._optional = {
			rippleColor: `#dcdcdc`,
			...optional,
		}
	}

	public install(): void {
		this._rippleAnimationEndActionScopeHandler = this.rippleAnimationEndAction.bind(this)
		this.appendStyleElement()
	}

	public uninstall(): void {
		const headElement: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0]
		const allStyleElements: Array<HTMLStyleElement> = Array.from(headElement.querySelectorAll('style'))
		for (let i: number = 0; i < allStyleElements.length; i++) {
			if (allStyleElements[i].getAttribute('id') === this._name) {
				allStyleElements[i].remove()
				break
			}
		}
	}

	public apply(insertContainerElement: HTMLElement, position: { x: number; y: number }): void {
		const insertContainerElementClientWidth = insertContainerElement.offsetWidth
		const spanElement = document.createElement('span')
		const targetClientRect = insertContainerElement.getBoundingClientRect()
		const x = position.x - targetClientRect.left - insertContainerElementClientWidth / 2
		const y = position.y - targetClientRect.top - insertContainerElementClientWidth / 2
		if (insertContainerElement.firstChild) {
			insertContainerElement.insertBefore(spanElement, insertContainerElement.firstChild)
		} else {
			insertContainerElement.appendChild(spanElement)
		}
		spanElement.classList.add('gesture-tap-ripple')
		spanElement.addEventListener('animationend', this._rippleAnimationEndActionScopeHandler)
		spanElement.style.cssText = `width: ${insertContainerElementClientWidth}px; height: ${insertContainerElementClientWidth}px; top: ${y}px; left: ${x}px`
		spanElement.classList.add('gesture-tap-ripple-animation')
	}

	private rippleAnimationEndAction(e: AnimationEvent): void {
		const currentTarget: HTMLElement = e.currentTarget as HTMLElement
		currentTarget.removeEventListener('animationend', this._rippleAnimationEndActionScopeHandler)
		;(currentTarget.parentNode as HTMLElement).removeChild(currentTarget)
	}

	private createCSSText(): string {
		const cssText: string = `
            @keyframes GestureTapRippleAnimation {
                100% {
                    -webkit-transform: scale(2);
                    transform: scale(2);
                    opacity: 0;
                }
            }
            .gesture-tap-ripple {
                border-radius: 50%;
                background-color: ${this._optional.rippleColor};
                -webkit-transform: scale(0);
                transform: scale(0);
                position: absolute;
                opacity: 1;
                pointer-events: none;
            }
            .gesture-tap-ripple-animation {
                -webkit-animation: GestureTapRippleAnimation 1.5s cubic-bezier(0.23, 1, 0.32, 1);
                -moz-animation: GestureTapRippleAnimation 1.5s cubic-bezier(0.23, 1, 0.32, 1);
                animation: GestureTapRippleAnimation 1.5s cubic-bezier(0.23, 1, 0.32, 1);
            }
        `
		return cssText
	}

	private appendStyleElement(): void {
		const cssText: string = this.createCSSText()
		const styleElement: HTMLStyleElement = document.createElement('style')
		styleElement.type = 'text/css'
		styleElement.id = this._name
		if ((styleElement as any).styleSheet) {
			;(styleElement as any).styleSheet.cssText = cssText
		} else {
			styleElement.appendChild(document.createTextNode(cssText))
		}
		;(document.head || document.getElementsByTagName('head')[0]).appendChild(styleElement)
	}
}

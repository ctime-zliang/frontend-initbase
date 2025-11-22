export class TapRipple {
	private _name: string
	constructor(name: string) {
		this._name = name
		this.init()
	}

	private init(): void {
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
                background-color: #dcdcdc;
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

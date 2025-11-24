class SwipeManager {
	static translateX = 0
	static swipeContainerElement = null
	static swipeItemElements = []
	static swipeItemTranlsteXMap = {}
	static STATUS_OPEN = 'open'
	static STATUS_CLOSE = 'close'
	static leftEndPoint = -150
	static moveDirection = undefined

	static init(swipeContainerElement) {
		this.swipeContainerElement = swipeContainerElement
		this.swipeItemElements = this.swipeContainerElement.querySelectorAll('.swiper-item')
		Array.from(this.swipeItemElements).forEach(itemElement => {
			this.initItemElement(itemElement)
		})
	}

	static initItemElement(itemElement) {
		const id = `list${Math.random()}`
		itemElement.setAttribute('id', id)
		itemElement.id = id
		this.swipeItemTranlsteXMap[id] = {
			setting: 0,
			rightEndPoint: 0,
			leftEndPoint: this.leftEndPoint,
			status: this.STATUS_CLOSE,
		}
		this.applyTransfromStyle(itemElement)
		this.bindEvent(itemElement)
	}

	static updateStyle(itemElement, attr, value) {
		itemElement.style[attr] = value
	}

	static setTransitionStyle(itemElement, use = false) {
		if (!use) {
			itemElement.style.transition = 'none'
			return
		}
		itemElement.style.transition = 'transform .2s ease'
	}

	static applyTransfromStyle(itemElement) {
		const tranlsteXItemData = this.swipeItemTranlsteXMap[itemElement.id]
		if (!tranlsteXItemData) {
			return
		}
		itemElement.style.transform = `translate3d(${tranlsteXItemData.setting}px, 0, 5px)`
	}

	static bindEvent(itemElement) {
		const self = this
		xGesture.attach(itemElement, {
			onDragMove(evte, { movePosition, moveDirection, distX, distY, diffX, diffY, clientX, clientY }, gesture) {
				console.log({ movePosition, moveDirection, distX, distY, diffX, diffY, clientX, clientY })
				if (!self.moveDirection) {
					self.moveDirection = moveDirection
				}
				if (self.moveDirection === xGesture.defined.DIRECTION_UP || self.moveDirection === xGesture.defined.DIRECTION_DOWN) {
					return
				}
				if (evte.cancelable) {
					evte.preventDefault()
				}
				const currentTarget = itemElement
				const tranlsteXItemData = self.swipeItemTranlsteXMap[currentTarget.id]
				tranlsteXItemData.setting += diffX
				if (tranlsteXItemData.setting > tranlsteXItemData.rightEndPoint) {
					tranlsteXItemData.setting = tranlsteXItemData.rightEndPoint
				} else if (tranlsteXItemData.setting < tranlsteXItemData.leftEndPoint) {
					tranlsteXItemData.setting = tranlsteXItemData.leftEndPoint
				}
				self.setTransitionStyle(currentTarget, false)
				self.applyTransfromStyle(currentTarget)
			},
			onSwipe(evte, { direction, distX, distY, releaseX, releaseY }, gesture) {
				console.log({ direction, distX, distY, releaseX, releaseY })
				if (self.moveDirection === xGesture.defined.DIRECTION_UP || self.moveDirection === xGesture.defined.DIRECTION_DOWN) {
					self.moveDirection = undefined
					return
				}
				if (evte.cancelable) {
					evte.preventDefault()
				}
				const currentTarget = itemElement
				const tranlsteXItemData = self.swipeItemTranlsteXMap[currentTarget.id]
				if (direction === xGesture.defined.DIRECTION_RIGHT) {
					tranlsteXItemData.setting = tranlsteXItemData.rightEndPoint
					tranlsteXItemData.status = self.STATUS_CLOSE
				} else if (direction === xGesture.defined.DIRECTION_LEFT) {
					tranlsteXItemData.setting = tranlsteXItemData.leftEndPoint
					tranlsteXItemData.status = self.STATUS_OPEN
				}
				self.moveDirection = undefined
				self.setTransitionStyle(currentTarget, true)
				self.applyTransfromStyle(currentTarget)
			},
			onPointerup(evte, { clientX, clientY }, gesture) {
				console.log({ clientX, clientY })
				const currentTarget = itemElement
				const tranlsteXItemData = self.swipeItemTranlsteXMap[currentTarget.id]
				if (tranlsteXItemData.setting === tranlsteXItemData.rightEndPoint || tranlsteXItemData.setting === tranlsteXItemData.leftEndPoint) {
					return
				}
				if (tranlsteXItemData.status === self.STATUS_OPEN) {
					if (tranlsteXItemData.setting < tranlsteXItemData.rightEndPoint - 40) {
						tranlsteXItemData.setting = tranlsteXItemData.leftEndPoint
					} else {
						tranlsteXItemData.setting = tranlsteXItemData.rightEndPoint
					}
				} else if (tranlsteXItemData.status === self.STATUS_CLOSE) {
					if (tranlsteXItemData.setting > tranlsteXItemData.leftEndPoint + 40) {
						tranlsteXItemData.setting = tranlsteXItemData.rightEndPoint
					} else {
						tranlsteXItemData.setting = tranlsteXItemData.leftEndPoint
					}
				} else {
					tranlsteXItemData.setting = tranlsteXItemData.rightEndPoint
					tranlsteXItemData.status = self.STATUS_CLOSE
				}
				self.moveDirection = undefined
				self.setTransitionStyle(currentTarget, true)
				self.applyTransfromStyle(currentTarget)
			},
			onPpointercancel(evte, { clientX, clientY }, gesture) {
				console.log({ clientX, clientY })
				const currentTarget = itemElement
				const tranlsteXItemData = self.swipeItemTranlsteXMap[currentTarget.id]
				tranlsteXItemData.setting = tranlsteXItemData.rightEndPoint
				self.moveDirection = undefined
				self.setTransitionStyle(currentTarget, true)
				self.applyTransfromStyle(currentTarget)
			},
		})
	}
}

SwipeManager.init(sectionElement.querySelector('.swiper-container'))

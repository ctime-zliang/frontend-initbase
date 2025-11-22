import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import { PointerDownView } from './PointerDownView'
import { PointerDownMoveView } from './PointerDownMoveView'
import { PointerUpView } from './PointerUpView'
import { PointerCancelView } from './PointerCancelView'
import { TapView } from './TapView'
import { LongTapView } from './LongTapView'
import { DragMoveView } from './DragMoveView'
import { WheelView } from './WheelView'
import { PinchView } from './PinchView'
import { RotateView } from './RotateView'
import { SwipeVIew } from './SwipeVIew'

export function DemeCase(): React.ReactElement {
	return (
		<section style={{ padding: `10px 10px`, position: 'relative' }}>
			<div className={styles['gesture-container']}>
				<div className={styles['gesture-wrapper']}>
					<PointerDownView />
					<PointerDownMoveView />
					<PointerUpView />
					<PointerCancelView />
					<TapView />
					<LongTapView />
					<DragMoveView />
					<SwipeVIew />
					<WheelView />
					<PinchView />
					<RotateView />
				</div>
			</div>
		</section>
	)
}

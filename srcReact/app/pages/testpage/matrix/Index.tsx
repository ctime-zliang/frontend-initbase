import { Matrix4 } from '@/app/utils/algorithm/Matrix4'
import React, { useEffect } from 'react'

export function MatrixTest(): React.ReactElement {
	useEffect((): void => {
		console.log(`生成平移矩阵(tx = 2, ty = 3, tz = 4):`)
		const m0: Matrix4 = Matrix4.translate(2, 3, 4)
		console.log(`列主序: `, m0.toStringFormat())
		console.log(`行主序: `, m0.transpose().toStringFormat())
	}, [])
	return <div>Matrix</div>
}

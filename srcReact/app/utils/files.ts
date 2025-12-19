import { TZoomImageByContainerResult, zoomImageByContainer } from './zoomImage'

/**
 * 以图片形式读取文件并计算图片适配容器时的缩放尺寸
 *      返回资源配置列表
 */
export async function readFilesAsImageData(
	files: Array<File> | ArrayLike<File>,
	fitType: 'contain' | 'cover' | 'fit' | 'original',
	containerRect: { width: number; height: number }
): Promise<{
	code: number
	data: {
		imageList: Array<
			{
				src: string
				file: File
				naturalWidth: number
				naturalHeight: number
			} & TZoomImageByContainerResult
		>
	} | null
	msg: string
}> {
	return new Promise((resolve): void => {
		const imageList: Array<{ src: string; file: File } & TZoomImageByContainerResult> = []
		let hasError: boolean = false
		for (let i: number = 0; i < files.length; i++) {
			const image: HTMLImageElement = new Image()
			image.onload = function (e: Event): void {
				if (hasError) {
					return
				}
				const zoomProfile: TZoomImageByContainerResult = zoomImageByContainer(
					(e.target as HTMLImageElement).width,
					(e.target as HTMLImageElement).height,
					containerRect.width,
					containerRect.height,
					fitType!
				)
				imageList.push({
					src: (e.target as HTMLImageElement).src,
					file: files[i],
					...(zoomProfile || {
						naturalWidth: (e.target as HTMLImageElement).width,
						naturalHeight: (e.target as HTMLImageElement).height,
					}),
				})
				if (imageList.length >= files.length) {
					resolve({ code: 0, data: { imageList }, msg: '' })
				}
			}
			image.onerror = function (e: Event | string): void {
				resolve({ code: -1001, data: null, msg: 'file type error' })
				hasError = true
			}
			image.src = URL.createObjectURL(files[i])
		}
	})
}

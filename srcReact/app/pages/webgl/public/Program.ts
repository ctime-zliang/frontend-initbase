export class Program {
	static initProfile(gl: WebGLRenderingContext): void {
		gl.clearColor(0.0, 0.0, 0.0, 1.0)
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
		gl.enable(gl.BLEND)
		gl.enable(gl.CULL_FACE)
		gl.enable(gl.DEPTH_TEST)
		gl.enable(gl.POLYGON_OFFSET_FILL)
		gl.polygonOffset(1.0, 1.0)
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
	}

	static clear(gl: WebGLRenderingContext, canvasWidth: number, canvasHeight: number): void {
		gl.viewport(0, 0, canvasWidth, canvasHeight)
		gl.clearColor(0.0, 0.0, 0.0, 1.0)
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
	}
}

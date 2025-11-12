export function createListData(count: number): Array<{ id: number; text: string }> {
	return new Array(count).fill({}).map((_, index): { id: number; text: string } => {
		return {
			id: index + 1,
			text: `Index ${index + 1}`,
		}
	})
}

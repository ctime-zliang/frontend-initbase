export function correctionUserInput(inputValue: string | number, minNumber: number = 1, maxNumber: number = 1): number {
	let inputNumber: number = parseInt(String(inputValue))
	if (inputNumber < minNumber) {
		inputNumber = minNumber
	} else if (inputNumber > maxNumber) {
		inputNumber = maxNumber
	}
	return inputNumber
}

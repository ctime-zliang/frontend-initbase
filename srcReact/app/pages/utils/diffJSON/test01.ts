import { DiffJSON } from '../../../utils/DiffJSON'

let _old: any = {
	a: 'i am unchanged',
	b: 'i am deleted',
	e: {
		a: 1,
		b: false,
		c: null,
	},
	f: [
		1,
		{
			a: 'same',
			b: [
				{
					a: 'same',
				},
				{
					d: 'delete',
				},
			],
		},
	],
	g: new Date('2017.11.25'),
	h: 'i am updated',
	i: [{ name: '', cache: [1] }],
	j: [{ name: '', cache: { a: 1 } }],
	k: [{ name: '', cache: [1] }],
	l: [{ name: '', cache: [] }],
}

let _new: any = {
	a: 'i am unchanged',
	c: 'i am created',
	e: {
		a: '1',
		b: '',
		d: 'created',
	},
	f: [
		{
			a: 'same',
			b: [
				{
					a: 'same',
				},
				{
					c: 'create',
				},
			],
		},
		1,
	],
	g: new Date('2017.11.25'),
	h: 'i am updated really',
	i: [{ name: '', cache: { a: 1 } }],
	j: [{ name: '', cache: [] }],
	k: [{ name: '', cache: [] }],
	l: [{ name: '', cache: {} }],
}

export function test01(): void {
	const diffRes1: PlainObject = DiffJSON.implementByNested(_new, _old)
	const diffRes2: PlainObject = DiffJSON.implementByFlat(_new, _old)
	console.log(`implementByNested: `, diffRes1)
	console.log(`implementByFlat: `, diffRes2)
}

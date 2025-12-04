import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { CheckboxChangeEvent, Col, ColorPicker, Form, Radio, Row, Slider } from 'antd'
import { Color } from 'antd/es/color-picker'
import { SimpleDividingLine } from '@/app/componnet/simpleDividingLine'

type TComponentDataHandlerFormDataOptional = {
	modelRotationX?: number
	modelRotationY?: number
	modelRotationZ?: number
	modelOffsetX?: number
	modelOffsetY?: number
	modelOffsetZ?: number
	modelScale?: number
	lookEyePositionX?: number
	lookEyePositionY?: number
	lookEyePositionZ?: number
	lookAtPositionX?: number
	lookAtPositionY?: number
	lookAtPositionZ?: number
	lightColor?: string
	lightIntensityGain?: number
	lightIlluType?: ELightIlluType
	ambientLightR?: number
	ambientLightG?: number
	ambientLightB?: number
	ambientLightA?: number
	projectionType?: EProjectionType
	perspectiveProjectionFovy?: number
	perspectiveProjectionNear?: number
	perspectiveProjectionFar?: number
}
type TComponentDataHandlerFormData = {
	modelRotationX: number
	modelRotationY: number
	modelRotationZ: number
	modelOffsetX: number
	modelOffsetY: number
	modelOffsetZ: number
	modelScale: number
	lookEyePositionX: number
	lookEyePositionY: number
	lookEyePositionZ: number
	lookAtPositionX: number
	lookAtPositionY: number
	lookAtPositionZ: number
	lightColor: string
	lightIntensityGain: number
	lightIlluType: ELightIlluType
	ambientLightR: number
	ambientLightG: number
	ambientLightB: number
	ambientLightA: number
	projectionType: EProjectionType
	perspectiveProjectionFovy: number
	perspectiveProjectionNear: number
	perspectiveProjectionFar: number
}
type TComponentDataHandler = {
	formData: TComponentDataHandlerFormData
}

const formWidth: number = 800

const formItemLineStyle: React.CSSProperties = {
	margin: '0 0 5px 0',
}

const formItemValueShowColStyle: React.CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	alignContent: 'center',
	justifyContent: 'center',
}
const formItemValueShowColWidth: number = 4

export enum ELightIlluType {
	ParallelLight = 'ParallelLight',
	SpotLight = 'SpotLight',
}

export enum EProjectionType {
	PerspectiveProjection = 'PerspectiveProjection',
	OrthographicProjection = 'OrthographicProjection',
}

function FormController(
	props: {
		formData?: TComponentDataHandlerFormDataOptional
		onChangeAction?: (key: string, value: any) => void
	},
	ref: any
): React.ReactElement {
	const { formData = {}, onChangeAction } = props
	const [flush, setFlush] = useState<number>(0)
	const dataHandlerRef: { current: TComponentDataHandler } = useRef<TComponentDataHandler>({
		formData: {
			modelRotationX: formData.modelRotationX || 0,
			modelRotationY: formData.modelRotationY || 0,
			modelRotationZ: formData.modelRotationZ || 0,
			modelOffsetX: formData.modelOffsetX || 0,
			modelOffsetY: formData.modelOffsetY || 0,
			modelOffsetZ: formData.modelOffsetZ || 0,
			modelScale: formData.modelScale || 1,
			lookEyePositionX: formData.lookEyePositionX || 0,
			lookEyePositionY: formData.lookEyePositionY || 0,
			lookEyePositionZ: formData.lookEyePositionZ || 1,
			lookAtPositionX: formData.lookAtPositionX || 0,
			lookAtPositionY: formData.lookAtPositionY || 0,
			lookAtPositionZ: formData.lookAtPositionZ || 0,
			lightColor: formData.lightColor || '#ffffff',
			lightIntensityGain: formData.lightIntensityGain || 1,
			lightIlluType: formData.lightIlluType || ELightIlluType.ParallelLight,
			ambientLightR: formData.ambientLightR || 0,
			ambientLightG: formData.ambientLightG || 0,
			ambientLightB: formData.ambientLightB || 0,
			ambientLightA: formData.ambientLightA || 1,
			projectionType: formData.projectionType || EProjectionType.PerspectiveProjection,
			perspectiveProjectionFovy: 100,
			perspectiveProjectionNear: 0.1,
			perspectiveProjectionFar: 100,
		},
	})
	const onFormInputAction = (key: keyof TComponentDataHandlerFormData, value: any): void => {
		if (typeof dataHandlerRef.current.formData[key] !== 'undefined') {
			;(dataHandlerRef.current.formData[key] as any) = value
			onChangeAction && onChangeAction(key, value)
		}
		setFlush((prev: number): number => {
			return prev + 1
		})
	}

	useImperativeHandle(ref, () => {
		return {
			updateFormData(formData: TComponentDataHandlerFormDataOptional = {}) {
				const keys: Array<string> = Object.keys(formData)
				for (let i: number = 0; i < keys.length; i++) {
					const key: string = keys[i]
					if (key in dataHandlerRef.current.formData) {
						;(dataHandlerRef.current.formData as any)[key] = (formData as any)[key]
					}
				}
			},
			getFormData(): TComponentDataHandlerFormData {
				return { ...dataHandlerRef.current.formData }
			},
		}
	})

	return (
		<Form
			labelCol={{ span: 6 }}
			wrapperCol={{ span: 18 }}
			layout="horizontal"
			disabled={false}
			style={{ width: `${formWidth}px`, height: '100%', overflow: 'auto' }}
		>
			<Form.Item label="Model Rotation X" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={1}
							min={-360}
							max={360}
							onChange={(value: number): void => {
								onFormInputAction('modelRotationX', value)
							}}
							value={dataHandlerRef.current.formData['modelRotationX']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['modelRotationX']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Model Rotation Y" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={1}
							min={-360}
							max={360}
							onChange={(value: number): void => {
								onFormInputAction('modelRotationY', value)
							}}
							value={dataHandlerRef.current.formData['modelRotationY']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['modelRotationY']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Model Rotation Z" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={1}
							min={-360}
							max={360}
							onChange={(value: number): void => {
								onFormInputAction('modelRotationZ', value)
							}}
							value={dataHandlerRef.current.formData['modelRotationZ']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['modelRotationZ']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Model Offset X" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.1}
							min={-50}
							max={50}
							onChange={(value: number): void => {
								onFormInputAction('modelOffsetX', value)
							}}
							value={dataHandlerRef.current.formData['modelOffsetX']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['modelOffsetX']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Model Offset Y" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.1}
							min={-50}
							max={50}
							onChange={(value: number): void => {
								onFormInputAction('modelOffsetY', value)
							}}
							value={dataHandlerRef.current.formData['modelOffsetY']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['modelOffsetY']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Model Offset Z" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.1}
							min={-50}
							max={50}
							onChange={(value: number): void => {
								onFormInputAction('modelOffsetZ', value)
							}}
							value={dataHandlerRef.current.formData['modelOffsetZ']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['modelOffsetZ']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Model Scale" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.1}
							min={0.01}
							max={5}
							onChange={(value: number): void => {
								onFormInputAction('modelScale', value)
							}}
							value={dataHandlerRef.current.formData['modelScale']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['modelScale']}</div>
					</Col>
				</Row>
			</Form.Item>
			<SimpleDividingLine lineColor="#666666" />
			<Form.Item label="Look-Eye Position X" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={1}
							min={-100}
							max={100}
							onChange={(value: number): void => {
								onFormInputAction('lookEyePositionX', value)
							}}
							value={dataHandlerRef.current.formData['lookEyePositionX']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lookEyePositionX']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Look-Eye Position Y" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={1}
							min={-100}
							max={100}
							onChange={(value: number): void => {
								onFormInputAction('lookEyePositionY', value)
							}}
							value={dataHandlerRef.current.formData['lookEyePositionY']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lookEyePositionY']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Look-Eye Position Z" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={1}
							min={-100}
							max={100}
							onChange={(value: number): void => {
								onFormInputAction('lookEyePositionZ', value)
							}}
							value={dataHandlerRef.current.formData['lookEyePositionZ']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lookEyePositionZ']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Look-At Position X" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={1}
							min={-100}
							max={100}
							onChange={(value: number): void => {
								onFormInputAction('lookAtPositionX', value)
							}}
							value={dataHandlerRef.current.formData['lookAtPositionX']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lookAtPositionX']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Look-At Position Y" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={1}
							min={-100}
							max={100}
							onChange={(value: number): void => {
								onFormInputAction('lookEyePositionY', value)
							}}
							value={dataHandlerRef.current.formData['lookEyePositionY']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lookEyePositionY']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Look-At Position Z" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={1}
							min={-100}
							max={100}
							onChange={(value: number): void => {
								onFormInputAction('lookEyePositionZ', value)
							}}
							value={dataHandlerRef.current.formData['lookEyePositionZ']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lookEyePositionZ']}</div>
					</Col>
				</Row>
			</Form.Item>
			<SimpleDividingLine lineColor="#666666" />
			<Form.Item label="Light Color" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<ColorPicker
							defaultValue={dataHandlerRef.current.formData['lightColor']}
							onChange={(value: Color, css: string): void => {
								onFormInputAction('lightColor', css)
							}}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightColor']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Intensity Gain" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.01}
							min={0.01}
							max={3}
							onChange={(value: number): void => {
								onFormInputAction('lightIntensityGain', value)
							}}
							value={dataHandlerRef.current.formData['lightIntensityGain']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightIntensityGain']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Intensity Gain" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Radio.Group
							name="radiogroup"
							defaultValue={dataHandlerRef.current.formData['lightIlluType']}
							options={[
								{ value: ELightIlluType.ParallelLight, label: 'Parallel Light' },
								{ value: ELightIlluType.SpotLight, label: 'Spot Light' },
							]}
							onChange={(e: CheckboxChangeEvent): void => {
								const inputElement: HTMLInputElement = e.nativeEvent.target as HTMLInputElement
								onFormInputAction('lightIlluType', inputElement.value)
							}}
						/>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Ambient Light R" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.01}
							min={0}
							max={1}
							onChange={(value: number): void => {
								onFormInputAction('ambientLightR', value)
							}}
							value={dataHandlerRef.current.formData['ambientLightR']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['ambientLightR']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Ambient Light G" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.01}
							min={0}
							max={1}
							onChange={(value: number): void => {
								onFormInputAction('ambientLightG', value)
							}}
							value={dataHandlerRef.current.formData['ambientLightG']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['ambientLightG']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Ambient Light B" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.01}
							min={0}
							max={1}
							onChange={(value: number): void => {
								onFormInputAction('ambientLightB', value)
							}}
							value={dataHandlerRef.current.formData['ambientLightB']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['ambientLightB']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Ambient Light A" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.01}
							min={0}
							max={1}
							onChange={(value: number): void => {
								onFormInputAction('ambientLightA', value)
							}}
							value={dataHandlerRef.current.formData['ambientLightA']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['ambientLightA']}</div>
					</Col>
				</Row>
			</Form.Item>
			<SimpleDividingLine lineColor="#666666" />
			<Form.Item label="Projection Type" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Radio.Group
							name="radiogroup"
							defaultValue={dataHandlerRef.current.formData['projectionType']}
							options={[
								{ value: EProjectionType.PerspectiveProjection, label: 'Perspective Projection' },
								{ value: EProjectionType.OrthographicProjection, label: 'Orthographic Projection' },
							]}
							onChange={(e: CheckboxChangeEvent): void => {
								const inputElement: HTMLInputElement = e.nativeEvent.target as HTMLInputElement
								onFormInputAction('projectionType', inputElement.value)
							}}
						/>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Perspective Projection Fovy" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.5}
							min={0.1}
							max={500}
							onChange={(value: number): void => {
								onFormInputAction('perspectiveProjectionFovy', value)
							}}
							value={dataHandlerRef.current.formData['perspectiveProjectionFovy']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['perspectiveProjectionFovy']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Perspective Projection Near" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.5}
							min={0.1}
							max={500}
							onChange={(value: number): void => {
								onFormInputAction('perspectiveProjectionNear', value)
							}}
							value={dataHandlerRef.current.formData['perspectiveProjectionNear']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['perspectiveProjectionNear']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Perspective Projection Far" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.5}
							min={0.1}
							max={500}
							onChange={(value: number): void => {
								onFormInputAction('perspectiveProjectionFar', value)
							}}
							value={dataHandlerRef.current.formData['perspectiveProjectionFar']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['perspectiveProjectionFar']}</div>
					</Col>
				</Row>
			</Form.Item>
		</Form>
	)
}

export const FormControllerForward = forwardRef(FormController)

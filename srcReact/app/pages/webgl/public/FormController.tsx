import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { CheckboxChangeEvent, Col, Form, Radio, Row, Select, Slider } from 'antd'
import { SimpleDividingLine } from '@/app/componnet/simpleDividingLine'
import { ELightIlluType, EProjectionType, ERotationCalculationType, TShaderParams } from './Program'

export type TComponentDataHandlerFormDataOptional = {
	presetModelType?: string
	rotationCalculationType?: ERotationCalculationType
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
	lightColorR?: number
	lightColorG?: number
	lightColorB?: number
	lightColorA?: number
	lightIntensityGain?: number
	lightIlluType?: ELightIlluType
	lightPositionX?: number
	lightPositionY?: number
	lightPositionZ?: number
	lightDirectX?: number
	lightDirectY?: number
	lightDirectZ?: number
	ambientLightColorR?: number
	ambientLightColorG?: number
	ambientLightColorB?: number
	ambientLightColorA?: number
	projectionType?: EProjectionType
	orthoProjectionLeft?: number
	orthoProjectionRight?: number
	orthoProjectionBottom?: number
	orthoProjectionTop?: number
	orthoProjectionNear?: number
	orthoProjectionFar?: number
	perspectiveProjectionFovy?: number
	perspectiveProjectionAspect?: number
	perspectiveProjectionNear?: number
	perspectiveProjectionFar?: number
}
export type TComponentDataHandlerFormData = TShaderParams & {
	modelRotationX: number
	modelRotationY: number
	modelRotationZ: number
	modelOffsetX: number
	modelOffsetY: number
	modelOffsetZ: number
	modelScale: number
}

type TComponentDataHandler = {
	formData: TComponentDataHandlerFormData
}

const modelTypeList: Array<{
	label: string
	value: string
}> = [
	{
		label: 'Single Plane',
		value: '1',
	},
]

const formWidth: number = 550

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

export type TFormControllerComponentImperativeHandle = {
	updateFormData: (formData: TComponentDataHandlerFormDataOptional) => void
	getFormData: () => TComponentDataHandlerFormData
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
			presetModelType: formData.presetModelType || '1',
			rotationCalculationType: formData.rotationCalculationType || ERotationCalculationType.UseMatrix,
			modelRotationX: formData.modelRotationX || 0,
			modelRotationY: formData.modelRotationY || 0,
			modelRotationZ: formData.modelRotationZ || 0,
			modelOffsetX: formData.modelOffsetX || 0,
			modelOffsetY: formData.modelOffsetY || 0,
			modelOffsetZ: formData.modelOffsetZ || 0,
			modelScale: formData.modelScale || 1,
			lookEyePositionX: formData.lookEyePositionX || 0,
			lookEyePositionY: formData.lookEyePositionY || 0,
			lookEyePositionZ: formData.lookEyePositionZ || 0,
			lookAtPositionX: formData.lookAtPositionX || 0,
			lookAtPositionY: formData.lookAtPositionY || 0,
			lookAtPositionZ: formData.lookAtPositionZ || 0,
			lightColorR: formData.lightColorR || 1,
			lightColorG: formData.lightColorG || 1,
			lightColorB: formData.lightColorB || 1,
			lightColorA: formData.lightColorA || 1,
			lightIntensityGain: formData.lightIntensityGain || 0,
			lightIlluType: formData.lightIlluType || ELightIlluType.ParallelLight,
			lightPositionX: formData.lightPositionX || 0,
			lightPositionY: formData.lightPositionY || 0,
			lightPositionZ: formData.lightPositionZ || 0,
			lightDirectX: formData.lightDirectX || 0,
			lightDirectY: formData.lightDirectY || 0,
			lightDirectZ: formData.lightDirectZ || 0,
			ambientLightColorR: formData.ambientLightColorR || 0,
			ambientLightColorG: formData.ambientLightColorG || 0,
			ambientLightColorB: formData.ambientLightColorB || 0,
			ambientLightColorA: formData.ambientLightColorA || 1,
			projectionType: formData.projectionType || EProjectionType.PerspectiveProjection,
			orthoProjectionLeft: formData.orthoProjectionLeft || 0,
			orthoProjectionRight: formData.orthoProjectionRight || 0,
			orthoProjectionBottom: formData.orthoProjectionBottom || 0,
			orthoProjectionTop: formData.orthoProjectionTop || 0,
			orthoProjectionNear: formData.orthoProjectionNear || 0,
			orthoProjectionFar: formData.orthoProjectionFar || 0,
			perspectiveProjectionFovy: formData.perspectiveProjectionFovy || 0,
			perspectiveProjectionAspect: formData.perspectiveProjectionAspect || 0,
			perspectiveProjectionNear: formData.perspectiveProjectionNear || 0,
			perspectiveProjectionFar: formData.perspectiveProjectionFar || 0,
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
	const onModelTypeChangeAction = (value: string) => {
		dataHandlerRef.current.formData['presetModelType'] = value
		onChangeAction && onChangeAction('presetModelType', value)
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
			<Form.Item label="Preset Model Type" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Select
							defaultValue={modelTypeList[0].value}
							style={{ width: '100%' }}
							onChange={onModelTypeChangeAction}
							options={[...modelTypeList]}
						/>
					</Col>
				</Row>
			</Form.Item>
			<SimpleDividingLine lineColor="#666666" />
			<Form.Item label="Model Rotation Type" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Radio.Group
							name="radiogroup"
							defaultValue={dataHandlerRef.current.formData['rotationCalculationType']}
							options={[
								{ value: ERotationCalculationType.UseMatrix, label: 'Use Matrix' },
								{ value: ERotationCalculationType.UseQuaternion, label: 'Use Quaternion' },
							]}
							onChange={(e: CheckboxChangeEvent): void => {
								const inputElement: HTMLInputElement = e.nativeEvent.target as HTMLInputElement
								onFormInputAction('rotationCalculationType', inputElement.value)
							}}
						/>
					</Col>
				</Row>
			</Form.Item>
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
							min={-500}
							max={500}
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
							min={-500}
							max={500}
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
							min={-500}
							max={500}
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
							min={-500}
							max={500}
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
							min={-500}
							max={500}
							onChange={(value: number): void => {
								onFormInputAction('lookAtPositionY', value)
							}}
							value={dataHandlerRef.current.formData['lookAtPositionY']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lookAtPositionY']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Look-At Position Z" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={1}
							min={-500}
							max={500}
							onChange={(value: number): void => {
								onFormInputAction('lookAtPositionZ', value)
							}}
							value={dataHandlerRef.current.formData['lookAtPositionZ']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lookAtPositionZ']}</div>
					</Col>
				</Row>
			</Form.Item>
			<SimpleDividingLine lineColor="#666666" />
			<Form.Item label="Light Color R" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.01}
							min={0}
							max={1}
							onChange={(value: number): void => {
								onFormInputAction('lightColorR', value)
							}}
							value={dataHandlerRef.current.formData['lightColorR']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightColorR']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Color G" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.01}
							min={0}
							max={1}
							onChange={(value: number): void => {
								onFormInputAction('lightColorG', value)
							}}
							value={dataHandlerRef.current.formData['lightColorG']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightColorG']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Color B" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.01}
							min={0}
							max={1}
							onChange={(value: number): void => {
								onFormInputAction('lightColorB', value)
							}}
							value={dataHandlerRef.current.formData['lightColorB']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightColorB']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Color A" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.01}
							min={0}
							max={1}
							onChange={(value: number): void => {
								onFormInputAction('lightColorA', value)
							}}
							value={dataHandlerRef.current.formData['lightColorA']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightColorA']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Intensity Gain" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.01}
							min={0.01}
							max={10}
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
			<Form.Item label="Light Illu Type" style={{ ...formItemLineStyle }}>
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
			<Form.Item label="Light Position X" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={1}
							min={-500}
							max={500}
							onChange={(value: number): void => {
								onFormInputAction('lightPositionX', value)
							}}
							value={dataHandlerRef.current.formData['lightPositionX']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightPositionX']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Position Y" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={1}
							min={-500}
							max={500}
							onChange={(value: number): void => {
								onFormInputAction('lightPositionY', value)
							}}
							value={dataHandlerRef.current.formData['lightPositionY']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightPositionY']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Position Z" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={1}
							min={-500}
							max={500}
							onChange={(value: number): void => {
								onFormInputAction('lightPositionZ', value)
							}}
							value={dataHandlerRef.current.formData['lightPositionZ']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightPositionZ']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Direct X" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.1}
							min={-10}
							max={10}
							onChange={(value: number): void => {
								onFormInputAction('lightDirectX', value)
							}}
							value={dataHandlerRef.current.formData['lightDirectX']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightDirectX']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Direct Y" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.1}
							min={-10}
							max={10}
							onChange={(value: number): void => {
								onFormInputAction('lightDirectY', value)
							}}
							value={dataHandlerRef.current.formData['lightDirectY']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightDirectY']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Direct Z" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.1}
							min={-10}
							max={10}
							onChange={(value: number): void => {
								onFormInputAction('lightDirectZ', value)
							}}
							value={dataHandlerRef.current.formData['lightDirectZ']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightDirectZ']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Ambient Light Color R" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.01}
							min={0}
							max={1}
							onChange={(value: number): void => {
								onFormInputAction('ambientLightColorR', value)
							}}
							value={dataHandlerRef.current.formData['ambientLightColorR']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['ambientLightColorR']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Ambient Light Color G" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.01}
							min={0}
							max={1}
							onChange={(value: number): void => {
								onFormInputAction('ambientLightColorG', value)
							}}
							value={dataHandlerRef.current.formData['ambientLightColorG']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['ambientLightColorG']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Ambient Light Color B" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.01}
							min={0}
							max={1}
							onChange={(value: number): void => {
								onFormInputAction('ambientLightColorB', value)
							}}
							value={dataHandlerRef.current.formData['ambientLightColorB']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['ambientLightColorB']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Ambient Light Color A" style={{ ...formItemLineStyle }}>
				<Row>
					<Col span={24 - formItemValueShowColWidth}>
						<Slider
							step={0.01}
							min={0}
							max={1}
							onChange={(value: number): void => {
								onFormInputAction('ambientLightColorA', value)
							}}
							value={dataHandlerRef.current.formData['ambientLightColorA']}
						/>
					</Col>
					<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['ambientLightColorA']}</div>
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
			{dataHandlerRef.current.formData['projectionType'] === EProjectionType.OrthographicProjection ? (
				<>
					<Form.Item label="Ortho Projection Near" style={{ ...formItemLineStyle }}>
						<Row>
							<Col span={24 - formItemValueShowColWidth}>
								<Slider
									step={1}
									min={-500}
									max={0}
									onChange={(value: number): void => {
										onFormInputAction('orthoProjectionNear', value)
									}}
									value={dataHandlerRef.current.formData['orthoProjectionNear']}
								/>
							</Col>
							<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
								<div>{dataHandlerRef.current.formData['orthoProjectionNear']}</div>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="Ortho Projection Far" style={{ ...formItemLineStyle }}>
						<Row>
							<Col span={24 - formItemValueShowColWidth}>
								<Slider
									step={1}
									min={1}
									max={500}
									onChange={(value: number): void => {
										onFormInputAction('orthoProjectionFar', value)
									}}
									value={dataHandlerRef.current.formData['orthoProjectionFar']}
								/>
							</Col>
							<Col span={formItemValueShowColWidth} style={{ ...formItemValueShowColStyle }}>
								<div>{dataHandlerRef.current.formData['orthoProjectionFar']}</div>
							</Col>
						</Row>
					</Form.Item>
				</>
			) : (
				<>
					<Form.Item label="Perspective Projection Fovy" style={{ ...formItemLineStyle }}>
						<Row>
							<Col span={24 - formItemValueShowColWidth}>
								<Slider
									step={0.1}
									min={1}
									max={90}
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
									step={1}
									min={1}
									max={100}
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
									step={1}
									min={100}
									max={10000}
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
				</>
			)}
		</Form>
	)
}

export const FormControllerForward = forwardRef(FormController)

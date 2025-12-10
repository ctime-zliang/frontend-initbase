import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { CheckboxChangeEvent, Col, Form, Radio, Row, Select, Slider } from 'antd'
import { SimpleDividingLine } from '@/app/componnet/simpleDividingLine'
import { TProgramShaderParams } from '../../webgl/program/Program'
import { ELightIlluType, EProjectionType, ERotationCalculationType } from '../config/config'

const formProfile: {
	clientWidth: number
	formItemLineStyle: React.CSSProperties
	formItemValueShowColStyle: React.CSSProperties
	formItemValueShowColSize: number
} = {
	clientWidth: 550,
	formItemLineStyle: {
		margin: '0 0 5px 0',
	},
	formItemValueShowColStyle: {
		display: 'flex',
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
	},
	formItemValueShowColSize: 4,
}

export type TComponentDataHandlerFormData = TProgramShaderParams & {
	modelRotationX: number
	modelRotationY: number
	modelRotationZ: number
	modelOffsetX: number
	modelOffsetY: number
	modelOffsetZ: number
	modelScale: number
}

export type TFormControllerComponentImperativeHandle = {
	updateFormData: (formData: TComponentDataHandlerFormData) => void
	getFormData: () => TComponentDataHandlerFormData
}

type TComponentDataHandler = {
	formData: TComponentDataHandlerFormData
}
type TComponentStatusHandler = {
	statusData: {
		lightPositionXDisabled: boolean
		lightPositionYDisabled: boolean
		lightPositionZDisabled: boolean
	}
}
type TProps = {
	modelTypeList: Array<{
		label: string
		value: string
	}>
	onChangeAction?: (key: keyof TProgramShaderParams, value: any) => void
}
function FormController(props: TProps, ref: any): React.ReactElement {
	const { modelTypeList, onChangeAction } = props
	const [flush, setFlush] = useState<number>(0)
	const dataHandlerRef: { current: TComponentDataHandler } = useRef<TComponentDataHandler>({
		formData: Object.create(null!),
	})
	const statusHandlerRef: { current: TComponentStatusHandler } = useRef<TComponentStatusHandler>({
		statusData: {
			lightPositionXDisabled: false,
			lightPositionYDisabled: false,
			lightPositionZDisabled: false,
		},
	})
	const onFormInputAction = (key: keyof TComponentDataHandlerFormData, value: any): void => {
		if (typeof dataHandlerRef.current.formData[key] !== 'undefined') {
			;(dataHandlerRef.current.formData[key] as any) = value
			onChangeAction && onChangeAction(key as keyof TProgramShaderParams, value)
		}
		if (key === 'rotationCalculationType') {
			dataHandlerRef.current.formData['modelRotationX'] =
				dataHandlerRef.current.formData['modelRotationY'] =
				dataHandlerRef.current.formData['modelRotationZ'] =
					0
			onChangeAction && onChangeAction('modelRotationX' as keyof TProgramShaderParams, 0)
			onChangeAction && onChangeAction('modelRotationY' as keyof TProgramShaderParams, 0)
			onChangeAction && onChangeAction('modelRotationZ' as keyof TProgramShaderParams, 0)
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
	statusHandlerRef.current.statusData.lightPositionXDisabled =
		statusHandlerRef.current.statusData.lightPositionYDisabled =
		statusHandlerRef.current.statusData.lightPositionZDisabled =
			dataHandlerRef.current.formData.lightIlluType === ELightIlluType.ParallelLight
	useImperativeHandle(ref, (): TFormControllerComponentImperativeHandle => {
		return {
			updateFormData(formData: TComponentDataHandlerFormData) {
				const keys: Array<string> = Object.keys(formData)
				for (let i: number = 0; i < keys.length; i++) {
					const key: string = keys[i]
					;(dataHandlerRef.current.formData as any)[key] = (formData as any)[key]
				}
				setFlush((prev: number): number => {
					return prev + 1
				})
			},
			getFormData(): TComponentDataHandlerFormData {
				return { ...dataHandlerRef.current.formData }
			},
		}
	})
	if (!Object.keys(dataHandlerRef.current.formData).length) {
		return (
			<div
				style={{
					width: `${formProfile.clientWidth}px`,
					height: '100%',
					overflow: 'auto',
					display: 'flex',
					justifyContent: 'center',
					alignContent: 'center',
					alignItems: 'center',
					userSelect: 'none',
				}}
			>
				loading...
			</div>
		)
	}
	return (
		<Form
			labelCol={{ span: 6 }}
			wrapperCol={{ span: 18 }}
			layout="horizontal"
			disabled={false}
			style={{
				width: `${formProfile.clientWidth}px`,
				height: '100%',
				overflow: 'auto',
				userSelect: 'none',
			}}
		>
			<Form.Item label="Preset Model Type" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
			<Form.Item label="Model Rotation Type" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
			<Form.Item label="Model Rotation X" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['modelRotationX']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Model Rotation Y" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['modelRotationY']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Model Rotation Z" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['modelRotationZ']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Model Offset X" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['modelOffsetX']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Model Offset Y" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['modelOffsetY']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Model Offset Z" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['modelOffsetZ']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Model Scale" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
						<Slider
							step={0.1}
							min={0.1}
							max={20}
							onChange={(value: number): void => {
								onFormInputAction('modelScale', value)
							}}
							value={dataHandlerRef.current.formData['modelScale']}
						/>
					</Col>
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['modelScale']}</div>
					</Col>
				</Row>
			</Form.Item>
			<SimpleDividingLine lineColor="#666666" />
			<Form.Item label="Look-Eye Position X" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lookEyePositionX']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Look-Eye Position Y" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lookEyePositionY']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Look-Eye Position Z" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lookEyePositionZ']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Look-At Position X" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lookAtPositionX']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Look-At Position Y" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lookAtPositionY']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Look-At Position Z" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lookAtPositionZ']}</div>
					</Col>
				</Row>
			</Form.Item>
			<SimpleDividingLine lineColor="#666666" />
			<Form.Item label="Light Color R" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightColorR']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Color G" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightColorG']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Color B" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightColorB']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Color A" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightColorA']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Intensity Gain" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightIntensityGain']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Illu Type" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
			<Form.Item label="Light Position X" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
						<Slider
							step={1}
							min={-500}
							max={500}
							disabled={statusHandlerRef.current.statusData.lightPositionXDisabled}
							onChange={(value: number): void => {
								onFormInputAction('lightPositionX', value)
							}}
							value={dataHandlerRef.current.formData['lightPositionX']}
						/>
					</Col>
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightPositionX']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Position Y" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
						<Slider
							step={1}
							min={-500}
							max={500}
							disabled={statusHandlerRef.current.statusData.lightPositionYDisabled}
							onChange={(value: number): void => {
								onFormInputAction('lightPositionY', value)
							}}
							value={dataHandlerRef.current.formData['lightPositionY']}
						/>
					</Col>
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightPositionY']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Position Z" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
						<Slider
							step={1}
							min={-500}
							max={500}
							disabled={statusHandlerRef.current.statusData.lightPositionZDisabled}
							onChange={(value: number): void => {
								onFormInputAction('lightPositionZ', value)
							}}
							value={dataHandlerRef.current.formData['lightPositionZ']}
						/>
					</Col>
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightPositionZ']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Direct X" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightDirectX']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Direct Y" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightDirectY']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Light Direct Z" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['lightDirectZ']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Ambient Light Color R" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['ambientLightColorR']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Ambient Light Color G" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['ambientLightColorG']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Ambient Light Color B" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['ambientLightColorB']}</div>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item label="Ambient Light Color A" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
						<div>{dataHandlerRef.current.formData['ambientLightColorA']}</div>
					</Col>
				</Row>
			</Form.Item>
			<SimpleDividingLine lineColor="#666666" />
			<Form.Item label="Projection Type" style={{ ...formProfile.formItemLineStyle }}>
				<Row>
					<Col span={24 - formProfile.formItemValueShowColSize}>
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
					<Form.Item label="Ortho Projection Near" style={{ ...formProfile.formItemLineStyle }}>
						<Row>
							<Col span={24 - formProfile.formItemValueShowColSize}>
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
							<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
								<div>{dataHandlerRef.current.formData['orthoProjectionNear']}</div>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="Ortho Projection Far" style={{ ...formProfile.formItemLineStyle }}>
						<Row>
							<Col span={24 - formProfile.formItemValueShowColSize}>
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
							<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
								<div>{dataHandlerRef.current.formData['orthoProjectionFar']}</div>
							</Col>
						</Row>
					</Form.Item>
				</>
			) : (
				<>
					<Form.Item label="Perspective Projection Fovy" style={{ ...formProfile.formItemLineStyle }}>
						<Row>
							<Col span={24 - formProfile.formItemValueShowColSize}>
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
							<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
								<div>{dataHandlerRef.current.formData['perspectiveProjectionFovy']}</div>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="Perspective Projection Near" style={{ ...formProfile.formItemLineStyle }}>
						<Row>
							<Col span={24 - formProfile.formItemValueShowColSize}>
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
							<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
								<div>{dataHandlerRef.current.formData['perspectiveProjectionNear']}</div>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item label="Perspective Projection Far" style={{ ...formProfile.formItemLineStyle }}>
						<Row>
							<Col span={24 - formProfile.formItemValueShowColSize}>
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
							<Col span={formProfile.formItemValueShowColSize} style={{ ...formProfile.formItemValueShowColStyle }}>
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

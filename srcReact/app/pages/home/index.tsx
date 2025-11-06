import React from 'react'
import styled from 'styled-components'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import LinkRoot from './link'
import ClockCanvas from '../../componnet/clockCanvas'

const HomeContainer = styled.section`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	align-content: space-between;
	height: 100%;
	overflow: hidden;
	opacity: 1;
`
const HomeContent = styled.div`
	width: 100%;
	height: 100%;
	overflow: auto;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-content: center;
	align-items: center;
	flex-wrap: nowrap;
`
const ClockcanvasWrapper = styled.div`
	padding: 100px 0 0 0;
`

function HomePageRoot(props: any): React.ReactElement {
	console.log(`HomeRoot ☆☆☆`, props)
	const useParamsRes = useParams()
	console.log(`useParams`, useParamsRes)
	const useNavigateRes = useNavigate()
	console.log(`useNavigate`, useNavigateRes)
	const useSearchParamsRes = useSearchParams()
	console.log(`useSearchParams`, useSearchParamsRes)
	return (
		<>
			<HomeContainer>
				<HomeContent>
					<ClockcanvasWrapper>
						<ClockCanvas />
					</ClockcanvasWrapper>
					<LinkRoot />
				</HomeContent>
			</HomeContainer>
		</>
	)
}

export default React.memo(HomePageRoot)

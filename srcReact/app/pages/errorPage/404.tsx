import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Err404Content = styled.div`
	font-size: 36px;
	text-align: center;
	line-height: 5;
	color: #444444;
`

function Error404PageRoot(): React.ReactElement {
	return (
		<>
			<Err404Content>404 Not Found</Err404Content>
			<div style={{ textAlign: 'center' }}>
				<Link to={`/`}>Link to Home Page</Link>
			</div>
		</>
	)
}

export default React.memo(Error404PageRoot)

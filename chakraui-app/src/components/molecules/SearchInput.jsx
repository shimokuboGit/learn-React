import styled from 'styled-components'
import { Input } from '../atoms/button/Input'
import { PrimaryButton } from '../atoms/button/PrimaryButton'

export const SearchInput = (props) => {
	const { placeholder = "" } = props
	return (
		<SContainer>
			<Input placeholder={placeholder}/>
			<SButtonWrapper>
				<PrimaryButton>検索</PrimaryButton>
			</SButtonWrapper>
		</SContainer>
	)
}

const SContainer = styled.div`
	display: flex;
	align-items: center;
`

const SButtonWrapper = styled.div`
	padding-left: 8px;
`
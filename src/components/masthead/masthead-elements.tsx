import styled from 'styled-components';

export const SiteHeader = styled.header`
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	width: 100vw;
	height: 70px;
	background: white;

`;

export const SiteHeaderBackground = styled.header`
	position: relative;
	top: 0;
	left: 0;
	width: 100vw;
	height: 50px;

	background: ${({ theme }) => theme.mastheadBg};
`;

export const SiteHeaderOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;

	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;

	color: ${({ theme }) => theme.mastheadColor};
	font-size: 20px;
`;
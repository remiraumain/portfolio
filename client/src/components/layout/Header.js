import React from 'react';
import styled from 'styled-components';
import Logo from '../Logo';
import Streamer from '../Streamer';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

function Header() {
    return (
        <Wrapper className={'Header'}>
            <Logo />
            <Streamer quote={'Welcome to my portfolio'}/>
        </Wrapper>
    );
}

export default Header;
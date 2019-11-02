import React from 'react';
import styled from 'styled-components';

const Container = styled.a`
    width: ${props => props.width > 0 ? props.width + 'vw' : '100%'};
    height: ${props => props.height > 0 ? props.height + 'vh' : '100%'};
    ${props => props.top > 0 && 'margin-top: ' + props.top + 'vh;'}
    ${props => props.bottom > 0 && 'margin-bottom: ' + props.bottom + 'vh;'}
    ${props => props.horizontal > 0 && 'margin-right: ' + props.horizontal + 'vw;'}
    ${props => props.horizontal > 0 && 'margin-left: ' + props.horizontal + 'vw;'}
    display: block;
    border-radius: 2%;
    overflow: hidden;
    cursor: unset;
`;

const Background = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover; 
    
    ${props => props.hover ? 'filter: grayscale(100%);' : '' }
    ${props => props.hover ? 'transition: filter .5s ease-in-out;' : '' }
    :hover {
        ${props => props.hover ? 'filter: grayscale(0%);' : '' }
        
    }
`;

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function Card(props) {
    //console.log(props);

    let random = 0;

    let top = 0;
    let bottom = 0;
    let horizontal = 0;

    if (props.randomize) {
        random = getRandom(3, 6);
        top = Math.floor(getRandom(0, 15));
        bottom = Math.floor(getRandom(1, 15));
        horizontal = Math.floor(getRandom(2, 8));
    }

    return(
        <Container
            className={'Card'}
            href={props.link}
            width={random * 5}
            height={random * 12}
            horizontal={horizontal}
            top={top}
            bottom={bottom}
        >
            <Background src={props.file} hover={props.hover}/>
        </Container>
    );
}

export default Card;
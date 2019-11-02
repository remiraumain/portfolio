import React, {useContext} from 'react';
import { ReactComponent as Icon } from '../assets/images/Logo.svg';
import styled from 'styled-components';
import ThemeContext from "../contexts/ThemeContext";

const LogoIcon = styled(Icon)`
    height: 50vh;
    
    & path {
        pointer-events: bounding-box;
    }
    
    & > g:hover path {
        fill: ${ props => props.darkmode ? 'rgba(255,255,5,.9)' : 'rgba(254, 69, 68, .9)' };
        stroke: ${ props => props.darkmode ? 'rgba(255,255,5,.9)' : 'rgba(254, 69, 68, .9)' };
    }
    
    @media (max-width: 768px) {
        height: 40vh;
        padding-right: 15vw;
    }
`;

function Logo() {
    const { dark, toggle } = useContext(ThemeContext);

    return(
        <div className={'Logo'}>
            <LogoIcon
                onClick={toggle}
                darkmode={dark ? 1 : 0}
            />
        </div>
    );
}

export default Logo;


/*
& > g path {
    fill: ${ props => props.themeMode ? 'white' : 'lightgray' };
    stroke: ${ props => !props.themeMode ? 'white' : 'black' };
}
 */
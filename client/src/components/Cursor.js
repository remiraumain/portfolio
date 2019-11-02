import React, {useContext, useState, useRef} from 'react';
import styled from 'styled-components';
import { useTrail, useSpring, animated } from 'react-spring';
import ThemeContext from "../contexts/ThemeContext";

const Button = styled(animated.button)`
    width: 55px;
    height: 55px;
    border: 1px solid ${props => props.darkmode ? 'white' : 'black'};
    border-radius: 100%;
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    left: 10%;
    color: ${props => props.darkmode ? 'white' : 'black'};
    cursor: pointer;
    background: transparent;
    z-index: 3;
    
    :hover {
        color: ${props => props.darkmode ? 'rgba(255,255,5,.9)' : 'rgba(254, 69, 68, .9)'};
        border: 1px solid ${props => props.darkmode ? 'rgba(255,255,5,.9)' : 'rgba(254, 69, 68, .9)'};
    }
`;

const Dot = styled(animated.div)`
    width: 10px;
    height: 10px;
    border-radius: 100%;
    overflow: hidden;
    position: fixed;
    pointer-events: none;
    z-index: 2;
    background: ${props => props.darkmode ? 'rgba(255,255,5,.9)' : 'rgba(254, 69, 68, .9)'};
    opacity: ${props => props.visible ? 1 : 0}
`;

const Circle = styled(animated.div)`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    overflow: hidden;
    position: fixed;
    pointer-events: none;
    z-index: 1;
    border: 1px solid ${props => props.darkmode ? 'white' : 'black'};
    opacity: ${props => props.visible ? 1 : 0};
`;

export default function Cursor() {
    const [visible, setVisible] = useState(false);
    const { dark } = useContext(ThemeContext);
    const buttonEl = useRef(null);

    const handleVisible = () => {
        setVisible(true);
    };

    if (visible) {
        buttonEl.current.style.display = 'none';
        document.body.style.cursor = 'none';
    }

    /* Cursor button entry animation */
    const props = useSpring({
        from: { left: '-10%' },
        to: { left: '10%' },
        config: { duration: 500  }
    });

    /* cursor moving animation */
    const fast = { tension: 1200, friction: 30 };
    const slow = { mass: 5, tension: 600, friction: 85 };
    const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

    const [trail, set] = useTrail(2, () => (
        { xy: [-100, -100], config: i => (i === 0 ? fast : slow) })
    );

    document.addEventListener("mousemove", e => set({ xy: [e.clientX, e.clientY] }));

    return(
        <div>
            <Button
                onClick={handleVisible}
                style={props}
                ref={buttonEl}
                darkmode={dark ? 1 : 0}
            >
                Click me
            </Button>
            {trail.map((props, index) => {
                if (index === 0) {
                    return <Dot
                        key={index}
                        style={{transform: props.xy.interpolate(trans)}}
                        darkmode={dark ? 1 : 0}
                        visible={visible ? 1 : 0}
                    />
                } else {
                    return <Circle
                        key={index}
                        style={{transform: props.xy.interpolate(trans)}}
                        darkmode={dark ? 1 : 0}
                        visible={visible ? 1 : 0}
                    />
                }
            })}
        </div>
    )
}


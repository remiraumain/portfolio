import React, { useRef } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const Wrapper = styled.div`
    position: fixed;
    height: 20vw;
    width: 100vh;
    transform: rotate(-90deg) translateY(calc(50vw - 10vw));
`;

const Text = styled(animated.p)`
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 2px;
    font-size: 20vh;
    font-weight: bold;
    top: 50%;
    left: 0;
    margin: 0;
    transform: translateY(-50%);
    white-space: nowrap;
    letter-spacing: .25rem;
    position: absolute;
    user-select: none;
`;

function Streamer({quote}) {

    const pEl = useRef(null);

    const props = useSpring({
        from: { left: window.innerHeight*0.05, top: '130%'},

        to: async (next) => {
            await next({ top: '60%', config: { duration: 500 } });
            await next( {config: { duration: 2000 } });
            await next({ left: -pEl.current.clientWidth , config: { duration: quote.length*400 }});
            await next({ left: pEl.current.clientWidth, config: { duration: 0 }});
            while (1) {
                await next({ left: -pEl.current.clientWidth, config: { duration: quote.length*650 }});
                await next({ left: pEl.current.clientWidth, config: { duration: 0 }});
            }
        }
    });

    return(
        <Wrapper className={'Streamer'}>
            <Text ref={pEl} style={props}>{quote}</Text>
        </Wrapper>

    );
}

Streamer.defaultProps = {
    quote: 'Hello world!'
};

export default Streamer;

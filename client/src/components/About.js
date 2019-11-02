import React, {useContext} from 'react';
import styled from 'styled-components';
import Card from "./shared/Card";
import Image from '../assets/images/profile.jpeg';
import ProjectsContext from "../contexts/ProjectsContext";
import ThemeContext from "../contexts/ThemeContext";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5vh 13vw 20vh 13vw;
    height: 100vh;
`;

const TextContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Text = styled.p`
    width: 100%;
    font-size: 1.2em
    text-align: justify;
`;

const List = styled.ul`
    color: ${props => props.darkmode ? '#3b3b3b' : '#c1c1c1'};
    list-style: none;
    & > li {
        display: flex;
        align-items: center;
        white-space: nowrap;
        font-style: oblique;
    }
`;

const Number = styled.span`
    font-size: 7em;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 1px;
    margin-right: 10%;
    font-style: normal;
`;

const ImageContainer = styled.div`
    width: 40%;
    height: 60%;
    margin-top: 2vh;
`;

function About() {

    const { dark } = useContext(ThemeContext);
    const { delivered, upcoming } = useContext(ProjectsContext);

    return (
        <Wrapper className={'About'}>
            <TextContainer>
                <Text>
                    Hey there!
                    <br/>
                    <br/>
                    I’m Rémi Raumain, a creative web developer from Bordeaux, France. This portfolio showcases my work and presents to you my upcoming projects. So take a look and let me know what you think about it in the contact section.
                </Text>
                <List darkmode={dark}>
                    <li><Number>{delivered.length}</Number> Projects</li>
                    <li><Number>{upcoming.length}</Number> Upcoming projects</li>
                </List>
            </TextContainer>
            <ImageContainer>
                <Card file={Image} hover={true} randomize={false} />
            </ImageContainer>

        </Wrapper>
    );
}

export default About;
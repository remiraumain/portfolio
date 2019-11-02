import React, {useContext} from 'react';
import ProjectsContext from "../../contexts/ProjectsContext";
import ThemeContext from "../../contexts/ThemeContext";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5vh 13vw 20vh 13vw;
    height: 100vh;
`;

function About() {

    const { dark } = useContext(ThemeContext);
    const { delivered, upcoming } = useContext(ProjectsContext);

    return (
        <Wrapper className={'About'}>
            hey
        </Wrapper>
    );
}
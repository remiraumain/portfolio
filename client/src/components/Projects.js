import React, { useContext } from 'react';
import styled from 'styled-components';
import Card from './shared/Card';
import ThemeContext from "../contexts/ThemeContext";
import ProjectsContext from "../contexts/ProjectsContext";

const Container = styled.div`  
    display: flex;
    flex-wrap: wrap;
    padding: 20vh 13vw 7vh 13vw;
    justify-content: space-around;
    position: relative;
`;

const TitleContainer = styled.div`
    position: absolute;
    top: 0;
    left: 10%;
`;

const Title = styled.div`
    position: relative;
    text-align: center;
    width: 30vw;
    &:first-child {
     white-space: nowrap;
     font-size: 1.5em;
    }
    
    & > hr {
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        left: 0;
        right: 0;
        margin: 0;
        border: 0;
        border-top: 2px solid ${props => props.themeMode ? 'white' : 'black'};
    }
`;

function Projects() {

    const { dark } = useContext(ThemeContext);
    const { delivered, upcoming } = useContext(ProjectsContext);


    function createCards(projects, title) {
        return (
            <Container key={title}>
                <TitleContainer>
                    <Title themeMode={dark}><hr/><h2>{title}</h2></Title>
                </TitleContainer>
                {projects.map(project => {
                    return (
                        <Card
                            key={project._id}
                            file={project.files[0].path}
                            link={'http://localhost:9000/projects/' + project._id}
                            hover={true}
                            randomize={true}
                        />
                    )
                })}
            </Container>
        )
    }

    const content = () => {
        return [delivered, upcoming].map((projects, index) => {
            const title = index === 0 ? 'Projects' : 'Upcoming projects';
            return createCards(projects, title, index);
        })
    };

    return (
        <div className={'Projects'}>
            {content()}
        </div>
    );
}

export default Projects;
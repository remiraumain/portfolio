import React, { useState, useEffect } from 'react';

const ProjectsContext = React.createContext({
    projects: [],
    delivered: [],
    upcoming: [],
    error: {}
});

export default ProjectsContext;


export function ProjectsProvider (props) {

    const [projects, setProjects] = useState({});
    const [error, setError] = useState({});


    async function fetchData() {
        const res = await fetch("http://localhost:9000/projects");
        res
            .json()
            .then(res => setProjects(res))
            .catch(err => setError(err));

    }


    let delivered = [];
    let upcoming = [];
    Object.entries(projects).forEach(project => {
        project = project[1];
        if (project.date === null) {
            upcoming.push(project);
        } else {
            delivered.push(project);
        }
    });

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ProjectsContext.Provider value={{
            projects,
            delivered,
            upcoming,
            error,
        }}>
            {props.children}
        </ProjectsContext.Provider>
    )
}

/*

 */
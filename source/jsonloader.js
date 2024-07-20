import { loadData, loadProjectData } from "./main.js";

let xhr = new XMLHttpRequest();

let projectData = '';

let projectDescSection = document.querySelector(".project-details");

xhr.onload = () => {
    if (xhr.status === 200) {
        projectData = JSON.parse(xhr.responseText);
        console.log(projectData);
        let projectSection = document.querySelector('.feature')
        if (projectSection) loadData();
        else if(projectDescSection) loadProjectData();
    }
}

xhr.open('GET', 'source/projects.json');
xhr.send();

export { projectData };


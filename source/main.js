import { projectData } from "./jsonloader.js";
import * as projectPanel from './projectPanel.js';

let featureSection = document.querySelector(".feature");

let predefProject;

// if (url.includes("project=")) {
//     let sstring = url.substring(url.indexOf("=") + 1);
//     predefProject = sstring.split("%20").join(' ');
// }
document.getElementById("hamburger-icon").addEventListener("click", toggleMenu);

export function toggleMenu(){
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("active"); // Toggle the 'active' class
}

export function loadData()
{
    projectData.projects.forEach(project => {
        let panel = new projectPanel.ProjectPanel(project.name, project.coverImage, projectData.projects.indexOf(project));
        featureSection.appendChild(panel);
    });
}

export function loadProjectData(){

    let index = window.localStorage.getItem("wj3482-projectIndex");
    let previousIndex = window.localStorage.getItem("wj3482-previousProjectIndex");

    if (predefProject) {
        let newProject = loader.projectData.projects.find(project => project.name == predefProject);
        index = loader.projectData.projects.indexOf(newProject);
        window.localStorage.setItem("wj3482-projectIndex", index);
    }
    else if (previousIndex != "-1") {
        window.localStorage.setItem("wj3482-projectIndex", previousIndex);
        window.localStorage.setItem("wj3482-previousProjectIndex", "-1");
    }

    let project = projectData.projects[index];

    let type = project.type;
    let details = document.querySelector(".project-details"); 
    let name = project.name;
    let desc = project.overview;
    let images = project.imageGallery;
    let role = project.role;
    let timeline = project.timeSpent;
    let engine = project.engine;
    let tools = project.tools;
    let responsibilities = project.responsibilities;
    let link = project.link;
    let links = project.links;
    
    document.querySelector(".project-name").textContent = name;

    if(type == "game"){
        document.querySelector(".project-details").style.margin = "auto 8%";
        let parent = document.createElement("div");
        parent.classList.add("parent-text");
        let body = document.createElement("div");
        body.classList.add("project-desc");
        if(desc){
            let container = document.createElement("div");
            let header = document.createElement("h2");
            container.classList.add("overview");
            header.innerHTML = "Overview: ";
            container.appendChild(header);
            let overText = document.createElement("p");
            overText.innerHTML = desc;
            container.appendChild(overText);
            parent.appendChild(container);
        }
        if(role){
            let container = document.createElement("div");
            let header = document.createElement("h2");
            container.classList.add("subTitle");
            header.innerHTML = "Role: ";
            container.appendChild(header);
            let roleText = document.createElement("p");
            roleText.innerHTML = role;
            container.appendChild(roleText);
            parent.appendChild(container);
        }
        if(engine){
            let container = document.createElement("div");
            let header = document.createElement("h2");
            container.classList.add("subTitle");
            header.innerHTML = "Engine: ";
            container.appendChild(header);
            let engineText = document.createElement("p");
            engineText.innerHTML = engine;
            container.appendChild(engineText);
            parent.appendChild(container);
        }
        if(tools){
            let container = document.createElement("div");
            let header = document.createElement("h2");
            container.classList.add("subTitle");
            header.innerHTML = "Tool(s) Used: ";
            container.appendChild(header);
            let toolText = document.createElement("p");
            toolText.innerHTML = tools;
            container.appendChild(toolText);
            parent.appendChild(container);
        }
        if(timeline){
            let container = document.createElement("div");
            let header = document.createElement("h2");
            container.classList.add("subTitle");
            header.innerHTML = "Time Spent: ";
            container.appendChild(header);
            let timeText = document.createElement("p");
            timeText.innerHTML = timeline;
            container.appendChild(timeText);
            parent.appendChild(container);
        }
        if(link){
            let container = document.createElement("div");
            container.classList.add("subTitle");
            let linkText = document.createElement("a");
            linkText.href = link;
            linkText.target = "blank";
            linkText.innerHTML = "Link to Game/Youtube";
            container.appendChild(linkText);
            parent.appendChild(container);
        }
        
        if(responsibilities){
            let container = document.createElement("div");
            let header = document.createElement("h2");
            header.innerHTML = "Responsibilities:";
            let resp = document.createElement("p");
            container.classList.add("responsibility");
            resp.innerHTML = responsibilities;
            container.appendChild(header);
            container.appendChild(resp);
            parent.appendChild(container);
        }
        body.appendChild(parent);
        details.appendChild(body);
        if(images){
            let gallery = document.createElement("div");
            gallery.classList.add("gallery");
            details.appendChild(gallery);

            let column = document.createElement("div");
            column.classList.add("game-column");
            gallery.appendChild(column);

            let columns = document.querySelectorAll(".game-column");
            for(let i = 0; i < images.length;i++){
                
                let container = document.createElement("div");
    
                let img = document.createElement("img");
                
                img.setAttribute("src", images[i].url);
                container.classList.add("imgs");
                container.appendChild(img);

                if(images[i].subtitle){
                    let caption = document.createElement("p");
                    caption.innerHTML = images[i].subtitle;
                    container.appendChild(caption);
                }
    
                columns[i%columns.length].appendChild(container);
            }
            body.appendChild(gallery);
        }
    }
    else if(type == "showcase"){
        let body = document.createElement("div");
        body.classList.add("project-desc");
        if(desc){
            let container = document.createElement("div");
            container.classList.add("showcase-overview");
            let overText = document.createElement("p");
            overText.innerHTML = desc;
            container.appendChild(overText);
            body.appendChild(container);
        }
        details.appendChild(body);
        if(images){
            let gallery = document.createElement("div");
            gallery.classList.add("gallery");
            details.appendChild(gallery);
            function populateGallery(){
                gallery.innerHTML ="";

                let isSmallScreen = window.innerWidth < 501;

                if(isSmallScreen){
                    let column = document.createElement("div");
                    gallery.appendChild(column);
                    column.classList.add("column");

                    images.forEach(image=>{
                        let container = document.createElement("div");
                        container.classList.add("imgs");

                        let img = document.createElement("img");
                        img.setAttribute("src", image.url);
                        container.appendChild(img);

                        column.appendChild(container);
                    })
                }
                else{
                    for(let i = 0; i < 3;i++){
                        let column = document.createElement("div");
                        column.classList.add("column");
                        gallery.appendChild(column);
                    }

                    let columns = document.querySelectorAll(".column");
                    for(let i = 0; i < images.length;i++){
                        
                        let container = document.createElement("div");
        
                        let img = document.createElement("img");
                        
        
                        img.setAttribute("src", images[i].url);
                        
        
                        container.classList.add("imgs");
                        
                        container.appendChild(img);
        
                        columns[i%columns.length].appendChild(container);
                    }
                }
            }
            populateGallery();
            window.addEventListener("resize", populateGallery);
           
        }
    }
    else if(type == "links"){
        let body = document.createElement("div");
        body.classList.add("project-desc");
        if(desc){
            let container = document.createElement("div");
            container.classList.add("showcase-overview");
            let overText = document.createElement("p");
            overText.innerHTML = desc;
            container.appendChild(overText);
            body.appendChild(container);
        }
        details.appendChild(body);
        if(links){
            let encompass = document.createElement("div");
            encompass.classList.add("group-links")
            for(let i = 0; i < links.length; i++){
                let container = document.createElement("div");
                let title = document.createElement("h1");
                let date = document.createElement("h1");
                let bio = document.createElement("p");
                let link = document.createElement("a");
                title.innerHTML = links[i].title;

                date.classList.add("work-date");
                date.innerHTML = links[i].date;
                
                bio.classList.add("work-bio");
                bio.innerHTML = links[i].bio;

                link.classList.add("document-link");
                link.target = "blank";
                link.setAttribute("href", links[i].link);
                link.innerHTML = "Link to Document";

                container.appendChild(title);
                container.appendChild(date);
                container.appendChild(bio);
                container.appendChild(link);
                encompass.appendChild(container);
            }

            body.appendChild(encompass);

        }
    }
    
   
}


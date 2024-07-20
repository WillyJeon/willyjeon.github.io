const template = `
<link rel="stylesheet" href="./css/styles.css">
<link rel="stylesheet" href="./css/newstyles.css">

<div class="feature-item">
        <img class="img-preview" src="./img/ninjas-gameplay.gif">
        <div class="overlay">Projects</div>
</div>
`

class ProjectPanel extends HTMLElement {
    constructor(name, coverImage, index) {
        super();

        this.name = name;
        this.coverImage = coverImage;
        this.index = index; 
        //this.trailer = trailer;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template;
    }

    connectedCallback() {

        if(this.icon == undefined) this.icon = "media/def-icon.png";

        this.shadowRoot.querySelector('.img-preview').src = this.coverImage;
        this.shadowRoot.querySelector('.overlay').innerHTML = this.name;

        this.shadowRoot.querySelector('.feature-item').onclick = () => {
            location.href = "project.html";
            
            window.localStorage.setItem("wj3482-projectIndex", this.index);
            window.localStorage.setItem("wj3482-previousProjectIndex", "-1");
        }

        this.shadowRoot.querySelector('.feature-item').style.cursor = "pointer";
    }
}

customElements.define('project-panel', ProjectPanel);

export { ProjectPanel };
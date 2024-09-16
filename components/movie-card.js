class MovieCard extends HTMLElement {
    constructor() {
        super(); 
        const template = document.getElementById('movie-card-template');
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute('title');
        const description = this.getAttribute('description');
        
        this.shadowRoot.querySelector('h3').textContent = title;
        this.shadowRoot.querySelector('p').textContent = description;
    }
    
    static get observedAttributes() {
        return ['title','description'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.connectedCallback();
    }
}

customElements.define('movie-card', MovieCard);
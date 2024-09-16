class MovieList extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('movie-list-template');
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
        this._movies = [];
        // const subscribe = this.getAttribute('subscribe');
        // subscribe(this.render.bind(this));
    }

    get movies() {
        return this._movies;
    }

    set movies(value) {
        this._movies = value;
    }

    connectedCallback() {

        // this.shadowRoot.innerHTML = `<p>helllo</p>`
        const container = this.shadowRoot.getElementById('items-container');
       
        container.innerHTML = '';  // Clear existing items

        
        this.movies
            .forEach(item => {
                const itemElement = document.createElement('movie-card');
                itemElement.setAttribute('title', item.title);
                itemElement.setAttribute('description', item.description);
                container.appendChild(itemElement);
        });
    }

    render() {
        const container = this.shadowRoot.getElementById('items-container');
        
        container.innerHTML = '';  // Clear existing items
        
        this.movies
            // .filter(movie => movie.title.toLowerCase().includes(searchString.toLowerCase()))
            .forEach(item => {
                const itemElement = document.createElement('movie-card');
                itemElement.setAttribute('title', item.title);
                itemElement.setAttribute('description', item.description);
                container.appendChild(itemElement);
        });
    }

    static get observedAttributes() {
        return ['searchString'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }
}

customElements.define('movie-list', MovieList);
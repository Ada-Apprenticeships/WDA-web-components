console.log('running the app...');

const state = {
    films: [{title: 'The Godfather', description: 'A movie about the mafia'},{title: 'Toy Story', description: 'A movie about talking toys...'},{title: 'The Truman Show', description: 'A movie about a man stuck in a TV show'},{title: 'Blue Velvet',description: 'A movie about a crime mystery'}],
    searchString: '',

    setFilterString(newValue) {
        this.filterString = newValue;
        this.notifyListeners();
    },

    subscribe(listener) {
        this.listeners.push(listener);
      },
    
      notifyListeners() {
        this.listeners.forEach(listener => listener(this.filterString));
      }
};

class MovieList extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('movie-list-template');
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
        this._movies = [];
        state.subscribe(this.render.bind(this))
    }

    get movies() {
        return this._movies;
    }

    set movies(value) {
        this._movies = value;
    }

    connectedCallback() {

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
        const searchString = this.getAttribute('searchString');
        
        container.innerHTML = '';  // Clear existing items
        
        this.movies
            .filter(movie => movie.title.toLowerCase().includes(searchString.toLowerCase()) || searchString === '')
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

const movieList = document.createElement('movie-list');
movieList.movies = state.films;
movieList.setAttribute('searchString',state.searchString);
movieList.setAttribute('subscribe',state.subscribe);

const filmSearch = document.querySelector('#film-search');
filmSearch.setAttribute('setFilterString',state.setFilterString);
document.querySelector('main').appendChild(movieList);
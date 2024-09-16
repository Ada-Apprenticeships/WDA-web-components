class SearchBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
    }

    connectedCallback() {

    }
}

customElements.define('search-bar', SearchBar);
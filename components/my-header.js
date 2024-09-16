class MyHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                header {
                    background-color: #333;
                    color: white;
                    padding: 10px;
                    text-align: center;
                }
            </style>
            <header id="mitch-header">
                <h1>Header is defined here...</h1>
            </header>
        `;
    }
}

customElements.define('my-header', MyHeader);
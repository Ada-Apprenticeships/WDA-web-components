class FilterInput extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          input { padding: 5px; margin: 10px 0; }
        </style>
        <input type="text" placeholder="Filter items...">
      `;
  
      this.inputElement = this.shadowRoot.querySelector('input');
      this.inputElement.addEventListener('input', this.handleInput.bind(this));
    }
  
    handleInput() {
    const setFilterString = this.getAttribute('setFilterString');
    setFilterString(this.inputElement.value);
    }
  }
  
  customElements.define('filter-input', FilterInput);
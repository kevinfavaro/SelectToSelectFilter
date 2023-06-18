class SelectToSelectFilter {
    static eventsToCopy = ['onchange', 'onclick', 'ondblclick', 'onmousedown', 'onmouseup', 'onmousemove', 'onmouseover', 'onmouseout', 'onkeydown', 'onkeypress', 'onkeyup', 'onfocus', 'onblur', 'oncontextmenu', 'onwheel', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'onscroll'];

    /**
     * Convert a select element into a datalist with an associated input for filtering.
     * @param {string|HTMLElement} el - The select element or selector to convert.
     */
    static convert(el) {
        const element = this.#getElement(el);

        if (!element) return;

        const id = element.id;

        const input = this.#createInput(element, id);

        input.addEventListener('input', this.#onInput);
        input.addEventListener('blur', this.#onBlur);

        this.#copyEvents(element, input);

        element.setAttribute('id', 'datalist_' + element.id);

        element.parentNode.insertBefore(input, element);

        this.#createDatalist(element);
    }

    /**
     * Get the element from the DOM.
     * @param {string|HTMLElement} el - The element or selector to get from the DOM.
     * @returns {HTMLElement|null} The element or null if not found.
     */
    static #getElement(el) {
        const element = typeof el === 'string' ? document.querySelector(el) : el;

        if (!element) {
            console.error(`Element ${el} not found in the document.`);
            return null;
        }

        return element;
    }

    /**
     * Set the placeholder attribute for the created input element.
     * @param {HTMLElement} element - The original element to copy attributes from.
     * @param {HTMLInputElement} input - The created input element to set the placeholder for.
     */
    static #setPlaceholder(element, input) {
        if (!input.hasAttribute('placeholder')) {
            input.placeholder = element.querySelector('option:first-child').innerHTML;
            document.querySelector(`#${element.id} option:first-child`)?.remove();
        }
    }

    /**
     * Set the type, autocomplete, list, and filter attributes for the created input element.
     * @param {HTMLInputElement} input - The created input element to set the attributes for.
     * @param {string} id - The id of the original element.
     */
    static #setInputAttributes(input, id) {
        input.type = 'text';
        input.autocomplete = 'off';
        input.setAttribute('list', `datalist_${id}`);
        input.setAttribute('filter', '');
        input.setAttribute('id', id);
    }

    /**
     * Create an input element and copy attributes from the original element.
     * @param {HTMLElement} element - The original element to copy attributes from.
     * @param {string} id - The id of the original element.
     * @returns {HTMLInputElement} The created input element.
     */
    static #createInput(element, id) {
        if (!(element instanceof HTMLElement)) {
            console.error(`Invalid element passed to createInput: ${element}`);
            return;
        }

        const input = document.createElement('input');

        for (const attr of element.attributes) {
            input.setAttribute(attr.name, attr.value);
        }

        this.#setPlaceholder(element, input);

        this.#setInputAttributes(input, id);

        return input;
    }

    /**
     * Handle the input event for the created input element.
     * @param {Event} e - The input event.
     */
    static #onInput(e) {
        const val = document.querySelector(`#datalist_${e.target.id} option[value="${e.target.value}"]`);
        if (!val) return;
        e.target.setAttribute('data-value', val.getAttribute('data-value'));
        e.target.setAttribute('data-descricao', val.getAttribute('value'));
        e.target.setAttribute('value', val.getAttribute('value'));
    }

    /**
     * Handle the blur event for the created input element.
     */
    static #onBlur() {
        if (this.value === '') {
            this.removeAttribute('data-value');
            this.removeAttribute('data-descricao');
            this.removeAttribute('value');
        } else {
            this.value = this.getAttribute('data-descricao');
        }
    }

    /**
     * Copy supported events from the original element to the created input element.
     * @param {HTMLElement} element - The original element to copy events from.
     * @param {HTMLInputElement} input - The created input element to copy events to.
     */
    static #copyEvents(element, input) {
        if (!(element instanceof HTMLElement) || !(input instanceof HTMLInputElement)) {
            console.error(`Invalid elements passed to copyEvents: ${element}, ${input}`);
            return;
        }

        for (const event of this.eventsToCopy) {
            if (element[event]) {
                input[event] = element[event];
            }
        }
    }

    /**
     * Create a datalist element and move options from the original select element.
     * @param {HTMLElement} element - The original select element to convert to datalist.
     */
    static #createDatalist(element) {
        if (!(element instanceof HTMLElement)) {
            console.error(`Invalid elements passed to createDatalist: ${element}`);
            return;
        }

        const fragment = document.createDocumentFragment();

        const options = document.querySelectorAll(`#${element.id} option`);

        options.forEach(option => {
            option.setAttribute('data-value', option.getAttribute('value'));
            option.setAttribute('value', option.innerHTML);
            fragment.appendChild(option);
        });

        const $from = document.querySelector(`#${element.id}`);

        const datalist = document.createElement('datalist');

        datalist.id = `${element.id}`;

        datalist.appendChild(fragment);

        $from.parentNode.replaceChild(datalist, $from);
    }
}

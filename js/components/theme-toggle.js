class ThemeToggle extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.DAY_MODE = "day";
        this.NIGHT_MODE = "night";
        this.STORAGE_THEME_LABEL = "dayNightTheme";
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.loadSavedTheme();
    }

    render() {
        const dayIcon = this.getAttribute('day-icon');
        const nightIcon = this.getAttribute('night-icon');
        
        const dayBg = dayIcon ? `url('${dayIcon}') right / contain no-repeat`
            : "none";
        const nightBg = nightIcon ? `url('${nightIcon}') left / contain no-repeat`
            : "none";

        this.shadowRoot.innerHTML = `
<style>
:host {
    display: inline-block;
}

.theme-toggle {
    position: relative;
    display: inline-block;
    width: 70px;
    height: 30px;
    background: transparent;
}

.theme-toggle input {
    width: 0;
    height: 0;
    opacity: 0;
}

.theme-toggle__slider {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: end;
    padding: 4px 10px;
    overflow: hidden;
    font-size: 10pt;
    color: #fff;
    background: var(--theme-toggle-background) ${dayBg};
    border: 0px solid #000;
    border-radius: 35px;
    cursor: pointer;
    transition: .3s ease-out;
}

.theme-toggle__slider:before {
    content: "";
    position: absolute;
    inset: 4px 5px;
    width: 22px;
    height: 22px;
    background: #fff;
    border-radius: 35px;
    box-shadow: 2px 0px 10px var(--theme-toggle-shadow, #666);
}

.theme-toggle input:checked+.theme-toggle__slider {
    justify-content: start;
    background: var(--theme-toggle-background) ${nightBg};
}

.theme-toggle input:checked+.theme-toggle__slider:before {
    background: #fff;
    box-shadow: -2px 0px 10px var(--theme-toggle-shadow, #333);
    transform: translateX(38px);
}
</style>

<label class="theme-toggle" aria-controls="page" aria-label="Toggle theme">
    <input type="checkbox" id="toggle-input">
    <span class="theme-toggle__slider"></span>
</label>
        `;
    }

    setupEventListeners() {
        const toggle = this.shadowRoot.getElementById("toggle-input");

        toggle.addEventListener("change", () => {
            const theme = toggle.checked ? this.NIGHT_MODE : this.DAY_MODE;
            this.applyTheme(theme);
            localStorage.setItem(this.STORAGE_THEME_LABEL, theme);

            this.dispatchEvent(new CustomEvent("theme-changed", {
                detail: { theme },
                bubbles: true,
                composed: true
            }));
        });
    }
    loadSavedTheme() {
        const savedTheme = localStorage.getItem(this.STORAGE_THEME_LABEL);
        const toggle = this.shadowRoot.getElementById('toggle-input');

        if (savedTheme === this.NIGHT_MODE) {
            toggle.checked = true;
            this.applyTheme(this.NIGHT_MODE);
        }
    }
    applyTheme(theme) {
        if (theme === this.NIGHT_MODE) {
            document.body.classList.add(this.NIGHT_MODE);
        } else {
            document.body.classList.remove(this.NIGHT_MODE);
        }
    }
}

customElements.define("theme-toggle", ThemeToggle);
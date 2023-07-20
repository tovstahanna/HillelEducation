class LoginComponent {
    constructor(template, containerEl) {
        this._template = template;
        this._container = containerEl;
        this.onSuccess = null;
        this.render();
    }

    render() {
        this._container.innerHTML = renderTemplate(this._template, {});
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.onSumbit();
        })
    }

    onSumbit() {
        const email = this._container.querySelector('#email').value;
        const password = this._container.querySelector('#password').value;

        const msg = validation(email, password).join("<br>");
        const err = document.getElementById('error');
        if(msg){
            if(err) err.remove();
            this._container.insertAdjacentHTML('beforebegin', `<p id="error">${msg}</p>`);
        }

        if (!msg && email && password) {
            if(err) err.remove();
            api.login({email, password})
                .then(response => this.onSuccess())
                .catch(error => console.log(error));
        }
    }

    hideLoginForm() {
        document.getElementById('login-form').hidden = true;
    }
}
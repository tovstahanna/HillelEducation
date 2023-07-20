class Cards {
    constructor(template, containerEl) {
        this._template = template;
        this._container = containerEl;
    }

    fetchCards(params){
        api.fetchUsers(params)
            .then(responce => this.render(responce))
            .catch(error => console.log(error));
    }

    render(responce) {
        this._container.innerHTML = '';
        responce.data.forEach(element => {
            element.image = element.avatar ? `<img src="${element.avatar}" alt="${element.last_name}">` : '';
            this._container.insertAdjacentHTML('beforeend', renderTemplate(this._template, element));

            document.getElementById('edit-form-' + element.id).hidden = true;
            const edit = document.getElementById(`edit-${element.id}`);
            edit.addEventListener('click', this.onEdit);
            document.getElementById(`delete-${element.id}`).addEventListener('click', this.onDelete);
        });
        
        if(responce.total_pages > 1){
            this.pagination(responce);
        }
    }

    pagination(responce){
        const pageNum = responce.page;
        const paginationDiv = document.createElement('div');
        paginationDiv.id = 'pagination';

        const prev = document.createElement('a');
        const next = document.createElement('a');

        prev.innerText = 'Previous Page';
        prev.href = '#';
        
        next.innerText = 'Next Page';
        next.href = '#';

        prev.setAttribute('data-page', Number(pageNum)-1);
        next.setAttribute('data-page', Number(pageNum)+1);
        if (pageNum == 1) {
            prev.className = 'disable';
            prev.setAttribute('data-page', Number(pageNum));
        }
        if( pageNum == responce.total_pages ){
            next.className = 'disable';
            next.setAttribute('data-page', Number(pageNum));
        }
        
        paginationDiv.append(prev);
        paginationDiv.append(next);
        
        const links = paginationDiv.getElementsByTagName('a');
        for (let index = 0; index < links.length; index++) {
            const element = links[index];
            element.addEventListener('click', (e) => {
                this.fetchCards({page: e.target.getAttribute('data-page')});
            });
        }

        this._container.append(paginationDiv);
    }

    addNewCard(addTemplate){
        this._container.insertAdjacentHTML('beforebegin', addTemplate);
        document.getElementById('add-form').addEventListener('submit', (event) => {
            event.preventDefault();
            let fName, fLastName, fEmail, fAvatar, fPassword;
            for (let index = 0; index < event.target.length; index++) {
                const element = event.target[index];
                if(element.name == 'first_name') fName = element.value;
                if(element.name == 'last_name') fLastName = element.value;
                if(element.name == 'email') fEmail = element.value;
                if(element.name == 'password') fPassword = element.value;
                if(element.name == 'avatar') fAvatar = element.value;
            }

            const msg = validation(fEmail, fPassword).join("<br>");
            const err = document.getElementById('error');
            if(msg){
                if(err) err.remove();
                this._container.insertAdjacentHTML('beforebegin', `<p id="error">${msg}</p>`);
            }
            if (!msg && fEmail && fPassword) {
                if(err) err.remove();
                api.create({
                        first_name: fName,
                        last_name: fLastName,
                        email: fEmail,
                        password: fPassword,
                        avatar: fAvatar
                    })
                    .then((responce) => {
                        responce.image = responce.avatar ? `<img src="${responce.avatar}" alt="${responce.last_name}">` : '';
                        this._container.insertAdjacentHTML('afterbegin', renderTemplate(this._template, responce));

                        document.getElementById('edit-form-' + responce.id).hidden = true;
                        const edit = document.getElementById(`edit-${responce.id}`);
                        edit.addEventListener('click', this.onEdit);
                        document.getElementById(`delete-${responce.id}`).addEventListener('click', this.onDelete);
                    })
                    .catch(error => console.log(error));
            }
        });
    }

    onEdit(event){
        const id = event.target.id.replace('edit-', '');
        const userCard = document.getElementById('user-' + id);
        const editForm = document.getElementById(`edit-form-${id}`);

        editForm.classList.remove('hide');
        userCard.querySelector('.info').hidden = true;
        userCard.querySelector('.buttons').hidden = true;

        const allCards = document.getElementsByClassName('card');

        for (let index = 0; index < allCards.length; index++) {
            const element = allCards[index];
            const current_id = `user-${id}`;
            if( element.id != current_id ) { 
                element.classList.add('disable');
            } 
        }

        editForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const update_info = {id};

            for (let j = 0; j < event.target.length-1; j++) {
                const input = event.target[j];
                if(input.name == 'first_name') update_info.first_name = input.value;
                if(input.name == 'last_name') update_info.last_name = input.value;
                if(input.name == 'email') update_info.email = input.value;
                if(input.name == 'avatar') update_info.avatar = input.value; 
            }

            api.edit(update_info)
                .then((responce) => {
                    const image = responce.avatar ? `<img src="${responce.avatar}" alt="${responce.surname}">` : '';
                    userCard.querySelector('.info').innerHTML = `<h2>${responce.first_name} ${responce.last_name}</h2>
                                                     ${image}
                                                     <p>${responce.email}</p>`;
                    editForm.classList.add('hide');
                    userCard.querySelector('.info').hidden = false;
                    userCard.querySelector('.buttons').hidden = false;
                    for (let index = 0; index < allCards.length; index++) {
                        const element = allCards[index];
                        const current_id = `user-${id}`;
                        if( element.id != current_id ) { 
                            element.classList.remove('disable');
                        } 
                    }
                })
                .catch(error => console.log(error));
        });

        
    }

    onDelete(event){
        const id = event.target.id.replace('delete-', '');
        api.delete({id})
            .then((responce) => {
                if(responce === true){
                    const userCard = document.getElementById('user-' + id);
                    userCard.remove();
                }
            })
            .catch(error => console.log(error));
    }
}
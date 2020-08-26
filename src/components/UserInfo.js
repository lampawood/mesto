export class UserInfo {


    constructor({name, job} ) {
            this._name = name;
            this._job = job;
            this._nameInput = document.querySelector('.pop-up__input_type_name');
            this._jobInput = document.querySelector('.pop-up__input_type_about');
        }
        getUserInfo() {
            this._nameInput.value = this._name.textContent;
            this._jobInput.value = this._job.textContent;
        }

        setUserInfo() {
                this._job.textContent = this._jobInput.value
                this._name.textContent = this._nameInput.value

            }
}
export class UserInfo {
    constructor({name, job}) {
        this._name = name;
        this._job = job;
    }

    setUserInfo = ({name, job}) => {
            this._name.textContent = name;
            this._job.textContent = job
    }

    getUserInfo = () => {
        return {
            name: this._name.textContent,
            job: this._job.textContent
        }
    }
}
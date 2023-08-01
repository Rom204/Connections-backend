
export default class UserModel { 
    public id: string;
    public username: string;
    public password: string;
    public email: string
    public role: string

    constructor(user: UserModel) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.email = user.email
        this.role = user.role;
        
    }
}
export default interface AuthServiceInterface {
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any)
}
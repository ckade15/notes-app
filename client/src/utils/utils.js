const validateClient = (firstName, lastName, email, password, passVerify) => {
    if (firstName === "") {
        return false;
    }
    if (lastName === "") {
        return false;
    }
    if (email === "") {
        return false;
    }
    if (password === "") {
        return false;
    }
    if (passVerify === "") {
        return false;
    }
    if (password !== passVerify) {
        return false;
    }
    return true;
}



export default validateClient;
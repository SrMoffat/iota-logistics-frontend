export async function signupUser() {
    try {
        console.log('New User');

    } catch (error) {
        throw new Error(`Something went wrong: signupUser`, error)
    }
}

export async function loginUser() {
    try {
        console.log('Login User');

    } catch (error) {
        throw new Error(`Something went wrong: loginUser`, error)
    }
}
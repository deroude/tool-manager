import { getAuth, signInWithEmailAndPassword, signOut, browserLocalPersistence, setPersistence, onAuthStateChanged, User } from "firebase/auth";

export const login = async (email: string, password: string) => {
    const auth = getAuth();
    try {
        await setPersistence(auth, browserLocalPersistence);
        const credential = await signInWithEmailAndPassword(auth, email, password);
        return credential.user;
    } catch (err) {
        return undefined;
    }
}

export const logout = async () => {
    const auth = getAuth();
    return signOut(auth);
}

export const whoami = async ():Promise<User|null> => new Promise((resolve) => {
    onAuthStateChanged(getAuth(), user => {
        resolve(user);
    })
})
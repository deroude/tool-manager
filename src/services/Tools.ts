import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { whoami } from "./Auth";
import { fb } from "./Firebase";

export interface Tool {
    id: string;
    type?: string;
    image?: string;
    brand?: string;
    model?: string;
}

export const getMyTools = async (): Promise<Tool[]> => {
    const me = await whoami();
    if (!me) {
        return Promise.reject("Not authenticated");
    }
    const db = getFirestore(fb.app);
    const q = query(collection(db, 'tools'), where('assignedUser', '==', me.uid))
    try {
        const re = await getDocs(q);
        return Promise.resolve(re.docs.map(d => ({
            id: d.id, ...d.data()
        })));
    } catch (err) {
        console.error(err);
        return Promise.reject(err);
    }
}

export const getTool = async (id: string): Promise<Tool> => {
    const db = getFirestore(fb.app);
    try {
        const d = await getDoc(doc(db, 'tools', id));
        return Promise.resolve({ id: d.id, ...d.data() });
    } catch (err) {
        console.error(err);
        return Promise.reject(err);
    }
}

export const grabTool = async (id: string): Promise<void> => {
    const me = await whoami();
    if (!me) {
        return Promise.reject("Not authenticated");
    }

    const db = getFirestore(fb.app);
    try {
        await setDoc(doc(db, 'tools', id), { assignedUser: me.uid }, { merge: true });
        return Promise.resolve();
    } catch (err) {
        console.error(err);
        return Promise.reject(err);
    }
}
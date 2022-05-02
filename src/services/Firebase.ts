import { initializeApp } from "firebase/app";

export const fb: any = {};

export const firebaseConfig = async () => fetch("/firebase.config.json").then(re => re.json());

export const firebaseInit = async () => {
    fb.config =  await firebaseConfig();
    fb.app = initializeApp(fb.config);
}
import firebaseConfig from "./firebaseConfig.json";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import dayjs from "dayjs";
import type { RcFile } from "antd/es/upload";
import shortUUID from "short-uuid";
import sanitize from "sanitize-filename";

const uuid = shortUUID();

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export async function register(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
}

export async function signIn(email: string, password: string) {
  await setPersistence(auth, browserLocalPersistence);
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential?.user;
}

export async function logout() {
  await signOut(auth);
}

export async function uploadFile(name: string, file: RcFile | Blob) {
  const date = dayjs().format("YYYYMMDDHHmmss");
  const ext = file.type.split("/")[1] || "jpg";
  const filename = `${sanitize(name)}/${date}-${uuid.generate()}.${ext}`;
  const fileRef = ref(storage, filename);
  await uploadBytes(fileRef, file);
  return filename;
}

export async function getFileUrls(filenames: string[] = []) {
  if (!Array.isArray(filenames)) return [];
  const reqs = filenames.map((filename) =>
    getDownloadURL(ref(storage, filename))
  );
  const res = await Promise.allSettled(reqs);
  return res.map((e) => (e.status === "fulfilled" ? e.value : null));
}

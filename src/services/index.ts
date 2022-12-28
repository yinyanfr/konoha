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
import apiAuthHeader from "./keys.json";
import axios from "axios";

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

async function requestWordScore(word: string) {
  const options = {
    method: "GET",
    url: "https://twinword-language-scoring.p.rapidapi.com/word/",
    params: { entry: word },
    headers: {
      ...apiAuthHeader,
    },
  };

  const res = await axios.request(options);
  return res.data;
}

async function requestWord(word: string) {
  const res = await axios.get(`https://boating.yinyan.fr/word?entry=${word}`);
  return res.data;
}

export async function getWord(word: string) {
  const localData = localStorage.getItem(`word-${word}`);
  if (localData) return JSON.parse(localData);
  const wordRef = doc(db, "words", word);
  const wordSnap = await getDoc(wordRef);

  let result: Record<string, any> = {};
  let lemmetized: string = word;
  const exists = wordSnap.exists();
  if (exists) {
    result = wordSnap.data();
  } else {
    const data = await requestWordScore(word);
    const dict = await requestWord(word);
    result = { ...dict, level: data.ten_degree ?? 0 };
    lemmetized = data.response;
  }

  localStorage.setItem(`word-${word}`, JSON.stringify(result));
  if (!exists) {
    await setWord(word, result);
  }

  if (word !== lemmetized) {
    localStorage.setItem(`word-${lemmetized}`, JSON.stringify(result));
    if (!exists) {
      await setWord(lemmetized, result);
    }
  }

  return result;
}

export async function setWord(word: string, payload: Word) {
  const wordRef = doc(db, "words", word);
  await setDoc(wordRef, payload, { merge: true });
}

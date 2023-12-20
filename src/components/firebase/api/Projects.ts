import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { FirestoreMain } from "../Firebase";
import type { Project, ProjectField } from "../FirebaseTypes";

const projectRef = collection(FirestoreMain, "projects");

export const addProject = async (userID: string, projectTitle: string) => {
  const Project: ProjectField = {
    title: projectTitle,
    sections: [],
    ownerID: userID,
    collaborators: [],
  };
  const docRef = await addDoc(projectRef, Project);
  console.log("Document written with ID: ", docRef.id);
};

export const deleteProject = async (projectID: string) => {
  const docRef = doc(FirestoreMain, "projects", projectID);
  await deleteDoc(docRef);
  console.log("Document deleted with ID: ", projectID);
};

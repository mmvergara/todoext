import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { FirestoreMain } from "../Firebase";
import type { Project, ProjectField } from "../FirebaseTypes";

const projectRef = collection(FirestoreMain, "projects");

export const addProject = async (projectName: string, userID: string) => {
  const Project: ProjectField = {
    projectName,
    ownerID: userID,
  };
  const docRef = await addDoc(projectRef, Project);
  console.log("New Project with ID: ", docRef.id);
  return docRef.id;
};

export const deleteProject = async (projectID: string) => {
  const docRef = doc(FirestoreMain, "projects", projectID);
  await deleteDoc(docRef);
  console.log("Document deleted with ID: ", projectID);
};

export const getProjects = async (userID: string) => {
  console.log("Fetching projects");
  const querySnapshot = await getDocs(collection(FirestoreMain, "projects"));

  const projects: Project[] = [];
  querySnapshot.forEach((doc) => {
    const project = doc.data() as ProjectField;
    projects.push({
      id: doc.id,
      projectName: project.projectName,
      ownerID: project.ownerID,
    });
  });

  console.log(projects);
  return projects;
};

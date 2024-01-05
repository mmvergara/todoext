import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FirestoreMain } from "../Firebase";
import type { Project, ProjectField } from "../FirebaseTypes";

const projectRef = collection(FirestoreMain, "projects");

export const getProjects = async (userId:string) => {
  const q = query(
    projectRef,
    where("ownerId", "==", "wYEgMuYQ5cNENlu2g6WzzhoZZ5g2")
  );
  const querySnapshot = await getDocs(q);
  const projects: Project[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const project: Project = {
      projectId: doc.id,
      projectName: data.projectName,
      ownerId: data.ownerId,
      collaborators: data.collaborators,
      createdAt: data.createdAt,
    };
    projects.push(project);
  });
  return projects;
};

export const getProjectData = async (projectID: string) => {
  const docRef = doc(FirestoreMain, "projects", projectID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const project = docSnap.data() as Project;
    return project;
  }
  return null;
};

export const addProject = async (projectName: string, userID: string) => {
  const Project: ProjectField = {
    projectName,
    ownerId: userID,
    collaborators: {
      [userID]: "owner",
    },
    createdAt: Timestamp.now(),
  };
  const docRef = await addDoc(projectRef, Project);
  return docRef.id;
};

export const updateProjectName = async (
  projectId: string,
  newProjectName: string
) => {
  const docRef = doc(FirestoreMain, "projects", projectId);
  await updateDoc(docRef, {
    projectName: newProjectName,
  });
};

export const deleteProject = async (projectID: string) => {
  const docRef = doc(FirestoreMain, "projects", projectID);
  await deleteDoc(docRef);
};

import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { FirestoreMain } from "../Firebase";
import type { Project, ProjectField, Section } from "../FirebaseTypes";

const projectRef = collection(FirestoreMain, "projects");
export const getProjects = async () => {
  const querySnapshot = await getDocs(projectRef);
  const projects: Project[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const project: Project = {
      projectId: doc.id,
      projectName: data.projectName,
      ownerId: data.ownerId,
      collaborators: data.collaborators,
      sections: data.sections,
      createdAt: data.createdAt,
    };
    projects.push(project);
  });
  console.log("Get Projects", projects);
  return projects;
};

export const addProject = async (projectName: string, userID: string) => {
  const Project: ProjectField = {
    projectName,
    ownerId: userID,
    collaborators: [userID],
    sections: [],
    createdAt: Timestamp.now(),
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

export const getProjectData = async (userID: string) => {
  const querySnapshot = await getDocs(projectRef);
  const projects: Project[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.ownerId === userID || data.collaborators.includes(userID)) {
      const project: Project = {
        projectId: doc.id,
        projectName: data.projectName,
        ownerId: data.ownerId,
        collaborators: data.collaborators,
        sections: data.sections,
        createdAt: data.createdAt,
      };
      projects.push(project);
    }
  });
  return projects;
};

export const addSection = async (projectID: string, sectionName: string) => {
  const section: Section = {
    sectionId: "",
    sectionName,
    tasks: [],
  };
  // Section is not a subcollection of Project, so we need to get the Project document first
  const projectDocRef = doc(FirestoreMain, "projects", projectID);

  //  Add the section to the Project document
  await updateDoc(projectDocRef, {
    sections: arrayUnion(section),
  });
};

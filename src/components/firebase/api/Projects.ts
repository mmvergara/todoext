import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { FirestoreMain } from "../Firebase";
import type {
  Project,
  ProjectField,
  Section,
  SectionField,
} from "../FirebaseTypes";

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
      createdAt: data.createdAt,
    };
    projects.push(project);
  });
  return projects;
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
  console.log(`%cCreate Project: ${projectName}`, "color: green;");
  return docRef.id;
};

export const deleteProject = async (projectID: string) => {
  const docRef = doc(FirestoreMain, "projects", projectID);
  await deleteDoc(docRef);
  console.log(`%Delete Project: ${projectID}`, "color: red;");
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

export const getProjectSections = async (projectID: string) => {
  const docRef = collection(FirestoreMain, "projects", projectID, "sections");
  const docsSnap = await getDocs(docRef);
  const sections: Section[] = [];
  docsSnap.forEach((doc) => {
    const data = doc.data();
    const section: Section = {
      sectionId: doc.id,
      sectionName: data.sectionName,
      tasks: data.tasks,
      createdAt: data.createdAt,
    };
    sections.push(section);
  });
  return sections;
};

export const addSection = async (projectID: string, sectionName: string) => {
  const section: SectionField = {
    sectionName,
    tasks: [],
    createdAt: Timestamp.now(),
  };
  const projectDocRef = collection(
    FirestoreMain,
    "projects",
    projectID,
    "sections"
  );
  const res = await addDoc(projectDocRef, section);
  const sectionRes: Section = {
    ...section,
    sectionId: res.id,
  };
  return sectionRes;
};

export const addTask = async (
  projectID: string,
  sectionID: string,
  taskName: string
) => {
  const task = {
    taskId: `${taskName}${Date.now() + Math.random()}`,
    taskName,
    description: "",
    dueDate: "",
    createdAt: Timestamp.now(),
  };
  // Section is not a subcollection of Project, so we need to get the Project document first
  const projectDocRef = doc(
    FirestoreMain,
    "projects",
    projectID,
    "sections",
    sectionID
  );

  //  Add the section to the Project document
  await updateDoc(projectDocRef, {
    tasks: arrayUnion(task),
  });

  return task;
};

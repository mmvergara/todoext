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
  Task,
} from "../FirebaseTypes";

export const addTask = async (
  projectID: string,
  sectionID: string,
  taskName: string
) => {
  const taskRef = doc(
    FirestoreMain,
    "projects",
    projectID,
    "sections",
    sectionID
  );
  const task: Task = {
    taskId: new Date().getTime().toString() + taskName,
    taskName,
    createdAt: Timestamp.now(),
  };
  await updateDoc(taskRef, {
    tasks: arrayUnion(task),
  });
  console.log(`%cAdd Task: ${taskName}`, "color: green;");
  return task;
};

import {
  Timestamp,
  arrayRemove,
  deleteField,
  doc,
  updateDoc,
} from "firebase/firestore";
import { FirestoreMain } from "../Firebase";
import type { Task } from "../FirebaseTypes";

export const addTask = async (
  projectID: string,
  sectionID: string,
  taskName: string
) => {
  const projectRef = doc(FirestoreMain, "projects", projectID);
  const task: Task = {
    taskName,
    createdAt: Timestamp.now(),
  };
  await updateDoc(projectRef, {
    [`sections.${sectionID}.tasks.${
      new Date().getTime().toString() + taskName
    }`]: task,
  });
  return task;
};

export const deleteTask = async (
  projectId: string,
  sectionId: string,
  taskId: string
) => {
  const projectRef = doc(FirestoreMain, "projects", projectId);
  updateDoc(projectRef, {
    [`sections.${sectionId}.tasks.${taskId}`]: deleteField(),
  });
};

import {
  Timestamp,
  arrayRemove,
  deleteField,
  doc,
  updateDoc,
} from "firebase/firestore";
import { FirestoreMain } from "../Firebase";
import type { Task } from "../FirebaseTypes";
import { generateTaskId } from "@/utils/helpers";

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
    [`sections.${sectionID}.tasks.${generateTaskId()}`]: task,
  });
  return task;
};

export const updateTaskName = async (
  projectId: string,
  sectionId: string,
  taskId: string,
  newTaskName: string
) => {
  console.log(projectId, sectionId, taskId, newTaskName);
  const projectRef = doc(FirestoreMain, "projects", projectId);
  updateDoc(projectRef, {
    [`sections.${sectionId}.tasks.${taskId}.taskName`]: newTaskName,
  });
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

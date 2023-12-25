import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { FirestoreMain } from "../Firebase";
import type { Section, Task } from "../FirebaseTypes";

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
  return task;
};

export const deleteTask = async (
  projectId: string,
  sectionId: string,
  taskId: string
) => {
  const taskRef = doc(
    FirestoreMain,
    "projects",
    projectId,
    "sections",
    sectionId
  );
  const sectionSnap = await getDoc(taskRef);
  const sectionData = sectionSnap.data() as Section;

  return updateDoc(taskRef, {
    tasks: sectionData.tasks.filter((task: Task) => task.taskId !== taskId),
  });
};

export const updateTask = async (
  projectId: string,
  sectionId: string,
  taskId: string,
  newTaskName: string
) => {
  const taskRef = doc(
    FirestoreMain,
    "projects",
    projectId,
    "sections",
    sectionId
  );
  const sectionSnap = await getDoc(taskRef);
  const sectionData = sectionSnap.data() as Section;

  return updateDoc(taskRef, {
    tasks: sectionData.tasks.map((task: Task) => {
      if (task.taskId === taskId) {
        return {
          ...task,
          newTaskName,
        };
      }
      return task;
    }),
  });
};

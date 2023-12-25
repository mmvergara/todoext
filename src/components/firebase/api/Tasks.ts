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
  const taskSnap = await getDoc(taskRef);
  const taskData = taskSnap.data() as Section;

  return updateDoc(taskRef, {
    tasks: taskData.tasks.filter((task: Task) => task.taskId !== taskId),
  });
};

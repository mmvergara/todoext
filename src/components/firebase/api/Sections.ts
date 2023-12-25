import { FirestoreMain } from "@/components/firebase/Firebase";
import type {
  Section,
  SectionField,
} from "@/components/firebase/FirebaseTypes";
import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";

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

export const addSection = async (projectId: string, sectionName: string) => {
  const section: SectionField = {
    sectionName,
    tasks: [],
    createdAt: Timestamp.now(),
  };
  const projectDocRef = collection(
    FirestoreMain,
    "projects",
    projectId,
    "sections"
  );
  const res = await addDoc(projectDocRef, section);
  const sectionRes: Section = {
    ...section,
    sectionId: res.id,
  };
  return sectionRes;
}; 



import { FirestoreMain } from "@/components/firebase/Firebase";
import type { Section } from "@/components/firebase/FirebaseTypes";
import { generateSectionId } from "@/utils/helpers";
import { Timestamp, deleteField, doc, updateDoc } from "firebase/firestore";

// export const getProjectSections = async (projectID: string) => {
//   const docRef = collection(FirestoreMain, "projects", projectID, "sections");
//   const docsSnap = await getDocs(docRef);
//   const sections: Section[] = [];
//   docsSnap.forEach((doc) => {
//     const data = doc.data();
//     const section: Section = {
//       sectionId: doc.id,
//       sectionName: data.sectionName,
//       tasks: data.tasks,
//       createdAt: data.createdAt,
//     };
//     sections.push(section);
//   });
//   return sections;
// };

export const updateSectionName = async (
  projectId: string,
  sectionId: string,
  newSectionName: string
) => {
  const projectRef = doc(FirestoreMain, "projects", projectId);
  await updateDoc(projectRef, {
    [`sections.${sectionId}`]: {
      sectionName: newSectionName,
    },
  });
};

export const addSection = async (projectId: string, sectionName: string) => {
  const section: Section = {
    sectionName,
    tasks: {},
    createdAt: Timestamp.now(),
  };
  const projectRef = doc(FirestoreMain, "projects", projectId);
  await updateDoc(projectRef, {
    [`sections.${generateSectionId()}`]: section,
  });
};

export const deleteSection = async (projectId: string, sectionId: string) => {
  const projectRef = doc(FirestoreMain, "projects", projectId);
  sectionId = `sections.${sectionId}`;
  await updateDoc(projectRef, {
    [sectionId]: deleteField(),
  });
};

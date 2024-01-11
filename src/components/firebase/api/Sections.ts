import { FirestoreMain } from "@/components/firebase/Firebase";
import type { Section } from "@/components/firebase/FirebaseTypes";
import { generateSectionId } from "@/utils/helpers";
import { Timestamp, deleteField, doc, updateDoc } from "firebase/firestore";

export const updateSectionName = async (
  projectId: string,
  sectionId: string,
  newSectionName: string
) => {
  const projectRef = doc(FirestoreMain, "projects", projectId);
  await updateDoc(projectRef, {
    [`sections.${sectionId}.sectionName`]: newSectionName,
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

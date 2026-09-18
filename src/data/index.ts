import { curriculumMap } from './curriculum-map';
import type { Unit, Topic, LabProgram } from '../types';
import { lab1IoOperators } from './labs/lab1-io-operators';
import { lab2ArraysPointers } from './labs/lab2-arrays-pointers';
import { lab3StringsStructs } from './labs/lab3-strings-structs';
import { lab4StructArrays } from './labs/lab4-struct-arrays';
import { lab5FileRedirection } from './labs/lab5-file-redirection';
import { lab6FileSorting } from './labs/lab6-file-sorting';
import { lab7OrderedList } from './labs/lab7-ordered-list';
import { lab8PriorityScheduling } from './labs/lab8-priority-scheduling';
import { lab9UnionsEnums } from './labs/lab9-unions-enums';

export const allLabs: LabProgram[] = [
  lab1IoOperators,
  lab2ArraysPointers,
  lab3StringsStructs,
  lab4StructArrays,
  lab5FileRedirection,
  lab6FileSorting,
  lab7OrderedList,
  lab8PriorityScheduling,
  lab9UnionsEnums,
];

export function getLabBySlug(slug: string): LabProgram | undefined {
  return allLabs.find(lab => lab.slug === slug);
}

export function getUnitBySlug(slug: string): Unit | undefined {
  return curriculumMap.find(u => u.slug === slug);
}

export function getTopicBySlug(unitSlug: string, topicSlug: string): Topic | undefined {
  const unit = getUnitBySlug(unitSlug);
  return unit?.topics.find(t => t.slug === topicSlug);
}

export function getAllTopics(): Topic[] {
  return curriculumMap.flatMap(u => u.topics);
}

export function getTopicById(id: string): Topic | undefined {
  return getAllTopics().find((t) => t.id === id);
}

export { curriculumMap };

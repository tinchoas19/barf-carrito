import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

interface Category {
  slug:string
  name:string
}

export const defaultCategory: Category = {
  slug: '',
  name: 'Todos'
};

export const categoryAtom = atomWithStorage('', defaultCategory);
export const clearCategoryAtom = atom(null, (_get, set, _data) => {
  return set(categoryAtom, defaultCategory);
});

export const categorySlugAtom = atom(
  (get) => get(categoryAtom).slug,
  (get, set, data: string) => {
    const prev = get(categoryAtom);
    return set(categoryAtom, { ...prev, slug: data });
  }
);

export const categoryNameAtom = atom(
  (get) => get(categoryAtom).name,
  (get, set, data: string) => {
    const prev = get(categoryAtom);
    return set(categoryAtom, { ...prev, name: data });
  }
);
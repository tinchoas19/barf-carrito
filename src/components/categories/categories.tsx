import dynamic from 'next/dynamic';
import { useSettings } from '@/framework/settings';

const StickySidebarListCategories = dynamic(
  () => import('@/components/categories/sticky-sidebar-list-categories')
);

const MAP_CATEGORY_TO_GROUP: Record<string, any> = {
  classic: StickySidebarListCategories,

};
interface CategoriesProps {
  layout: string;
  variables: any;
  className?: string;
}
export default function Categories({
  layout,
  className,
  variables,
}: CategoriesProps) {
  const {settings : {productCategories : categories}} = useSettings()

  const Component = MAP_CATEGORY_TO_GROUP[layout];
  return (
    <Component
      notFound={!Boolean(categories.length)}
      categories={categories}
      className={className}
      variables={variables}
    />
  );
}

import { useTranslation } from 'next-i18next';
import { useAtom } from 'jotai';
import { drawerAtom } from '@/store/drawer-atom';
import GroupsDropdownMenu from './menu/groups-menu';
import classNames from 'classnames';

export default function FilterBar({
  className,
}: {
  className?: string;
  variables?: any;
}) {
  

  return (
    <div
      className={classNames(
        'sticky top-14 z-10 flex h-14 items-center justify-between border-t border-b border-border-200 bg-light py-3 px-5 md:top-16 md:h-16 lg:top-22 lg:px-7 xl:hidden',
        className
      )}
    >
      <div className="flex h-8 items-center py-1 px-3 text-sm font-semibold text-heading transition-colors duration-200 md:h-10 md:py-1.5 md:px-4 md:text-base"></div>
      <GroupsDropdownMenu />
    </div>
  );
}

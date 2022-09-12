import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import { ExpandLessIcon } from '@/components/icons/expand-less-icon';
import { ExpandMoreIcon } from '@/components/icons/expand-more-icon';
import { getIcon } from '@/lib/get-icon';
import * as groupIcons from '@/components/icons/groups';
import * as categoryIcons from '@/components/icons/category';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { categoryNameAtom, categorySlugAtom } from '@/store/category-atom';
import { scroller } from 'react-scroll';

interface TreeMenuItemProps {
  item: any;
  className?: string;
  depth?: number;
}
const TreeMenuItem: React.FC<TreeMenuItemProps> = ({
  className,
  item,
  depth = 0,
}) => {
  const [categorySlug, setCategorySlug] = useAtom(categorySlugAtom)
  const active = categorySlug;
  const isActive =
    active === item.slug ||
    item?.children?.some((_item: any) => _item.slug === active);
  const [isOpen, setOpen] = useState<boolean>(isActive);

  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);

  const { slug, name, children: items, icon } = item;


  const [_, setCategoryName] = useAtom(categoryNameAtom)

  

  function handleCategoryChange({slug, name}:{slug:string, name:string}) {
    setCategorySlug(slug)
    setCategoryName(name)
    scroller.scrollTo('grid', {
      smooth: true,
      offset: -110,
    });
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <ExpandLessIcon className="w-3 h-3" />
    ) : (
      <ExpandMoreIcon className="w-3 h-3" />
    );
  }

  return (
    <>
      <motion.li
        initial={false}
        animate={{ backgroundColor: '#ffffff' }}
        onClick={() => handleCategoryChange({slug, name})}
        className="py-1 rounded-md"
      >
        <button
          className={cn(
            'flex items-center w-full py-2 ltr:text-left rtl:text-right outline-none text-body-dark font-semibold  focus:outline-none focus:ring-0 focus:text-accent transition-all ease-in-expo',
            isOpen ? 'text-accent' : 'text-body-dark',
            className ? className : 'text-sm'
          )}
        >
          {(
            <span className="flex w-5 h-5 ltr:mr-4 rtl:ml-4 items-center justify-center">
              {getIcon({
                iconList: categoryIcons,
                iconName: 'MeatFish',
                className: 'h-full w-full',
              })}
            </span>
          )}
          <span>{name}</span>
          <span className="ltr:ml-auto rtl:mr-auto">{expandIcon}</span>
        </button>
      </motion.li>
      <AnimatePresence initial={false}>
        {Array.isArray(items) && isOpen ? (
          <li>
            <motion.ul
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="ltr:ml-4 rtl:mr-4 text-xs"
            >
              {items.map((currentItem) => {
                const childDepth = depth + 1;
                return (
                  <TreeMenuItem
                    key={`${currentItem.name}${currentItem.slug}`}
                    item={currentItem}
                    depth={childDepth}
                    className={cn('text-sm text-body ltr:ml-5 rtl:mr-5')}
                  />
                );
              })}
            </motion.ul>
          </li>
        ) : null}
      </AnimatePresence>
    </>
  );
};
interface TreeMenuProps {
  items: any[];
  className?: string;
}

function TreeMenu({ items, className }: TreeMenuProps) {
  return (
    <ul className={cn('text-xs', className)}>
      {items?.map((item: any) => (
        <TreeMenuItem key={`${item.name}${item.slug}`} item={item} />
      ))}
    </ul>
  );
}

export default TreeMenu;

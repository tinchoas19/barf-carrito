import { useRouter } from 'next/router';
import { ROUTES } from '@/lib/routes';
import { useTranslation } from 'next-i18next';
import DrawerWrapper from '@/components/ui/drawer/drawer-wrapper';
import { useAtom } from 'jotai';
import { drawerAtom } from '@/store/drawer-atom';
import { useLogout, useUser } from '@/framework/user';
import { useEffect } from 'react';

const headerLinks = [
  { href: ROUTES.HOME, label: 'nav-menu-shops' },
  { href: ROUTES.PROFILE, label: 'profile-sidebar-profile' },
  { href: ROUTES.HELP, label: 'text-faq-help' },
  { href: ROUTES.CONTACT, label: 'nav-menu-contact' },
  { href: ROUTES.LOGOUT, label: 'auth-menu-logout' },
];

const unHeaderLinks = [
  { href: ROUTES.HOME, label: 'nav-menu-shops' },
  { href: ROUTES.HELP, label: 'text-faq-help' },
  { href: ROUTES.CONTACT, label: 'nav-menu-contact' },
];

export default function MobileMainMenu() {
  const {isAuthorized} = useUser()
  const { mutate: logout } = useLogout();
  const { t } = useTranslation('common');
  const router = useRouter();
  const [sideBar, closeSidebar] = useAtom(drawerAtom);

  function handleClick(path: string) {
    if (path === '/logout') {
      logout()
      return
    }  else {
      router.push(path);
    }
    closeSidebar({ display: false, view: '' });
  }

  useEffect(()=> {
    
    if (sideBar.display) {
      router.beforePopState((e) => {
          window.history.go(1)
          closeSidebar({ display: false, view: '' })
        return true
      })
    } else {
      router.beforePopState((e) => {
        if (e.url === '/#') {
          router.back()
        }
        return true
      })
    }
   
  },[sideBar])

  return (
    <DrawerWrapper>
      <ul className="flex-grow">
        {(isAuthorized ? headerLinks : unHeaderLinks).map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <button
              onClick={() => handleClick(href)}
              className="flex items-center py-3 px-5 md:px-8 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent cursor-pointer"
            >
              {t(label)}
            </button>
          </li>
        ))}
      </ul>
    </DrawerWrapper>
  );
}

import { siteSettings } from '@/settings/site';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import DrawerWrapper from '@/components/ui/drawer/drawer-wrapper';
import { useAtom } from 'jotai';
import { drawerAtom } from '@/store/drawer-atom';
import { useUser , useLogout} from '@/framework/user';
import { useEffect } from 'react';

export default function MobileAuthorizedMenu() {
  const { mutate: logout } = useLogout();
  const { t } = useTranslation('common');
  const router = useRouter();
  const [sideBar, closeSidebar] = useAtom(drawerAtom);

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

  
  function handleClick(path: string) {

    if (path === '/logout') {
      closeSidebar({ display: false, view: '' });
      logout()
      return
    } else {
      router.push(path);
    }
    closeSidebar({ display: false, view: '' });
  }
  return (
    <DrawerWrapper>
      <ul className="flex-grow">

        {siteSettings.authorizedLinksMobile.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <span
              className="block px-5 py-3 text-sm font-semibold capitalize transition duration-200 cursor-pointer md:px-8 text-heading hover:text-accent"
              onClick={() => handleClick(href)}
            >
              {t(label)}
            </span>
          </li>
        ))}
      </ul>
    </DrawerWrapper>
  );
}

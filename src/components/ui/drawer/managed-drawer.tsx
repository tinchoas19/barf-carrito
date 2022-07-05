import MobileCategoryMenu from '@/components/layouts/mobile-menu/mobile-category-menu';
import { stockAuthBooleanAtom } from '@/store/authorization-atom';
import { drawerAtom } from '@/store/drawer-atom';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Drawer from './drawer';
const CartSidebarView = dynamic(
  () => import('@/components/cart/cart-sidebar-view')
);
const MobileAuthorizedMenu = dynamic(
  () => import('@/components/layouts/mobile-menu/mobile-authorized-menu')
);
const MobileMainMenu = dynamic(
  () => import('@/components/layouts/mobile-menu/mobile-main-menu')
);
const SearchFilterView = dynamic(
  () => import('@/components/search-view/sidebar-filter')
);

export default function ManagedDrawer() {
  const [{ display, view, data }, setDrawerState] = useAtom(drawerAtom);
  const router = useRouter()
  const [stockAuth, setStockAuth] = useAtom(stockAuthBooleanAtom)
  return (
    <Drawer
      open={display}
      onClose={() => {
      
        if (view === 'cart' && window.location.pathname === '/checkout') {
          setStockAuth(false)
          router.push('/').then(() => {
            setDrawerState({ display: false, view: '' })
          })
        } else {
          setDrawerState({ display: false, view: '' })
        }
      }}
      variant={
        [
          'FILTER_VIEW',
          'MAIN_MENU_VIEW',
          'FILTER_LAYOUT_TWO_VIEW',
          'SEARCH_FILTER',
        ].includes(view)
          ? 'left'
          : 'right'
      }
    >
      {view === 'cart' && <CartSidebarView />}
      {view === 'FILTER_VIEW' && <MobileCategoryMenu variables={data} />}
      {view === 'MAIN_MENU_VIEW' && <MobileMainMenu />}
      {view === 'AUTH_MENU_VIEW' && <MobileAuthorizedMenu />}
      {view === 'SEARCH_FILTER' && (
        <SearchFilterView
          type={data?.type}
          showManufacturers={data?.showManufacturers}
        />
      )}
    </Drawer>
  );
}

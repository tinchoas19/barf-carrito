import Link from '@/components/ui/link';
import { siteSettings } from '@/settings/site';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useLogout, useUser } from '@/framework/user';
import Button from '@/components/ui/button';

type DashboardSidebarProps = {
  className?: string;
};

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ className }) => {
  const { mutate: logout } = useLogout();

  const { t } = useTranslation();
  const { pathname } = useRouter();
  return (
    <aside className={className}>


      <div className="overflow-hidden border rounded border-border-200 bg-light">
        <ul className="py-7">
          {siteSettings.dashboardSidebarMenu
            ?.slice(0, -1)
            .map((item: any, idx) => (
              <li className="py-1" key={idx}>
                <Link
                  href={item.href}
                  className={classNames(
                    'block border-l-4 border-transparent py-2 px-10 font-semibold text-heading transition-colors hover:text-accent focus:text-accent',
                    {
                      '!border-accent text-accent': pathname === item.href,
                    }
                  )}
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
        </ul>
        {/* End of top part menu */}

        <ul className="py-4 border-t border-border-200 bg-light">
          <li className="block py-2 px-11 ">
            <button
              onClick={() => logout()}
              className={classNames(
                'font-semibold text-heading transition-colors hover:text-accent focus:text-accent'
              )}
            >
              {t('profile-sidebar-logout')}
            </button>
          </li>
        </ul>
        {/* End of bottom part menu */}
      </div>
    </aside>
  );
};

export default DashboardSidebar;

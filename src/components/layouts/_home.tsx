import Header from './header';
import HeaderMinimal from './header-minimal';
import MobileNavigation from './mobile-navigation';
import Footer from './footer';

export default function HomeLayout({
  children,
  layout,
}: React.PropsWithChildren<{ layout: string }>) {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-150 bg-gray-100">
      {['minimal', 'compact'].includes(layout) ? (
        <HeaderMinimal layout={layout} />
      ) : (
        <Header layout={layout} />
      )}
      <div className="min-h-screen">{children}</div>
      {['compact'].includes(layout) && <Footer />}
      <MobileNavigation>

      </MobileNavigation>
    </div>
  );
}

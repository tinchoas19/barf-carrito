import { Image } from '@/components/ui/image';
import cn from 'classnames';
import Link from '@/components/ui/link';
import { logoPlaceholder } from '@/lib/placeholders';
import { useSettings } from '@/framework/settings';

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  const {
    settings: { logo, siteTitle },
  } = useSettings();
  return (
    <Link href="/" className={cn('inline-flex', className)} {...props}>
      <span className="relative h-12 w-56 overflow-hidden md:w-60">
        <Image
          src={logoPlaceholder}
          alt={siteTitle || 'BARF'}
          layout="fill"
          objectFit="contain"
          loading="eager"
        />
      </span>
    </Link>
  );
};

export default Logo;

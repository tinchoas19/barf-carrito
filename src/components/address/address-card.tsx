import { CloseIcon } from '@/components/icons/close-icon';
import { PencilIcon } from '@/components/icons/pencil-icon';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

interface AddressProps {
  address: any;
  checked: boolean;
  onEdit: () => void;
  onDelete?: () => void;
  parentPage?:string;
  isLoading?:boolean;
}
const AddressCard: React.FC<AddressProps> = ({
  checked,
  address,
  onEdit,
  onDelete,
  isLoading
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={classNames(
        'relative p-4 rounded border cursor-pointer group hover:border-accent',
        {
          'border-accent shadow-sm': checked,
          'bg-gray-100 border-transparent': !checked,
        }
      )}
    >
      <p className="text-sm text-heading font-semibold mb-3 capitalize">
        {address?.street_address} {address?.street_number}
      </p>
      <p className="text-sm text-sub-heading">
        {address?.city_name}
      </p>
      <div className="absolute top-4 ltr:right-4 rtl:left-4 flex space-x-2 rtl:space-x-reverse  opacity-0 group-hover:opacity-100">
        {onEdit && (
          <button
            className="flex items-center justify-center w-5 h-5 rounded-full bg-accent text-light"
            onClick={onEdit}
          >
            <span className="sr-only">{t('text-edit')}</span>
            <PencilIcon className="w-3 h-3" />
          </button>
        )}
        {onDelete && !isLoading &&
          <button className={"flex items-center justify-center w-5 h-5 rounded-full text-light hover:opacity-80 " +
          (isLoading ? 'bg-gray-600' : "bg-red-600")
          }
            onClick={onDelete}
            disabled={isLoading}
          >
            <CloseIcon className="w-3 h-3" />
          </button>
          }
          {onDelete && isLoading && <span
            className='h-5 w-5 ltr:ml-2 rtl:mr-2 opacity-60 rounded-full border-2 border-transparent border-t-2 animate-spin'
            style={{borderTopColor:'#000000'}}
          />}
      </div>
    </div>
  );
};

export default AddressCard;

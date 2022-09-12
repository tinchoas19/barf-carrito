import { useTranslation } from 'next-i18next';
import { useEffect} from 'react';
import { useAtom } from 'jotai';
import { checkoutNoteAtom } from '@/store/checkout';
import Input from '@/components/ui/forms/input';


const NoteGrid: React.FC<{ className?: string; theme?: 'bw'; getValue?:Function; }> = ({
  className,
}) => {
  const [checkoutNote, setCheckoutNote] = useAtom(checkoutNoteAtom);
  const { t } = useTranslation('common');

  useEffect(() => {
    setCheckoutNote('')
  },[])

  function getValue(data: any) {
    setCheckoutNote(data)
  }
  
  return (
    <div className={className}>
        <Input
            label={t('text-checkout-note')}
            variant="outline"
            callback={getValue}
          />
    </div>
  );
};

export default NoteGrid;

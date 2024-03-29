import { RadioGroup } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import Alert from '@/components/ui/alert';
import { useAtom } from 'jotai';
import { paymentMethodAtom } from '@/store/checkout';
import cn from 'classnames';
import { useSettings } from '@/framework/settings';


const PaymentGrid: React.FC<{ className?: string; theme?: 'bw'; getValue?:Function; }> = ({
  className,
  theme,
  getValue
}) => {
  const { settings : {paymentMethods:AVAILABLE_PAYMENT_METHODS_MAP }} = useSettings()

  const [gateway, setGateway] = useAtom(paymentMethodAtom);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { t } = useTranslation('common');
  useEffect(() => {
    setGateway(null)
  },[])

  useEffect(() => {
    getValue && getValue(gateway ? gateway.value : '')
  },[gateway])
  
  return (
    <div className={className}>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}

      <RadioGroup value={gateway} onChange={setGateway}>
        <RadioGroup.Label className="text-base text-heading font-semibold mb-5 block text-center">
          {t('text-choose-payment')}
        </RadioGroup.Label>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 mb-8">
          {AVAILABLE_PAYMENT_METHODS_MAP.map(
            (method) => (
              method.value.length > 0 && <RadioGroup.Option value={method} key={method.id}>
                {({ checked }) => (
                  <div
                    className={cn(
                      'w-full h-full py-3 flex items-center justify-center border text-center rounded cursor-pointer relative bg-light border-gray-200',
                      checked && 'bg-light !border-accent shadow-600',
                      {
                        'bg-light !border-gray-800 shadow-600':
                          theme === 'bw' && checked,
                      }
                    )}
                  >
                    {method.icon ? (
                      <>
                        {/* eslint-disable */}
                        <img src={method.icon} alt={method.name} className="h-[30px]" />
                      </>
                    ) : (
                      <span className="text-xs text-heading font-semibold">
                        {method.name}
                      </span>
                    )}
                  </div>
                )}
              </RadioGroup.Option>
            )
          )}
        </div>
      </RadioGroup>

    </div>
  );
};

export default PaymentGrid;

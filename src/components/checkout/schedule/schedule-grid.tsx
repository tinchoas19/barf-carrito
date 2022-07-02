import { RadioGroup } from '@headlessui/react';
import { useAtom } from 'jotai';
import ScheduleCard from './schedule-card';
import { deliveryTimeAtom, pickupTimeAtom, shippingAddressAtom } from '@/store/checkout';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

interface ScheduleProps {
  label: string;
  schedules: any[];
  className?: string;
  count?: number;
  isPickup?: boolean;
  hasInnerHTML?: boolean;
}

export const ScheduleGrid: React.FC<ScheduleProps> = ({
  label,
  className,
  count,
  isPickup,
  schedules,
  hasInnerHTML
}) => {
  const { t } = useTranslation('common');
  //const schedules = isPickup ? pickup : deliveryTime
  const atom = isPickup ? pickupTimeAtom : deliveryTimeAtom
  const [selectedSchedule, setSchedule] = useAtom(atom);
  const [shippingAddress] = useAtom(shippingAddressAtom)

  useEffect(() => {
    setSchedule(null)
  },[shippingAddress])

  return (
    <div className={className}>
      <div className="mb-5 flex items-center justify-between md:mb-8">
        <div className="flex items-center space-x-3 rtl:space-x-reverse md:space-x-4">
          {count && (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-base text-light lg:text-xl">
              {count}
            </span>
          )}
          <p className="text-lg capitalize text-heading lg:text-xl">{label}</p>
        </div>
      </div>

      {schedules && schedules?.length ? (
        <RadioGroup value={selectedSchedule} onChange={setSchedule}>
          <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {schedules?.map((schedule: any, idx: number) => (
              <RadioGroup.Option value={schedule} key={idx}>
                {({ checked }) => (
                  <ScheduleCard checked={checked} schedule={schedule} hasInnerHTML={true}/>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <span className="relative rounded border border-border-200 bg-gray-100 px-5 py-6 text-center text-base">
            {t('text-no-delivery-time-found')}
          </span>
        </div>
      )}
    </div>
  );
};
export default ScheduleGrid;

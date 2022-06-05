import { RadioGroup } from '@headlessui/react';
import { useAtom } from 'jotai';
import classNames from "classnames";
import ScheduleCard from '../schedule/schedule-card';
import { deliveryTimeAtom } from '@/store/checkout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useSettings } from '@/framework/settings';

interface ScheduleProps {
  label: string;
  className?: string;
  count?: number;
  callback?: Function;
  data: any[]
  type: string
  isWithdrawal?:boolean;
}

export const CheckboxGrid: React.FC<ScheduleProps> = ({
  label,
  className,
  count,
  callback,
  data : dataProps,
  type,
  isWithdrawal
}) => {
  /* const {
    settings: { deliveryTime: schedules },
  } = useSettings(); */
  const { t } = useTranslation('common');
  const {settings : {withdrawals}} = useSettings()
  const data  = isWithdrawal ? withdrawals:dataProps
  const [selectedData, setSelectedData] = useState({title: '', description: ''});


  useEffect(() => {
    if (callback) callback({[type]: selectedData})
  },[selectedData])
  
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
      {data && data?.length && (
        <RadioGroup value={data} onChange={setSelectedData}>
          <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {data?.map((aData: any, idx: number) => (
              <RadioGroup.Option value={aData} key={idx}>
                {() => (
                    <div
                    className={classNames(
                      "relative p-4 rounded border cursor-pointer group hover:border-accent",
                      {
                        "border-accent shadow-sm bg-white": (aData.title === selectedData.title),
                        "bg-gray-100 border-transparent": (aData.title !== selectedData.title),
                      }
                    )}
                  >
                    <span className="text-sm text-heading font-semibold block mb-2">
                      {aData.title}
                    </span>
                    <span className="text-sm text-heading block">{aData.description}</span>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup> )}
    </div>
  );
};
export default CheckboxGrid;

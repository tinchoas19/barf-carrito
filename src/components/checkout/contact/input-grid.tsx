import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { customerContactAtom } from '@/store/checkout';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { PlusIcon } from '@/components/icons/plus-icon';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import PhoneInput from '@/components/ui/forms/phone-input';
import Input from '@/components/ui/forms/input';

interface InputProps {
    contact: string | undefined | null;
    label: string;
    count?: number;
    className?: string;
    gridClassName?: string;
}

const InputGrid = ({
    contact,
    label,
    count,
    className,
    gridClassName,
}: InputProps) => {
    const [contactNumber, setContactNumber] = useAtom(customerContactAtom);
    const { t } = useTranslation('common');

    useEffect(() => {
        if (contact) {
            setContactNumber(contact);
            return;
        }
        setContactNumber('');
    }, [contact, setContactNumber]);


    return (
        <div className={className}>
            <div
                className={classNames('mb-5 flex items-center justify-between', {
                    'md:mb-8': "1",
                })}
            >
                <div
                    className={classNames('mb-5 flex items-center justify-between', {
                        'md:mb-8': count,
                    })}
                >
                    <div className="flex items-center space-x-3 rtl:space-x-reverse md:space-x-4">
                        {count && (
                            <span className="flex items-center justify-center w-8 h-8 text-base rounded-full bg-accent text-light lg:text-xl">
                                {count}
                            </span>
                        )}
                        <p className="text-lg capitalize text-heading lg:text-xl">{label}</p>
                    </div>

                    <button
                        className="flex items-center text-sm font-semibold transition-colors duration-200 text-accent hover:text-accent-hover focus:text-accent-hover focus:outline-none"

                    >
                        <PlusIcon className="h-4 w-4 stroke-2 ltr:mr-0.5 rtl:ml-0.5" />
                        {contactNumber ? t('text-update') : t('text-add')}
                    </button>
                </div>


            </div>
            <Input
                name=""

                value={contactNumber}
                type="text"
                variant="outline"
                className="mb-5"

            />
        </div>
    );
};

export default InputGrid;

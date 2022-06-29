import { useEffect, useState } from 'react';
import { AddressHeader } from '@/components/address/address-header';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface InputProps {
    contact: string | undefined | null;
    label: string;
    count: number | boolean | null;
    className?: string;
    gridClassName?: string;
    type: string;
    data?: string[];
    isDisabled?:boolean;
}

const InputGrid = ({
    contact,
    label,
    count = null,
    className,
    type,
    isDisabled,
    data
}: InputProps) => {
    const router = useRouter();
    const [contactNumber, setContactNumber] = useState('');
    const {t} = useTranslation('common')

    useEffect(() => {
        if (contact) {
            setContactNumber(contact);
            return;
        }
    }, [contact, setContactNumber]);


    return (
        <div className={className}>
            {type === 'contact'
            ? <AddressHeader onAdd={() => {router.push('/profile')}} count={count} label={label} type={type} isDisabled={isDisabled}/>
            :<AddressHeader count={count} label={label} type={type} isDisabled={isDisabled}/>
        }
            <div className="grid grid-cols-1 gap-4">
                <span className="relative px-5 py-3 text-base text-center bg-gray-100 border rounded border-border-200">
                    {type === 'contact' && ((contactNumber.length > 10000) ? contactNumber : t('text-need-contact-number'))}
                    {data && data.map(text => {
                        return (<p key={text}>{text}</p>)
                    })}
                </span>
            </div>
        </div>
        
    );
};

export default InputGrid;

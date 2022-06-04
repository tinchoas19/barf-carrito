import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { customerContactAtom } from '@/store/checkout';
import { AddressHeader } from '@/components/address/address-header';
import { useRouter } from 'next/router';

interface InputProps {
    contact: string | undefined | null;
    label: string;
    count: number | boolean | null;
    className?: string;
    gridClassName?: string;
    type: string;
    data?: string[];
}

const InputGrid = ({
    contact,
    label,
    count = null,
    className,
    gridClassName,
    type,
    data
}: InputProps) => {
    const router = useRouter();
    const [contactNumber, setContactNumber] = useState('');

    useEffect(() => {
        if (contact) {
            setContactNumber(contact);
            return;
        }
    }, [contact, setContactNumber]);


    return (
        <div className={className}>
            {type === 'contact'
            ? <AddressHeader onAdd={() => {router.push('/profile')}} count={count} label={label} type={type}/>
            :<AddressHeader count={count} label={label} type={type}/>
        }
            <div className="grid grid-cols-1 gap-4">
                <span className="relative px-5 py-3 text-base text-center bg-gray-100 border rounded border-border-200">
                    {contactNumber.length > 0 && contactNumber}
                    {data && data.map(text => {
                        return (<p key={text}>{text}</p>)
                    })}
                </span>
            </div>
        </div>
        
    );
};

export default InputGrid;

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { customerContactAtom } from '@/store/checkout';
import { AddressHeader } from '@/components/address/address-header';
import { useRouter } from 'next/router';

interface InputProps {
    contact: string | undefined | null;
    label: string;
    count: number | boolean;
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
    const router = useRouter();
    const [contactNumber, setContactNumber] = useAtom(customerContactAtom);

    useEffect(() => {
        if (contact) {
            setContactNumber(contact);
            return;
        }
        setContactNumber('');
    }, [contact, setContactNumber]);


    return (
        <div className={className}>
            <AddressHeader onAdd={() => router.push('/profile')} count={count} label={label} isContact={true}/>
            <div className="grid grid-cols-1 gap-4">
                <span className="relative px-5 py-3 text-base text-center bg-gray-100 border rounded border-border-200">
                    {contactNumber}
                </span>
            </div>
        </div>
        
    );
};

export default InputGrid;

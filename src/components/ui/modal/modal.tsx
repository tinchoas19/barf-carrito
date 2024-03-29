import { CloseIcon } from '@/components/icons/close-icon';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export function useWindowDimensions() {

  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }

  useEffect(() => {
    if (hasWindow) {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);


  return windowDimensions;
}



export default function Modal({ open, onClose, children }: any) {
  const cancelButtonRef = useRef(null);
  const { t } = useTranslation('common');
  const { width:innerWidth } = useWindowDimensions();
  const router = useRouter()

  useEffect(()=> {
    if (open) {
      router.beforePopState((e) => {
          window.history.go(1)
          onClose()
        return true
      })
    } else {
      router.beforePopState((e) => {
        if (e.url === '/#') {
          router.back()
        }
        return true
      })
    }
   
  },[open])


  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        initialFocus={cancelButtonRef}
        static
        open={open}
        onClose={onClose}
      >
        <div className="min-h-full md:p-5 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-50 w-full h-full" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block min-w-content max-w-full ltr:text-left rtl:text-right align-middle transition-all relative">
              <button
                onClick={onClose}
                aria-label="Close panel"
                ref={cancelButtonRef}
                className={"inline-block lg:hidden outline-none focus:outline-none absolute ltr:right-4 rtl:left-4 top-4 z-[60] "
                + (innerWidth && innerWidth < 768 && 'mr-6')}
              >
                <span className="sr-only">{t('text-close')}</span>
                <div className={'rounded-full p-1 bg-white ' + (innerWidth && innerWidth < 768 && 'fixed')}>
                <CloseIcon className="w-4 h-4" />
                </div>
              </button>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

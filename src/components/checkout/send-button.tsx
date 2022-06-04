import Button from '@/components/ui/button';
import classNames from 'classnames';

export const SendButton: React.FC<{callback:Function, disabled?:boolean, label:string}> = (
  {callback, disabled, label}) => {
  return (
    <>
      <Button
        className={classNames('mt-5 w-full')}
        onClick={() => callback()}
        disabled={disabled}
      >{label}</Button>
    </>
  );
};
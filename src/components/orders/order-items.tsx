import { Table } from '@/components/ui/table';
import usePrice from '@/lib/use-price';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/lib/locals';
import { useMemo } from 'react';
import { Image } from '@/components/ui/image';
import { productPlaceholder } from '@/lib/placeholders';

const OrderItemList = (_: any, record: any) => {
  console.log('record', record);
  // const { price } = usePrice({
  //   amount: parseInt(record.price),
  // });
  let price = '$' + record.price;
  let name = record.name;
  // if (record?.pivot?.variation_option_id) {
  //   const variationTitle = record?.variation_options?.find(
  //     (vo: any) => vo?.id === record?.pivot?.variation_option_id
  //   )['title'];
  //   name = `${name} - ${variationTitle}`;
  // }
  return (
    <div className="flex items-center">
      <div className="relative flex h-16 w-16 shrink-0 overflow-hidden rounded">
        <Image
          src={record.image?.thumbnail ?? productPlaceholder}
          alt={name}
          className="h-full w-full object-cover"
          layout="fill"
        />
      </div>

      <div className="flex flex-col overflow-hidden ltr:ml-4 rtl:mr-4">
        <div className="mb-1 flex">
          <span className="inline-block overflow-hidden truncate text-sm text-body">
            {name}
          </span>
        </div>
        <span className="mb-1 inline-block overflow-hidden truncate text-sm font-semibold text-accent">
          {price}
          <span className="overflow-hidden text-sm font-light text-body">
            &nbsp;x
            <span className="font-semibold text-heading ">
              &nbsp;{record.quantity}&nbsp;
            </span>
            Kg{record.quantity > 1 && 's'}
          </span>
        </span>
      </div>
    </div>
  );
};
export const OrderItems = ({ products }: { products: any }) => {
  const { t } = useTranslation('common');
  const { alignLeft, alignRight } = useIsRTL();

  const orderTableColumns = useMemo(
    () => [
      {
        title: <span className="ltr:pl-20 rtl:pr-20">{t('text-item')}</span>,
        dataIndex: '',
        key: 'items',
        align: alignLeft,
        width: 250,
        ellipsis: true,
        render: OrderItemList,
      },

      {
        title: t('text-price'),
        dataIndex: '',
        key: 'price',
        align: alignRight,
        width: 100,
        render: function RenderPrice(pivot: any) {
          let price = parseInt(pivot.price) * parseInt(pivot.quantity);

          return <p>${price}</p>;
        },
      },
    ],
    [alignLeft, alignRight, t]
  );
  console.log('products', products);
  return (
    <Table
      //@ts-ignore
      columns={orderTableColumns}
      data={products}
      rowKey={(record: any) => record.created_at}
      className="orderDetailsTable w-full"
      scroll={{ x: 350, y: 500 }}
    />
  );
};

interface ItemInfoRowProps {
  title: string;
  value: string;
  bold?: boolean;
}
export const ItemInfoRow: React.FC<ItemInfoRowProps> = ({ title, value, bold }) => {
  if (bold) return <div className="flex justify-between">
    <p className="text-sm text-body"><b>{title}</b></p>
    <span className="text-sm text-body"><b>{value}</b></span>
  </div>
  else return <div className="flex justify-between">
<p className="text-sm text-body">{title}</p>
<span className="text-sm text-body">{value}</span>
</div>
}

import classNames from "classnames";

interface ScheduleProps {
  schedule: any;
  checked: boolean;
  hasInnerHTML?:boolean;
}
const ScheduleCard: React.FC<ScheduleProps> = ({ checked, schedule , hasInnerHTML}) => (
  <div
    className={classNames(
      "relative p-4 rounded border cursor-pointer group hover:border-accent",
      {
        "border-accent shadow-sm": checked,
        "bg-gray-100 border-transparent": !checked,
      }
    )}
  >
    <span className="text-sm text-heading font-semibold block mb-2">
      {schedule.name}
    </span>
    {hasInnerHTML ? 
    <span dangerouslySetInnerHTML={{ __html:schedule.details }}/>
    : <span className="text-sm text-heading block">{schedule.details}</span>
  }
  </div>
);

export default ScheduleCard;

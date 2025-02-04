import { TentTree, CalendarCheck2, ImageOff } from 'lucide-react';
import Card from './Card';

const HoverDevCards = (): JSX.Element => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      <Card
        title="Care Schedules Created"
        subtitle="Personalized care tracking"
        Icon={CalendarCheck2}
      />
      <Card
        title="Unidentified Images"
        subtitle="Pending image identification"
        Icon={ImageOff}
      />
      <Card
        title="Identified Plants"
        subtitle="Overview of all identified plant species"
        Icon={TentTree}
      />
    </div>
  );
};

export default HoverDevCards;

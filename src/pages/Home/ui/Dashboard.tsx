import HoverDevCards from './HoverCard';
import TopPlantedPlants from './TopPlantedPlants';

const Dashboard = () => {
  return (
    <div className="space-y-3 p-4">
      <HoverDevCards />
      <TopPlantedPlants />
    </div>
  );
};

export default Dashboard;

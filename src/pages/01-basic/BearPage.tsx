import { WhiteCard } from '../../components';
import { BearSpecies, useBearStore } from '../../stores';

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BearCard species={BearSpecies.Black} />
        <BearCard species={BearSpecies.Polar} />
        <BearCard species={BearSpecies.Panda} />
      </div>
    </>
  );
};

interface BearCardProps {
  species: BearSpecies;
}

const BearCard: React.FC<BearCardProps> = ({ species }) => {
  const bears = useBearStore((state) => state[species]);
  const updateBears = useBearStore((state) => state.updateBears);
  const ToTitleCase = (str: string): string =>
    str.toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <WhiteCard centered>
      <h2>{`${ToTitleCase(species)} bears`}</h2>
      <div className="flex flex-col md:flex-row">
        <button onClick={() => updateBears(species, 1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {bears} </span>
        <button onClick={() => updateBears(species, -1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export default BearPage;

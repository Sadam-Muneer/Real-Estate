import { PROPERTIES } from "../constants/data";
import Item from "../components/Item";
import Searchbar from "../components/Searchbar";

const Properties = () => {
  return (
    <main className="max-padd-container my-[99px]">
      <div className="max-padd-container py-10 xl:py-22 bg-primary rounded-3xl">
        <div>
          <Searchbar />
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10">
          {PROPERTIES.map((property) => (
            <Item key={property.title} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Properties;

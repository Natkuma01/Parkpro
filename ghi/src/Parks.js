import CardList from "./CardList";
import FilterForm from "./FilterForm";

function Parks({ parks }) {
  return (
    <div className="parks">
      <FilterForm />
      <CardList parks={parks} />
    </div>
  );
}

export default Parks;

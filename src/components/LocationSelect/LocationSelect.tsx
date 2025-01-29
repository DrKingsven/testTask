import { LocationsStore } from "../../store/useLocationsStore";
import "./LocationSelect.css"
interface LocationSelectProps {
    store: LocationsStore;
    setSelectedLocationID: (id: number) => void;
  }
  
  const LocationSelect = ({ store, setSelectedLocationID }: LocationSelectProps) => {
    return (
      <label className="customLabel">
        <span className="parameterName">Локация:</span>
        <select onChange={(e) => setSelectedLocationID(Number(e.target.value))}>
          <option value={0}>Выберите локацию</option>
          {store.locations.map((location) => (
            <option key={location.locationID} value={location.locationID}>
              {location.name}
            </option>
          ))}
        </select>
      </label>
    );
  };

  export default LocationSelect
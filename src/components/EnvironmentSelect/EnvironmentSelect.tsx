import { Environment, LocationsStore } from "../../store/useLocationsStore";
import "./EnvironmentSelect.css"
interface EnvironmentSelectProps {
    store: LocationsStore;
    selectedLocationID: number;
    setSelectedEnvironmentID: (id: number) => void;
    filteredEnvironments: Environment[];
  }
  
  const EnvironmentSelect = ({
   
    setSelectedEnvironmentID,
    filteredEnvironments,
  }: EnvironmentSelectProps) => {
    return (
      <label className="customLabel">
        <span className="parameterName">Среда:</span>
        <select
          onChange={(e) => setSelectedEnvironmentID(Number(e.target.value))}
          disabled={filteredEnvironments.length === 0}
        >
          <option value={0}>Выберите среду </option>
          {filteredEnvironments.map((environment) => (
            <option
              key={environment.environmentID}
              value={environment.environmentID}
            >
              {environment.name}
            </option>
          ))}

        </select>
      </label>
    );
  };

  export default EnvironmentSelect
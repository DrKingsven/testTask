import { useMemo, useState } from "react";
import { LocationsStore, Location } from "../../store/useLocationsStore";
import LocationSelect from "../LocationSelect/LocationSelect";
import EnvironmentSelect from "../EnvironmentSelect/EnvironmentSelect";
import ServerList from "../ServerList/ServerList";
import "./TestLocationForm.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVial, faTrash } from "@fortawesome/free-solid-svg-icons";
import HintInput from "../HintInput/HintInput";

interface TestLocationFormProps {
  store: LocationsStore;
  index: number;
  location: Location & { hint: string; environmentID: number };
  onLocationChange: (index: number, locationID: number, environmentID: number, hint: string) => void;
  onRemoveLocation: (index: number) => void;  
}

const TestLocationForm = ({ store, index, location, onLocationChange, onRemoveLocation }: TestLocationFormProps) => {
  const [selectedLocationID, setSelectedLocationID] = useState<number>(location.locationID || 0);
  const [selectedEnvironmentID, setSelectedEnvironmentID] = useState<number>(location.environmentID || 0);
  const [hint, setHint] = useState<string>(location.hint || "");

  const filteredEnvironments = useMemo(() => {
    const environmentIDs = new Set(
      store.servers
        .filter((server) => server.locationID === selectedLocationID)
        .map((server) => server.environmentID)
    );
    return store.environments.filter((env) => environmentIDs.has(env.environmentID));
  }, [selectedLocationID, store.servers, store.environments]);

  const filteredServers = useMemo(() => {
    return store.servers.filter(
      (server) =>
        server.locationID === selectedLocationID &&
        server.environmentID === selectedEnvironmentID
    );
  }, [selectedLocationID, selectedEnvironmentID, store.servers]);

  const handleLocationChange = (newLocationID: number) => {
    setSelectedLocationID(newLocationID);
    onLocationChange(index, newLocationID, selectedEnvironmentID, hint);
  };

  const handleEnvironmentChange = (newEnvironmentID: number) => {
    setSelectedEnvironmentID(newEnvironmentID);
    onLocationChange(index, selectedLocationID, newEnvironmentID, hint);
  };

  const handleHintChange = (newHint: string) => {
    setHint(newHint);
    onLocationChange(index, selectedLocationID, selectedEnvironmentID, newHint);
  };

  return (
    <div className="list">
      <div className="headerLocation">
        {
        <>
        <span> <FontAwesomeIcon icon={faVial} />Тестовая локация {index + 1}</span>
        <button
        className="delete-location"
        onClick={() => onRemoveLocation(index)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      </>
        }
      </div>
      <div className="parameterString">
        <LocationSelect store={store} setSelectedLocationID={handleLocationChange} />
        <EnvironmentSelect
          store={store}
          selectedLocationID={selectedLocationID}
          setSelectedEnvironmentID={handleEnvironmentChange}
          filteredEnvironments={filteredEnvironments}
        />
        <ServerList filteredServers={filteredServers} />
      </div>
      <HintInput hint={hint} onHintChange={handleHintChange} />

      
    </div>
  );
};

export default TestLocationForm;

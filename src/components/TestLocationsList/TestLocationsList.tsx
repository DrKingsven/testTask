import { useEffect, useState } from "react";
import { useLocationsStore, Location } from "../../store/useLocationsStore";
import TestLocationForm from "../TestLocationForm/TestLocationForm";
import './TestLocationsList.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faPlus } from "@fortawesome/free-solid-svg-icons";

const TestLocationsList = () => {
  const [locationsList, setLocationsList] = useState<(Location & { hint: string; environmentID: number })[]>([]);
  const store = useLocationsStore();

  useEffect(() => {
    store.fetch();
  }, [store]);

  const handleAddLocation = () => {
    setLocationsList((prevLocations) => [
      ...prevLocations,
      { locationID: prevLocations.length + 1, name: "", hint: "", environmentID: 0 }
    ]);
  };

  const handleConsoleLog = () => {
    const result = locationsList.map((location) => ({
      locationID: location.locationID,
      environmentID: location.environmentID,
      hint: location.hint || '',
    }));

    console.log(result);
  };

  const handleLocationChange = (index: number, locationID: number, environmentID: number, hint: string) => {
    setLocationsList((prevLocations) => {
      const updatedLocations = [...prevLocations];
      updatedLocations[index] = { ...updatedLocations[index], locationID, environmentID, hint };
      return updatedLocations;
    });
  };

  const handleRemoveLocation = (index: number) => {
    setLocationsList((prevLocations) => prevLocations.filter((_, i) => i !== index));
  };

  return (
    <div className="content">
      {!store.isLoaded ? (
        <div className="loadedFalse"><span className="loadedFalseText">Загрузка данных...</span></div>
      ) : (
        <div>
          {locationsList.map((location, index) => (
            <TestLocationForm
              store={store}
              key={`location-${index}`}
              index={index}
              location={location}
              onLocationChange={handleLocationChange}
              onRemoveLocation={handleRemoveLocation}
            />
          ))}

          <div className={"buttonBox"}>
            <button
              type="button"
              className={"createLocation"}
              disabled={!store.isLoaded}
              onClick={handleAddLocation}
            >
              <span>
                <FontAwesomeIcon icon={faPlus} /> Добавить тестовую локацию
              </span>
            </button>

            <button className={"logLocation"} onClick={handleConsoleLog}>
              <span>
                 <FontAwesomeIcon icon={faClipboardList} /> Вывести результат в консоль
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestLocationsList;

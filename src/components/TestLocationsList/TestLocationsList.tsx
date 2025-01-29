import { useEffect, useState } from "react";
import { useLocationsStore, Location } from "../../store/useLocationsStore";
import TestLocationForm from "../TestLocationForm/TestLocationForm";
import './TestLocationsList.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList, faPlus } from "@fortawesome/free-solid-svg-icons";

const TestLocationsList = () => {
  const [locationsList, setLocationsList] = useState<(Location & { hint: string; environmentID: number; locationNumber: number })[]>([]);
  const store = useLocationsStore();

  useEffect(() => {
    store.fetch();
  }, [store]);

  const generateLocationNumber = () => {
    return Math.max(0, ...locationsList.map(location => location.locationNumber)) + 1;
  };

  const handleAddLocation = () => {
    const newLocationNumber = generateLocationNumber();
    setLocationsList((prevLocations) => [
      ...prevLocations,
      {
        locationID: prevLocations.length + 1,
        name: "",
        hint: "",
        environmentID: 0,
        locationNumber: newLocationNumber, 
      },
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

  const handleLocationChange = (locationNumber: number, locationID: number, environmentID: number, hint: string) => {
    setLocationsList((prevLocations) => {
      const updatedLocations = prevLocations.map((location) =>
        location.locationNumber === locationNumber
          ? { ...location, locationID, environmentID, hint }
          : location
      );
      return updatedLocations;
    });
  };

  const handleRemoveLocation = (locationNumber: number) => {
    setLocationsList((prevLocations) => prevLocations.filter((location) => location.locationNumber !== locationNumber));
  };

  return (
    <div className="content">
      {!store.isLoaded ? (
        <div className="loadedFalse"><span className="loadedFalseText">Загрузка данных...</span></div>
      ) : (
        <div>
          {locationsList.map((location) => (
            <TestLocationForm
              store={store}
              key={location.locationNumber} 
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

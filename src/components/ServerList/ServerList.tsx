import { useEffect, useState } from "react"; 
import { Server } from "../../store/useLocationsStore";
import "./ServerList.css"

interface ServerListProps {
  filteredServers: Server[];
}

const ServerList = ({ filteredServers }: ServerListProps) => {
  const [textValue, setTextValue] = useState<string>("");

  useEffect(() => {
    if (filteredServers.length === 0) {
      setTextValue("Сервера не найдены");
    } else {
      setTextValue(filteredServers.map((server) => server.name).join(", "));
    }
  }, [filteredServers]);

  return (
    <div className="serverString">
      <span className="parameterName"> Cервера:</span>

      <textarea
        className="customTextarea"
        value={textValue} 
        readOnly={true}
      />
    </div>
  );
};

export default ServerList;

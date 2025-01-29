import "./HintInput.css"

interface HintInputProps {
  hint: string;
  onHintChange: (newHint: string) => void;
}

const HintInput = ({ hint, onHintChange }: HintInputProps) => {
  return (
    <label>
      <span className="parameterName">Подсказка:</span>
      <div className="hintBox">
      <input
        className="hintInput"
        type="text"
        value={hint}
        onChange={(e) => onHintChange(e.target.value)} // Обновляем подсказку
        placeholder="Введите подсказку"
      />
      </div>
    </label>
  );
};

export default HintInput;

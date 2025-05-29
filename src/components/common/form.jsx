import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const styles = `
  .form-container {
    font-family: 'Poppins', sans-serif;
  }

  .form-group {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .form-label {
    font-size: 0.95rem;
    font-weight: 500;
    color: #4b5563;
    margin-bottom: 0.5rem;
    display: block;
    transition: all 0.3s ease;
  }

  .form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    background-color: #ffffff;
    transition: all 0.3s ease;
    color: #1f2937;
  }

  .form-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .form-input:hover {
    border-color: #93c5fd;
  }

  .form-input::placeholder {
    color: #9ca3af;
  }

  .form-button {
    width: 100%;
    padding: 0.875rem;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background: linear-gradient(to right, #1e40af, #3b82f6);
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
  }

  .form-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
  }

  .form-button:disabled {
    background: #e5e7eb;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .select-trigger {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    background-color: #ffffff;
    transition: all 0.3s ease;
    color: #1f2937;
  }

  .select-trigger:hover {
    border-color: #93c5fd;
  }

  .select-trigger:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .textarea-input {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    background-color: #ffffff;
    transition: all 0.3s ease;
    color: #1f2937;
    min-height: 100px;
    resize: vertical;
  }

  .textarea-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .textarea-input:hover {
    border-color: #93c5fd;
  }
`;

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <input
            className="form-input"
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="select-trigger">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                  <SelectItem key={optionItem.id} value={optionItem.id}>
                    {optionItem.label}
                  </SelectItem>
                ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <textarea
            className="textarea-input"
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <input
            className="form-input"
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <>
      <style>{styles}</style>
      <form onSubmit={onSubmit} className="form-container">
        <div className="flex flex-col gap-3">
          {formControls.map((controlItem) => (
            <div className="form-group" key={controlItem.name}>
              <label className="form-label" htmlFor={controlItem.name}>
                {controlItem.label}
              </label>
              {renderInputsByComponentType(controlItem)}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="form-button"
          disabled={isBtnDisabled}
        >
          {buttonText || "Submit"}
        </button>
      </form>
    </>
  );
}

export default CommonForm;

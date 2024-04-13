import "./styles/floatinglabel.css";
import React, { ChangeEvent } from "react";

interface Props {
  value: string;
  type: string;
  name: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FloatingLabel: React.FC<Props> = (props) => {
  return (
    <div className="form-group-floating">
      <input
        value={props.value}
        type={props.type}
        name={props.name}
        className="form-control-floating"
        id="floating"
        placeholder=" "
        onChange={props.onChange}
      />
      <label htmlFor="floatingInput">{props.label}</label>
    </div>
  );
};

export default FloatingLabel;

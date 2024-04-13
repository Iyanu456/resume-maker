import React, { useState, ChangeEvent } from 'react';
import ToggleIcon from './ToogleIcon';
import './styles/floatinglabel.css';

interface Props {
  value: string;
  name: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FloatingPassword: React.FC<Props> = (props) => {
  const [passwordVisible, setVisibility] = useState(false);

  return (
    <div className="form-group-floating">
      <input
        value={props.value}
        type={passwordVisible ? 'text' : 'password'}
        name={props.name}
        className="form-control-floating"
        id="FloatingPassword"
        placeholder=" "
        onChange={props.onChange}
      />

      <label htmlFor="floatingInput">{props.label}</label>

      <ToggleIcon
        beforeClick="/eye.svg"
        afterClick="/eye-slash.svg"
        onClick={() => {
          setVisibility(!passwordVisible);
        }}
      />
    </div>
  );
};

export default FloatingPassword;

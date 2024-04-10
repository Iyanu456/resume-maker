import "./styles/floatinglabel.css";
import React, { useState } from "react";

interface Props {
  beforeClick: string;
  afterClick: string;
  onClick: () => void;
}

const ToogleIcon: React.FC<Props> = (props) => {
  const [icon, setIcon] = useState(false);

  return (
    <div className="icon-toggle-btn" onClick={props.onClick}>
    <button  onClick={() => { setIcon(!icon) }}>
    <img
        src={icon ? props.beforeClick : props.afterClick}
        style={{
          height: "20px",
          width: "20px"
        }}
        alt="Icon"
      />
    </button>
    </div>
  );
}

export default ToogleIcon;

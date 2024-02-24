import React, { ChangeEvent, useState, useEffect } from "react";
import InputLabel from "./InputLabel";

interface skillProps {
  formStyle?: string;
  index: any; // Unique index to identify the form
  data: {
    skill: string;
  };
  title?: string;
  onSave: (field: any, index: number, data: any) => void;
}

const SkillForm: React.FC<skillProps> = (props) => {
  const { index, data } = props;
  const [skillData, setSkillData] = useState(data);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      props.onSave('skill', index, skillData);
    }, 500); // Adjust the timeout duration as needed

    // Clear the timeout on component unmount or when educationData changes
    return () => clearTimeout(timeoutId);
  }, [skillData, index, props]);

  const handleInputChange = (field: string, value: string) => {
    setSkillData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <>
    <h1 className="section-title"><b>Skills</b></h1>
    <form className={props.formStyle} onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-1">
        <InputLabel
          label="skill"
          type="text"
          value={skillData.skill}
          handleChange={(e) => {
            handleInputChange("skill", e.target.value);
          }}
          />
      </div>
    </form>
    </>
  );
};

export default SkillForm;

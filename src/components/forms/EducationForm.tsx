import React, { ChangeEvent, useState } from "react";
import InputLabel from "../InputLabel";

interface EducationFormProps {
    formStyle: string;
    index: any; // Unique index to identify the form
    data: {
      school: string;
      degree: string;
      duration: string;
    };
    onSave: (index: number, data: any) => void;
  }

const EducationForm: React.FC<EducationFormProps> = (props) => {
    const { index, data } = props;
    const [educationData, setEducationData] = useState(data);

    const handleInputChange = (field: string, value: string) => {
        setEducationData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
      };
    
  const handleSave = () => {
    props.onSave(index, educationData);
  };
  return (
    
    <form className={props.formStyle} onSubmit={(e) => e.preventDefault()}>
      <h1 className="section-title"><b>Education</b></h1>
      <div className="flex flex-col gap-4">
        <InputLabel
          label='School'
          type='text'
          value={educationData.school}
          handleChange={(e) => {handleInputChange('school', e.target.value);
          }}
        />
        <div className="flex gap-5">
          <InputLabel
            label='Degree'
            type='text'
            value={educationData.degree}
            handleChange={(e) => {handleInputChange('degree', e.target.value);}}
          />
          <InputLabel
            label='Duration'
            type='text'
            value={educationData.duration}
            handleChange={(e) => {handleInputChange('duration', e.target.value)}}
          />
          <button onClick={handleSave}>save</button>
          
        </div>
      </div>
    </form>
  );
};

export default EducationForm;

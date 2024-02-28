import React, { ChangeEvent, useState, useEffect } from "react";
import InputLabel from "../InputLabel";

interface formProps {
  formStyle: string;
  index: any; // Unique index to identify the form
  data: {
    project: string;
    about: string;
    duration: string;
    description: string;
  };
  onSave: (field: string, index: number, data: any) => any;
  debounceTime: number;
}

const ProjectForm: React.FC<formProps> = (props) => {
  const { index, data } = props;
  const [projectData, setProjectData] = useState(data);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      props.onSave('project', index, projectData);
    }, props.debounceTime); // Adjust the timeout duration as needed

    // Clear the timeout on component unmount or when projectData changes
    return () => clearTimeout(timeoutId);
  }, [projectData, index, props]);

  const handleInputChange = (field: string, value: string) => {
    setProjectData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <>
    <form className={props.formStyle} onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-1">
        <InputLabel
          label="Project Name"
          type="text"
          value={projectData.project}
          handleChange={(e) => {
            handleInputChange("project", e.target.value);
          }}
        />
          <InputLabel
            label="Short Description"
            type="text"
            value={projectData.about}
            handleChange={(e) => {
              handleInputChange("about", e.target.value);
            }}
          />
          <InputLabel
            label="duration"
            type="text"
            value={projectData.duration}
            handleChange={(e) => {
              handleInputChange("duration", e.target.value);
            }}
            />
          <InputLabel
            label="description"
            type="text"
            value={projectData.description}
            handleChange={(e) => {
              handleInputChange("description", e.target.value);
            }}
          />
      </div>
    </form>
    </>
  );
};

export default ProjectForm

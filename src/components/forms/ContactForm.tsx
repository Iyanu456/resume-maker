import React, { ChangeEvent, useState, useEffect } from "react";
import InputLabel from "../InputLabel";

interface contactFormProps {
  formStyle: string;
  index: any; // Unique index to identify the form
  contactInfo: {
    label: string;
    src: string;
    name: string;
  };
  onSave: (field: string, index: number, data: any) => void;
}

const ContactForm: React.FC<contactFormProps> = (props) => {
  
  const [contactData, setcontactData] = useState(props.contactInfo);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      props.onSave('contactInfo', props.index, contactData);
    }, 500); // Adjust the timeout duration as needed

    // Clear the timeout on component unmount or when contactData changes
    return () => clearTimeout(timeoutId);
  }, [contactData, props.index, props]);

  const handleInputChange = (field: string, value: string) => {
    setcontactData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <>
    <h1 className="section-title"><b>contact</b></h1>
    <form className={props.formStyle} onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-1">
        
            <InputLabel
          label="Label"
          type="text"
          value={contactData.label}
          handleChange={(e) => {
            handleInputChange("label", e.target.value);
          }}
        />
          <InputLabel
            label="Link"
            type="text"
            value={contactData.src}
            handleChange={(e) => {
              handleInputChange("src", e.target.value);
            }}
          />
          <InputLabel
            label="name"
            type="text"
            value={contactData.name}
            handleChange={(e) => {
              handleInputChange("name", e.target.value);          
        }}
        />
      </div>
    </form>
    </>
  );
};

export default ContactForm

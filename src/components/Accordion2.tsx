import React, { useState, useRef } from 'react';
import './styles/accordion2.css';

interface Accordion2Props {
  onAdd: (field: string, defaultObject: any) => void;
  onDelete: (field: string, index: number) => void;
  defaultObject: any;
  field: string;
  accordionData: { title: string; content: any }[];
  onAccordionClose?: () => void;  // Add the prop
  placeholder?: string;
}

const Accordion2: React.FC<Accordion2Props> = ({
  onAdd,
  onDelete,
  defaultObject,
  field,
  accordionData,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const addNewRef = useRef<HTMLButtonElement>(null); // Create a ref for the "Add New" button

  const handleAccordionClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleAccordionClose = () => {
    setActiveIndex(null);
    //onAccordionClose();  // Call the prop function to reset in the parent component
  };

  const handleAddNewItem = () => {
    onAdd(field, defaultObject);
    setActiveIndex(null);
    // Scroll to the "Add New" button
    if (addNewRef.current) {
      addNewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDeleteItem = (index: number) => {
    onDelete(field, index);
    handleAccordionClick(index);
    //setActiveIndex(null)
    //handleAccordionClose();
  };

  return (
    <div className='bg-white'>
      {accordionData.map((section, index) => (
        <div
          key={index}
          className={`accordion-section2 ${
            activeIndex !== null && activeIndex !== index ? "hidden" : ""
          }`}
        >
          <div
            className={`accordion2-header cursor-pointer flex ${
              activeIndex === index ? "hidden" : ""
            }`}
            onClick={() => handleAccordionClick(index)}
          >
            <p className='accordion2-title'><b>{section.title}</b></p>
            {index !== 0 && (<button
              onClick={() => handleDeleteItem(index)}
              className="accordion-btn mr-0 ml-auto"
            >
              Delete
            </button>)}
          </div>
          {activeIndex === index && (
            <div className="flex flex-col gap-[1em]">
              <div className="">{section.content}</div>
              <div className="btn-grp flex">
                <div className="mr-0 ml-auto flex gap-2">
                  <button
                    onClick={handleAccordionClose}
                    className="accordion-btn"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className={`grid place-items-center mb-[-0.6em] ${
            activeIndex !== null ? "hidden" : ""
          }`}>
        <button
          ref={addNewRef} // Attach the ref to the "Add New" button
          onClick={handleAddNewItem}
          className="flex gap-1 min-w-[40%] btn accordion-btn mx-auto btn-dotted"
        >
          Add New <img src="add.svg" className="h-[20px] w-[20px]" alt="Add" />
        </button>
      </div>
    </div>
  );
};

export default Accordion2;

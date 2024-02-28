import React, { useState } from 'react';
import './accordion2.css'
import { content } from 'html2canvas/dist/types/css/property-descriptors/content';



interface accordion2Props {
  onAdd: (field: string, defaultObject: any) => any;
  defaultObject: any;
  field: string;
  accordionData: {title: string, content: any}[];
}



const Accordion2 = (props: accordion2Props) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index: any) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleAccordionClose = () => {
    setActiveIndex(null);
  };

  const handleAddNewItem = () => {
    props.onAdd(props.field, props.defaultObject);
    setActiveIndex(null);
  };



  return (
    <div className='pt-[0.4em]'>
      {props.accordionData.map((section, index: any) => (
        <div key={index} className={`accordion-section2 ${activeIndex !== null && activeIndex !== index ? 'hidden' : ''}`}>
          <div
            className={`accordion2-header cursor-pointer ${activeIndex === index ? 'hidden' : ''}`}
            onClick={() => handleAccordionClick(index)}
          >
            {section.title}
          </div>
          {activeIndex === index && (
            <div className='flex flex-col gap-[1em]'>
              <div className="">{section.content}</div>
              <div className="btn-grp flex">
              <button onClick={handleAccordionClose} className='accordion-btn '>Close</button>
                <div className='mr-0 ml-auto flex gap-2'>
                <button onClick={handleAccordionClose} className='accordion-btn '>Save</button>
                
                </div>
                </div>
              
            </div>
          )}
        </div>
      ))}
      <div className='grid place-items-center mb-[-0.6em]'>
        <button onClick={handleAddNewItem} className='min-w-[40%] btn accordion-btn mx-auto btn-dotted'>Add New</button>
      </div>
    </div>
  );
};

export default Accordion2;


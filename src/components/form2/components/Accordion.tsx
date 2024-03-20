import React, { useState } from 'react';
import './accordion.css';
import Icon from './Icon';

interface AccordionProps {
  accordionData: { title: string, content: any }[];
  onAccordionClose: () => void;  // Add the prop
}

const Accordion: React.FC<AccordionProps> = (props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const customStyle = {
    borderRadius: '0.8em 0.8em 0 0',
    borderBottom: '0',
    paddingBottom: '0.5em',
  };

  const handleAccordionClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleAccordionClose = () => {
    //setActiveIndex(null);
    //props.onAccordionClose();  // Call the prop function to reset in the parent component
  };

  return (
    <div className='w-[97%]'>
      {props.accordionData.map((section, index) => (
        <div key={index} className="accordion-section">
          <div
            className={`flex accordion-header ${activeIndex === index ? 'active' : ''}`}
            style={activeIndex === index ? customStyle : {}}
            onClick={() => handleAccordionClick(index)}
            //onClick={props.onClick}
          >
            <Icon src="edit-2.svg" className="mr-3" />
            <h1 className="section-title"><b>{section.title}</b></h1>
            <Icon className={`ml-auto mr-0 pr-2 hidden md:block`} src={`${activeIndex === index ? 'arrow-down-1.svg' : 'arrow-right-3.svg'}`} height='20px' width='20px' />
          </div>
          {activeIndex === index && (
            <div className="accordion-content">{section.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
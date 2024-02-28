import React, { Component, useState } from 'react';
import './accordion.css'

interface accordionProps {
    accordionData: {title: string, content: any}[];
    
}

const Accordion = (props: accordionProps) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const customStyle = {
    borderRadius: '0.8em 0.8em 0 0',
    borderBottom: '0',
    paddingBottom: '0.5em',
  
  }

  const handleAccordionClick = (index: any) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  /*const accordionData = [
    { title: 'Section 1', content: 'Content for Section 1' },
    { title: 'Section 2', content: 'Content for Section 2' },
    { title: 'Section 3', content: 'Content for Section 3' },
  ];*/

  return (
    <div className='w-[97%]'>
      {props.accordionData.map((section, index) => (
        <div key={index} className="accordion-section">
          <div
            className={`accordion-header ${activeIndex === index ? 'active' : ''}`}
            style={activeIndex === index ? customStyle : {}}
            onClick={() => handleAccordionClick(index)}
          >
            <h1 className="section-title"><b>{section.title}</b></h1>
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

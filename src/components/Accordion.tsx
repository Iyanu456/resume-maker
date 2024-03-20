import React, { useState, useRef, useEffect } from 'react';
import './styles/accordion.css';
import Icon from '../Icon';

interface AccordionProps {
  accordionData: { title: string, content: any }[];
  onAccordionClose?: () => void;  // Add the prop
}

const Accordion: React.FC<AccordionProps> = (props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const selectedRef = useRef<HTMLDivElement>(null); // Create a ref for the selected item

  const customStyle = {
    borderRadius: '0.8em 0.8em 0 0',
    borderBottom: '0',
    paddingBottom: '0.5em',
  };

  const handleAccordionClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleAccordionClose = () => {
    setActiveIndex(null);
    //onAccordionClose();  // Call the prop function to reset in the parent component
  };

  useEffect(() => {
    // Scroll to the selected item when it becomes active
    if (activeIndex !== null && selectedRef.current) {
      const windowHeight = window.innerHeight;
      const selectedOffsetTop = selectedRef.current.offsetTop;
      const selectedHeight = selectedRef.current.offsetHeight;
      const scrollTo = selectedOffsetTop - (windowHeight - selectedHeight) / 2;
      window.scrollTo({ top: scrollTo, behavior: 'smooth' });
    }
  }, [activeIndex]);

  return (
    <div className='w-[97%] pb-[7em]'>
      {props.accordionData.map((section, index) => (
        <div key={index} className={`accordion-section ${
          activeIndex !== null && activeIndex !== index ? "hidden" : ""
        }`} >
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
            <div className="accordion-content" ref={selectedRef}>{section.content}</div>
          )}
         
        </div>
      ))}
    </div>
  );
};

export default Accordion;

import React, { useState, useRef, useEffect } from 'react';
import './styles/accordion.css';
import Icon from '../Icon';

interface AccordionProps {
  accordionData: { title: string; content: any }[];
  onAccordionClose?: () => void;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>; // Update the type
  activeIndex: number | null;
  accordion2ActiveIndex: number | null;
}

const Accordion: React.FC<AccordionProps> = (props) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const selectedRef = useRef<HTMLDivElement>(null); // Create a ref for the selected item

  const handleAccordionClick = (index: number) => {
    props.setActiveIndex((prevIndex) => (prevIndex === index ? null : index)); // Call prop function to update active index
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    // Initial check on mount
    handleResize();

    // Add event listener to handle resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='w-full md:w-[97%] pb-[7em]'>
      {props.accordionData.map((section, index) => (
        <div key={index} className={`accordion-section ${isLargeScreen === true ? (props.activeIndex !== null && props.activeIndex !== index ? 'hidden' : '') : ''}`}>
          <div
            className={`flex accordion-header ${props.activeIndex === index ? 'active custom-style' : ''}`}
            onClick={() => handleAccordionClick(index)}
          >
            <Icon src='edit-2.svg' className='hidden md:block' />
            <h1 className='section-title font-black font-bold max-[940px]:text-[0.97em] pl-1'>{section.title}</h1>
            <Icon className={`ml-auto mr-0 pr-2 md:block`} src={`${props.activeIndex === index ? 'arrow-down-1.svg' : 'arrow-right-3.svg'}`} height='20px' width='20px' />
          </div>
          {props.activeIndex === index && (
            <div className='accordion-content' ref={selectedRef}>{section.content}</div>
          )}
        </div>
      ))}
      <div className={`hidden mt-[1em] md:grid `}>
        <button className={`${props.activeIndex === null || props.accordion2ActiveIndex !== null  ? "hidden" : ""} ml-auto mr-4 md:mr-0 btn-primary px-[1.5em] flex gap-1`} onClick={() => props.setActiveIndex(null)}>
          <Icon src='/arrow-left.svg' /> 
          <p>Back</p>
    </button>
    </div>
    </div>
  );
};

export default Accordion;

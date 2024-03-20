import React, { useState, useRef, useEffect } from 'react';
import './styles/accordion.css';
import Icon from '../Icon';

interface AccordionProps {
  accordionData: { title: string, content: any }[];
  onAccordionClose?: () => void;  // Add the prop
}

const Accordion: React.FC<AccordionProps> = (props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const selectedRef = useRef<HTMLDivElement>(null); // Create a ref for the selected item

  const handleAccordionClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  //const handleAccordionClose = () => {
    //setActiveIndex(null);
    //onAccordionClose();  // Call the prop function to reset in the parent component
  //};

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
        <div key={index} className={`accordion-section ${ isLargeScreen === true ?
          (activeIndex !== null && activeIndex !== index ? "hidden" : "") : ""
        }`} >
          <div
            className={`flex accordion-header ${activeIndex === index ? 'active custom-style' : ''}`}
            //style={activeIndex === index ? customStyle : {}}
            onClick={() => handleAccordionClick(index)}
            //onClick={props.onClick}
          >
            <Icon src="edit-2.svg" className="mr-3" />
            <h1 className="section-title font-black">{section.title}</h1>
            <Icon className={`ml-auto mr-0 pr-2 md:block`} src={`${activeIndex === index ? 'arrow-down-1.svg' : 'arrow-right-3.svg'}`} height='20px' width='20px' />
          </div>
          {activeIndex === index && (
            <div className="accordion-content" ref={selectedRef}>{section.content}</div>
          )}
         
        </div>
      ))}
      <div className={`mt-[1em] grid ${activeIndex === null || isLargeScreen === false ? 'hidden' : ''}`}>
      <button className='ml-auto mr-4 md:mr-0 btn-primary px-[1.5em] flex gap-1'  onClick={() => setActiveIndex(null)}>
        <Icon src='/arrow-left.svg' /> 
        <p>Back</p>
      </button>
        
      </div>
      
    </div>
  );
};

export default Accordion;

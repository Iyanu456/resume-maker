import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import Icon from '../../Icon';
import './textarea.css';

interface TextAreaProps {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  placeholder?: string;
}

export default function TextArea(props: TextAreaProps): JSX.Element {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState<string>("");
  const [enableBulletPoint, setEnableBulletPoint] = useState<boolean>(true);
  const maxHeight = 300; // Maximum height in pixels

  const resizeTextArea = () => {
    if (!textAreaRef.current) {
      return;
    }
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, maxHeight)}px`;
    textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight - textAreaRef.current.clientHeight;
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (enableBulletPoint) {
        setValue((prevValue) => prevValue + "\n• ");
      } else {
        setValue((prevValue) => prevValue + "\n");
      }
      resizeTextArea();
      // Manually trigger a resize after appending the bullet point
      setTimeout(resizeTextArea, 0); // You can adjust the delay if needed
    }
  };

  useEffect(() => {
    resizeTextArea();
    window.addEventListener("resize", resizeTextArea);
    return () => {
      window.removeEventListener("resize", resizeTextArea);
    };
  }, []);

  const handleToggleBulletPoint = () => {
    setEnableBulletPoint((prev) => !prev);
  };

  return (
    <div className="App pt-2">
      <p className="form-label text-xs">{props.label}</p>
      <div className='toolbar border-[1.3px] my-2 py-[0.5em] px-3 flex gap-1 center-align rounded-md'>
        <button onClick={handleToggleBulletPoint} className='tool grid border p-[0.12em]'
        style={{backgroundColor: `${enableBulletPoint ? "#f7f7f7" : 'white'}`}}
        >
          <Icon src='/format-bullet.svg' className='m-auto' height='20px' width='20px' />
        </button>
      </div>
      <textarea
        placeholder={props.placeholder}
        className="textarea rounded-md"
        value={value}
        ref={textAreaRef}
        onChange={(e) => {
          setValue(e.target.value);
          resizeTextArea();
          props.onChange(e);
        }}
        onKeyPress={handleKeyPress}
        style={{ maxHeight: `${maxHeight}px`, overflowY: 'scroll' }} // Ensure scrollbar always visible
      ></textarea>
    </div>
  );
}

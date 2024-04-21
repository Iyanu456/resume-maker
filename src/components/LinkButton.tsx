import React, { useState } from 'react';


interface linkButtonProps {
    buttonStyle?: string;
    inputStyle?: string;
    value?: string;
    handleChange?: (e: any) => any;
}
export default function LinkButton (props: linkButtonProps){
  const [showInput, setShowInput] = useState<boolean>(false);
  //const [linkUrl, setLinkUrl] = useState<string>('');

  const toggleInput = () => {
    setShowInput((prevShowInput) => !prevShowInput);
  };



  const handleLinkSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can handle the link submission here, such as updating state or performing other actions
    props.handleChange
    //console.log('Link submitted:', linkUrl);
    // Reset the input and hide it after submission
    //setLinkUrl('');
    setShowInput(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleLinkSubmit(e as any);
    }
};

  return (
    <div className="grid h-[100%]mb-0">
      <button
        className={`${props.buttonStyle} items-center justify-center border-[1.8px] rounded`}
        onClick={toggleInput}
      >
        <img src="link-1.svg" alt="Link Icon" className="max-w-[19px]" />
      </button>
      {showInput && (
        <form
          onSubmit={handleLinkSubmit}
          className={`absolute ${props.inputStyle} p-1 bg-white rounded shadow`}
        >
          <input
            type="text"
            placeholder="Enter URL"
            value={props.value}
            onChange={props.handleChange}
            onKeyPress={handleKeyPress}
            className="w-full px-2 py-1 border border-gray-300 rounded"
          />
          {/*<button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Submit
      </button>*/}
        </form>
      )}
    </div>
  );
};


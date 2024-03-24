import { useEffect, useRef, useState} from 'react'
import './textarea.css'

const convertToHTML = (value) => {
    const lines = value.split("\n");
    let html = "";
    let inList = false;
    lines.forEach((line, index) => {
      if (line.trim().startsWith("•")) {
        // Line starts with a bullet point
        if (!inList) {
          html += "<ul>";
          inList = true;
        }
        html += `<li>${line.trim().substring(1)}</li>`;
      } else {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        html += `<p>${line}</p>`;
      }
    });
    if (inList) {
      html += "</ul>";
    }
    return html;
  };
  

export default function TextArea(props) {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [value, setValue] = useState("");
    const [enableBulletPoint, setEnableBulletPoint] = useState(false);
  
    const resizeTextArea = () => {
      if (!textAreaRef.current) {
        return;
      }
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    };
  
    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
  
    const handleGenerateHtml = () => {
      const html = convertToHTML(value);
      console.log(html); // Display the generated HTML in console
    };
  
    return (
      <div className="App">
        <textarea
          className="textarea"
          value={value}
          ref={textAreaRef}
          onChange={(e) => {
            setValue(e.target.value);
            resizeTextArea();
            props.onChange(e);
          }}
          onKeyPress={handleKeyPress}
        ></textarea>
        <button onClick={handleToggleBulletPoint}>
          {enableBulletPoint ? "Disable Bullet Point" : "Enable Bullet Point"}
        </button>
        <button onClick={handleGenerateHtml}>Generate HTML</button>
      </div>
    );
  }
  
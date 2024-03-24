export const convertToHTML = (value: string) => {
    const lines = value.split("\n");
    let html = "";
    let inList = false;
    lines.forEach((line) => {
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
/**
 * Utility function to syntax highlight terminal content
 */
export const highlightJSON = (jsonString) => {
  let highlighted = jsonString;
  
  // Replace keys
  highlighted = highlighted.replace(/"([^"]+)":/g, '<span class="key">"$1"</span>:');
  
  // Replace strings (values)
  highlighted = highlighted.replace(/: "([^"]+)"/g, ': <span class="string">"$1"</span>');
  
  // Replace arrays of strings
  highlighted = highlighted.replace(/"([^"]+)"/g, '<span class="string">"$1"</span>');
  
  // Replace punctuation
  highlighted = highlighted.replace(/[[\]{}:,]/g, '<span class="punctuation">$&</span>');
  
  return highlighted;
};

export const trackMousePosition = (event, element) => {
  if (!element) return;
  
  const rect = element.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  
  element.style.setProperty('--mouse-x', `${x}%`);
  element.style.setProperty('--mouse-y', `${y}%`);
};

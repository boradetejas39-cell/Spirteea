import React from 'react';
import { domToReact } from 'html-react-parser';

// Utility to convert style string to object
const styleToObject = (styleString) => {
  if (!styleString) return {};
  return styleString.split(';').reduce((acc, style) => {
    const [key, value] = style.split(':').map((s) => s.trim());
    if (key && value) {
      // Convert kebab-case to camelCase
      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      // Normalize paths starting with ../assets/ to /assets/
      const normalizedValue = value.replace(/url\(['"]?\.\.\/assets\//, "url('/assets/").replace(/url\(['"]?assets\//, "url('/assets/");
      acc[camelKey] = normalizedValue;
    }
    return acc;
  }, {});
};

export const getParserOptions = (setIsMenuOpen, isMenuOpen, extraOptions = {}) => {
  const options = {
    replace: (domNode) => {
      // React expects className, not class
      if (domNode.attribs && domNode.attribs.class !== undefined) {
        domNode.attribs.className = domNode.attribs.class;
        delete domNode.attribs.class;
      }

      // Check for extra placeholders first
      if (extraOptions.replace) {
        const result = extraOptions.replace(domNode);
        if (result) return result;
      }

      // Handle Hamburger Button
      if (domNode.attribs && domNode.attribs.class && domNode.attribs.class.includes('offcanvas-open-btn')) {
        const originalStyle = styleToObject(domNode.attribs.style);
        return (
          <div 
            {...domNode.attribs} 
            onClick={() => setIsMenuOpen(true)} 
            style={{ ...originalStyle, cursor: 'pointer', color: 'white' }}
          >
            {domToReact(domNode.children, options)}
          </div>
        );
      }

      // Handle Sidebar
      if (domNode.attribs && domNode.attribs.class && domNode.attribs.class.includes('sidebar')) {
        const currentClass = domNode.attribs.class;
        const originalStyle = styleToObject(domNode.attribs.style);
        return (
          <div 
            {...domNode.attribs} 
            className={`${currentClass} ${isMenuOpen ? 'open' : ''}`}
            style={originalStyle}
          >
            {domToReact(domNode.children, options)}
          </div>
        );
      }

      // Handle Close Button in Sidebar
      if (domNode.attribs && domNode.attribs.class && domNode.attribs.class.includes('close-btn')) {
        return (
          <button 
            {...domNode.attribs} 
            onClick={() => setIsMenuOpen(false)}
          >
            {domToReact(domNode.children, options)}
          </button>
        );
      }
    }
  };
  return options;
};

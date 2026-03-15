import React from 'react';
import { domToReact } from 'html-react-parser';
import { useMenu } from '../context/MenuContext';

// Utility to convert style string to object
const styleToObject = (styleString) => {
  if (!styleString) return {};
  return styleString.split(';').reduce((acc, style) => {
    const [key, value] = style.split(':').map((s) => s.trim());
    if (key && value) {
      // Convert kebab-case to camelCase
      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      // Normalize paths
      const normalizedValue = value.replace(/url\(['"]?\.\.\/assets\//, "url('/assets/").replace(/url\(['"]?assets\//, "url('/assets/");
      acc[camelKey] = normalizedValue;
    }
    return acc;
  }, {});
};

export const useParserOptions = (extraOptions = {}) => {
  const { isMenuOpen, setIsMenuOpen } = useMenu();

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
      if (domNode.attribs && domNode.attribs.className && domNode.attribs.className.includes('offcanvas-open-btn')) {
        const originalStyle = styleToObject(domNode.attribs.style);
        return (
          <div 
            {...domNode.attribs} 
            onClick={() => setIsMenuOpen(true)} 
            style={{ ...originalStyle, cursor: 'pointer' }}
          >
            {domToReact(domNode.children, options)}
          </div>
        );
      }

      // Handle Sidebar
      if (domNode.attribs && domNode.attribs.className && domNode.attribs.className.includes('sidebar')) {
        const currentClass = domNode.attribs.className;
        const originalStyle = styleToObject(domNode.attribs.style);
        return (
          <>
            <div 
              className={`sidebar-overlay ${isMenuOpen ? 'visible' : ''}`} 
              onClick={() => setIsMenuOpen(false)}
            />
            <div 
              {...domNode.attribs} 
              className={`${currentClass} ${isMenuOpen ? 'open' : ''}`}
              style={originalStyle}
            >
              {domToReact(domNode.children, options)}
            </div>
          </>
        );
      }

      // Handle Sidebar List Items (add staggered animation delay)
      const isInsideSidebar = (node) => {
        let current = node;
        while (current) {
          if (current.attribs && current.attribs.className && current.attribs.className.includes('sidebar')) {
            return true;
          }
          current = current.parent;
        }
        return false;
      };

      if (domNode.name === 'li' && isInsideSidebar(domNode)) {
        const listItems = domNode.parent.children.filter(child => child.name === 'li');
        const index = listItems.indexOf(domNode);
        const originalStyle = styleToObject(domNode.attribs.style);
        return (
          <li {...domNode.attribs} style={{ ...originalStyle, '--delay': index }}>
            {domToReact(domNode.children, options)}
          </li>
        );
      }


      // Handle Close Button in Sidebar
      if (domNode.attribs && domNode.attribs.className && domNode.attribs.className.includes('close-btn')) {
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

// Keep getParserOptions for backward compatibility if needed, but it should be replaced
export const getParserOptions = (setIsMenuOpen, isMenuOpen, extraOptions = {}) => {
  // This is now a wrapper that might not work as expected if called as a normal function 
  // because useMenu is a hook. But since we are refactoring, we should update callers.
  return null; 
};


"use client";
import { useState, useEffect, useRef } from 'react';

export const useNavbarPeek = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPeeking, setIsPeeking] = useState(true); // Always show peek
  const [isMouseOverNavbar, setIsMouseOverNavbar] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  // Clear any existing timeout
  const clearHideTimeout = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  // Set timeout to hide navbar
  const setHideTimeout = (delay: number = 2000) => {
    clearHideTimeout();
    hideTimeoutRef.current = setTimeout(() => {
      // Only hide if mouse is not over navbar
      if (!isMouseOverNavbar) {
        setIsExpanded(false);
      }
      // If mouse is over navbar, do nothing - let user interaction handle it
    }, delay);
  };

  // Show navbar expanded
  const showNavbar = () => {
    clearHideTimeout();
    setIsExpanded(true);
  };

  // Hide navbar (back to peek state)
  const hideNavbar = () => {
    setIsExpanded(false);
  };

  useEffect(() => {
    // Mouse hover detection on the navbar itself
    const handleMouseEnter = () => {
      setIsMouseOverNavbar(true);
      clearHideTimeout(); // Cancel any pending hide
      showNavbar();
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse is still within navbar or its children (including dropdowns)
      const navbar = navbarRef.current;
      if (navbar && e.relatedTarget) {
        const relatedElement = e.relatedTarget as Element;
        
        // If mouse moved to a child element or dropdown, don't hide
        if (navbar.contains(relatedElement)) {
          return;
        }
      }
      
      setIsMouseOverNavbar(false);
      setHideTimeout(1500); // Hide after 1.5 seconds
    };

    // Click detection on the navbar
    const handleClick = () => {
      showNavbar();
      setHideTimeout(3000); // Stay visible longer after click
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // ArrowDown shows navbar for navigation
      if (e.key === 'ArrowDown') {
        showNavbar();
        setHideTimeout(1500);
        return;
      }
      
      // Tab shows navbar for navigation
      if (e.key === 'Tab') {
        showNavbar();
        setHideTimeout(1500);
        return;
      }
      
      // Escape hides navbar
      if (e.key === 'Escape') {
        hideNavbar();
        return;
      }
    };

    // Touch events for mobile - improved gesture detection
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartY = touch.clientY;
      touchStartTime = Date.now();
      
      // If touch starts near the top (peek area), show navbar
      if (touchStartY <= 80) {
        showNavbar();
        setHideTimeout(1500); // Hide after 1.5 seconds like other interactions
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const currentY = touch.clientY;
      const deltaY = currentY - touchStartY;
      const deltaTime = Date.now() - touchStartTime;
      
      // Pull down gesture detection - must be a deliberate downward swipe
      if (deltaY > 30 && deltaTime < 500 && touchStartY <= 100) {
        showNavbar();
        setHideTimeout(1500); // Consistent timing
      }
    };

    // Global mouse move tracking to detect if mouse is over navbar area
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const navbar = navbarRef.current;
      if (navbar) {
        const rect = navbar.getBoundingClientRect();
        // Add some padding to the detection area to be more forgiving
        const padding = 10;
        const isOverNavbar = 
          e.clientX >= (rect.left - padding) && 
          e.clientX <= (rect.right + padding) && 
          e.clientY >= (rect.top - padding) && 
          e.clientY <= (rect.bottom + padding);
        
        // Also check if mouse is over any dropdown or child element
        const targetElement = e.target as Element;
        const isOverNavbarOrChildren = isOverNavbar || 
          (targetElement && (navbar.contains(targetElement) || targetElement.closest('[role="menu"]')));
        
        if (isOverNavbarOrChildren !== isMouseOverNavbar) {
          setIsMouseOverNavbar(!!isOverNavbarOrChildren);
          
          if (isOverNavbarOrChildren) {
            clearHideTimeout();
            showNavbar();
          }
        }
      }
    };

    // Add event listeners to the navbar element
    const navbar = navbarRef.current;
    if (navbar) {
      navbar.addEventListener('mouseenter', handleMouseEnter);
      navbar.addEventListener('mouseleave', handleMouseLeave);
      navbar.addEventListener('click', handleClick);
      navbar.addEventListener('touchstart', handleTouchStart);
      navbar.addEventListener('touchmove', handleTouchMove);
    }
    
    // Global mouse tracking
    document.addEventListener('mousemove', handleGlobalMouseMove);

    // Global keyboard events
    document.addEventListener('keydown', handleKeyDown);
    
    // Global touch events for pull-down gesture
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Focus events to show navbar
    const handleFocus = () => {
      showNavbar();
      setHideTimeout(1500); // Consistent timing
    };

    window.addEventListener('focus', handleFocus);

    // Cleanup function
    return () => {
      clearHideTimeout();
      
      if (navbar) {
        navbar.removeEventListener('mouseenter', handleMouseEnter);
        navbar.removeEventListener('mouseleave', handleMouseLeave);
        navbar.removeEventListener('click', handleClick);
        navbar.removeEventListener('touchstart', handleTouchStart);
        navbar.removeEventListener('touchmove', handleTouchMove);
      }
      
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isExpanded, isMouseOverNavbar]);

  // Auto-hide after initial load and when no interaction
  useEffect(() => {
    // Show expanded initially, then hide after 2 seconds
    setIsExpanded(true);
    setHideTimeout(2000);
  }, []);
  
  // Auto-hide behavior: if no interaction for 2 seconds, hide navbar
  useEffect(() => {
    if (isExpanded && !isMouseOverNavbar) {
      // Only auto-hide if mouse is NOT over navbar
      const autoHideTimer = setTimeout(() => {
        if (isExpanded && !hideTimeoutRef.current && !isMouseOverNavbar) {
          setIsExpanded(false);
        }
      }, 2000);
      
      return () => clearTimeout(autoHideTimer);
    }
  }, [isExpanded, isMouseOverNavbar]);

  return {
    isExpanded,
    isPeeking,
    navbarRef,
    showNavbar,
    hideNavbar,
    // Helper methods
    toggleNavbar: () => isExpanded ? hideNavbar() : showNavbar(),
    setNavbarRef: (ref: HTMLDivElement | null) => {
      navbarRef.current = ref;
    }
  };
};

// Liquid Glass Cursor Effect
// Modified from Shu Ding's liquid-glass for cursor use

(function() {
  'use strict';
  
  // Check if liquid glass cursor already exists and destroy it
  if (window.liquidGlassCursor) {
    window.liquidGlassCursor.destroy();
    console.log('Previous liquid glass cursor removed.');
  }
  
  // Check and destroy original liquid glass effect
  if (window.liquidGlass) {
    window.liquidGlass.destroy();
    console.log('Original liquid glass effect removed.');
  }
  
  // Remove any existing cursor styles
  const existingStyles = document.querySelectorAll('#liquid-glass-cursor-style');
  existingStyles.forEach(style => style.remove());
  
  // Remove any existing glass elements
  const existingGlass = document.querySelectorAll('[id*="liquid-glass"], [class*="liquid-glass"]');
  existingGlass.forEach(element => element.remove());
  
  // Remove any SVG filters that might be from previous glass effects
  const existingSVGs = document.querySelectorAll('svg[width="0"][height="0"]');
  existingSVGs.forEach(svg => {
    if (svg.querySelector('filter[id*="liquid"]') || svg.querySelector('filter[id*="glass"]')) {
      svg.remove();
    }
  });
  
  // Utility functions
  function smoothStep(a, b, t) {
    t = Math.max(0, Math.min(1, (t - a) / (b - a)));
    return t * t * (3 - 2 * t);
  }

  function length(x, y) {
    return Math.sqrt(x * x + y * y);
  }

  function roundedRectSDF(x, y, width, height, radius) {
    const qx = Math.abs(x) - width + radius;
    const qy = Math.abs(y) - height + radius;
    return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius;
  }

  function texture(x, y) {
    return { type: 't', x, y };
  }

  // Generate unique ID
  function generateId() {
    return 'liquid-glass-cursor-' + Math.random().toString(36).substr(2, 9);
  }

  // Main Cursor Shader class
  class LiquidGlassCursor {
    constructor(options = {}) {
      this.width = options.width || 50;
      this.height = options.height || 50;
      this.fragment = options.fragment || ((uv) => texture(uv.x, uv.y));
      this.canvasDPI = 1;
      this.id = generateId();
      
      this.mouse = { x: 0, y: 0 };
      this.mouseUsed = false;
      this.isVisible = true;
      this.isHovering = false;
      
      this.createElement();
      this.setupEventListeners();
      this.updateShader();
      this.hideCursor();
    }

    hideCursor() {
      // Hide default cursor globally with maximum specificity
      const style = document.createElement('style');
      style.id = 'liquid-glass-cursor-style';
      style.textContent = `
        html, html *, html *::before, html *::after {
          cursor: none !important;
        }
        body, body *, body *::before, body *::after {
          cursor: none !important;
        }
        div, div *, div *::before, div *::after {
          cursor: none !important;
        }
        a, a *, button, button *, input, textarea, select {
          cursor: none !important;
        }
        [role="button"], [onclick], [tabindex] {
          cursor: none !important;
        }
        .grid-item, .grid-item * {
          cursor: none !important;
        }
        #root, #root * {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);
      this.cursorStyle = style;
      
      // Also directly set on body as backup
      document.documentElement.style.cursor = 'none';
      document.body.style.cursor = 'none';
    }

    createElement() {
      // Create container
      this.container = document.createElement('div');
      this.container.id = `${this.id}_container`;
      this.container.style.cssText = `
        position: fixed;
        width: ${this.width}px;
        height: ${this.height}px;
        overflow: hidden;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 
          0 2px 8px rgba(0, 0, 0, 0.1), 
          0 -2px 8px inset rgba(255, 255, 255, 0.2);
        backdrop-filter: url(#${this.id}_filter) blur(0.5px) contrast(1.1) brightness(1.1) saturate(1.1);
        z-index: 99999;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: opacity 0.2s ease;
      `;

      // Create SVG filter
      this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      this.svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      this.svg.setAttribute('width', '0');
      this.svg.setAttribute('height', '0');
      this.svg.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 99998;
      `;

      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filter.setAttribute('id', `${this.id}_filter`);
      filter.setAttribute('filterUnits', 'userSpaceOnUse');
      filter.setAttribute('colorInterpolationFilters', 'sRGB');
      filter.setAttribute('x', '0');
      filter.setAttribute('y', '0');
      filter.setAttribute('width', this.width.toString());
      filter.setAttribute('height', this.height.toString());

      this.feImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
      this.feImage.setAttribute('id', `${this.id}_map`);
      this.feImage.setAttribute('width', this.width.toString());
      this.feImage.setAttribute('height', this.height.toString());

      this.feDisplacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
      this.feDisplacementMap.setAttribute('in', 'SourceGraphic');
      this.feDisplacementMap.setAttribute('in2', `${this.id}_map`);
      this.feDisplacementMap.setAttribute('xChannelSelector', 'R');
      this.feDisplacementMap.setAttribute('yChannelSelector', 'G');

      filter.appendChild(this.feImage);
      filter.appendChild(this.feDisplacementMap);
      defs.appendChild(filter);
      this.svg.appendChild(defs);

      // Create canvas for displacement map (hidden)
      this.canvas = document.createElement('canvas');
      this.canvas.width = this.width * this.canvasDPI;
      this.canvas.height = this.height * this.canvasDPI;
      this.canvas.style.display = 'none';

      this.context = this.canvas.getContext('2d');
    }

    setupEventListeners() {
      // Follow mouse movement
      document.addEventListener('mousemove', (e) => {
        this.container.style.left = e.clientX + 'px';
        this.container.style.top = e.clientY + 'px';
        
        // Update relative mouse position for shader
        this.mouse.x = 0.5; // Center since cursor follows mouse
        this.mouse.y = 0.5;
        
        if (this.mouseUsed) {
          this.updateShader();
        }
        
        // Show cursor if hidden
        if (!this.isVisible) {
          this.show();
        }
      });

      // Hide cursor when mouse leaves window
      document.addEventListener('mouseleave', () => {
        this.hide();
      });

      // Show cursor when mouse enters window
      document.addEventListener('mouseenter', () => {
        this.show();
      });

      // Add hover effects for interactive elements with Framer Motion Spring
      this.setupHoverDetection();
    }

    setupHoverDetection() {
      // Create Framer Motion-like spring animation manually
      let currentScale = 1;
      let targetScale = 1;
      let velocity = 0;
      
      const springConfig = {
        stiffness: 120,
        damping: 15,
        mass: 1.2
      };

      const animate = () => {
        const force = -springConfig.stiffness * (currentScale - targetScale);
        const damping = -springConfig.damping * velocity;
        const acceleration = (force + damping) / springConfig.mass;
        
        velocity += acceleration * 0.016; // 60fps
        currentScale += velocity * 0.016;
        
        this.container.style.transform = `translate(-50%, -50%) scale(${currentScale})`;
        
        if (Math.abs(currentScale - targetScale) > 0.001 || Math.abs(velocity) > 0.001) {
          requestAnimationFrame(animate);
        }
      };

      // Enhanced hover detection
      document.addEventListener('mouseover', (e) => {
        const element = e.target;
        
        // Check for interactive elements including grid items
        if (element.matches('a, button, input, textarea, select, [role="button"], [onclick]') ||
            element.classList.contains('grid-item') ||
            element.closest('.grid-item') ||
            element.closest('.dock-item') ||
            element.classList.contains('dock-item')) {
          
          if (!this.isHovering) {
            this.isHovering = true;
            targetScale = 1.3;
            animate();
          }
        }
      });

      document.addEventListener('mouseout', (e) => {
        const element = e.target;
        const relatedTarget = e.relatedTarget;
        
        // Check if we're leaving an interactive element
        if (element.matches('a, button, input, textarea, select, [role="button"], [onclick]') ||
            element.classList.contains('grid-item') ||
            element.closest('.grid-item') ||
            element.closest('.dock-item') ||
            element.classList.contains('dock-item')) {
          
          // Only shrink if we're not moving to another interactive element
          if (!relatedTarget || 
              (!relatedTarget.matches('a, button, input, textarea, select, [role="button"], [onclick]') &&
               !relatedTarget.classList.contains('grid-item') &&
               !relatedTarget.closest('.grid-item') &&
               !relatedTarget.closest('.dock-item') &&
               !relatedTarget.classList.contains('dock-item'))) {
            
            this.isHovering = false;
            targetScale = 1;
            animate();
          }
        }
      });
    }

    show() {
      this.isVisible = true;
      this.container.style.opacity = '1';
    }

    hide() {
      this.isVisible = false;
      this.container.style.opacity = '0';
    }

    updateShader() {
      const mouseProxy = new Proxy(this.mouse, {
        get: (target, prop) => {
          this.mouseUsed = true;
          return target[prop];
        }
      });

      this.mouseUsed = false;

      const w = this.width * this.canvasDPI;
      const h = this.height * this.canvasDPI;
      const data = new Uint8ClampedArray(w * h * 4);

      let maxScale = 0;
      const rawValues = [];

      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % w;
        const y = Math.floor(i / 4 / w);
        const pos = this.fragment(
          { x: x / w, y: y / h },
          mouseProxy
        );
        const dx = pos.x * w - x;
        const dy = pos.y * h - y;
        maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
        rawValues.push(dx, dy);
      }

      maxScale *= 0.5;

      let index = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = rawValues[index++] / maxScale + 0.5;
        const g = rawValues[index++] / maxScale + 0.5;
        data[i] = r * 255;
        data[i + 1] = g * 255;
        data[i + 2] = 0;
        data[i + 3] = 255;
      }

      this.context.putImageData(new ImageData(data, w, h), 0, 0);
      this.feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.canvas.toDataURL());
      this.feDisplacementMap.setAttribute('scale', (maxScale / this.canvasDPI * 0.8).toString());
    }

    appendTo(parent) {
      parent.appendChild(this.svg);
      parent.appendChild(this.container);
    }

    destroy() {
      // Restore default cursor
      if (this.cursorStyle) {
        this.cursorStyle.remove();
      }
      
      // Reset cursor styles
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
      
      this.svg.remove();
      this.container.remove();
      this.canvas.remove();
      
      window.liquidGlassCursor = null;
    }
  }

  // Create the liquid glass cursor
  function createLiquidGlassCursor() {
    const cursor = new LiquidGlassCursor({
      width: 50,
      height: 50,
      fragment: (uv, mouse) => {
        const ix = uv.x - 0.5;
        const iy = uv.y - 0.5;
        // Create circular SDF for perfect circle
        const distance = length(ix, iy);
        const displacement = smoothStep(0.5, 0, distance - 0.2);
        const scaled = smoothStep(0, 1, displacement);
        return texture(ix * scaled + 0.5, iy * scaled + 0.5);
      }
    });

    // Add to page
    cursor.appendTo(document.body);

    console.log('Liquid Glass Cursor effect created!');
    
    // Return cursor instance so it can be removed if needed
    window.liquidGlassCursor = cursor;
    
    // Periodically check and remove any other glass effects (but preserve navigation)
    setInterval(() => {
      // Remove any glass elements that might appear, but skip navigation elements
      const unwantedGlass = document.querySelectorAll('div[style*="backdrop-filter"]:not([id*="liquid-glass-cursor"])');
      unwantedGlass.forEach(element => {
        // Skip bottom navigation and legitimate UI elements
        if (element !== cursor.container && 
            element.style.position === 'fixed' && 
            element.style.borderRadius && 
            element.style.backdropFilter &&
            !element.classList.contains('dock-wrapper') &&
            !element.classList.contains('dock-container') &&
            !element.closest('.dock-container') &&
            !element.closest('.dock-wrapper')) {
          element.remove();
          console.log('Removed unwanted glass element');
        }
      });
    }, 1000);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(createLiquidGlassCursor, 100); // Small delay to ensure all styles are loaded
    });
  } else {
    setTimeout(createLiquidGlassCursor, 100);
  }
})();
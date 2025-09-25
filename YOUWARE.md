# MAJ the Author Website - Project Guidelines

## Project Overview
A modern author portfolio website showcasing MAJ the Author's (Myara A. Jefferson) literary work with sophisticated design principles and professional presentation. Features her contemporary romance novel "Anticipation: Love Me, Lust Me, But Don't Lose Me" and tells the authentic story of her journey from personal struggle to literary empowerment through the "Land of MAJ".

## Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Project Type**: Static HTML/CSS/JS website with single entry point (`index.html`)
- **Assets**: CDN-hosted images for reliable loading
- **Typography**: Google Fonts with fallbacks to system fonts

## Design Architecture
### Color Palette (Bold Dramatic Theme with Gradients)
- Primary Background: `#0a0a0a` (deep black)
- Secondary Background: `#1a1a1a` (dark charcoal)
- Accent Background: `#2a2a2a` (medium charcoal)
- Text Primary: `#ffffff` (white)
- Text Secondary: `#cccccc` (light gray)
- Red Primary: `#dc2626` (vibrant red)
- Gold Primary: `#d4af37` (rich gold)
- Text Accent: `#d4af37` (gold)

### Gradient System
- Primary Gradient: `linear-gradient(135deg, #dc2626 0%, #d4af37 100%)` (red-to-gold diagonal)
- Vertical Gradient: `linear-gradient(180deg, #dc2626 0%, #d4af37 100%)` (red-to-gold vertical)
- Radial Gradient: `radial-gradient(circle at center, #dc2626 0%, #d4af37 70%, #0a0a0a 100%)` (radial red-to-gold-to-black)
- Subtle Overlay: `linear-gradient(45deg, rgba(220, 38, 38, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%)` (subtle background texture)
- Interactive Overlay: `linear-gradient(135deg, rgba(220, 38, 38, 0.8) 0%, rgba(212, 175, 55, 0.8) 100%)` (gallery overlays)

### Typography Hierarchy
- Headlines: 'Playfair Display' (serif) - 3.5rem to 2.2rem
- Body Text: 'Source Sans Pro' (sans-serif) - 1.1rem base
- Fallbacks: Georgia, 'Times New Roman' for serif; system fonts for sans-serif

### Layout Principles
- Asymmetrical grid system with generous white space
- Responsive design with mobile-first approach
- Scroll-triggered animations for enhanced user experience
- Fixed navigation with backdrop blur effect

## Content Strategy
### Authentic Content Replacement
- Professional author portraits from Unsplash
- CDN-hosted images for reliable loading across environments
- Realistic author bio and book information
- Professional gallery showcasing writing environment

### Image Management
- All images processed through Youware CDN for consistent availability
- Fallback system for external image sources
- Optimized loading with proper alt text and responsive sizing

## Animation & Interactions
### Scroll Animations
- Fade-in effects triggered by Intersection Observer API
- Staggered animations for gallery items and navigation links
- Smooth scroll behavior for internal navigation

### Hover Effects
- Subtle transform and shadow changes on interactive elements
- Gallery overlay effects with opacity transitions
- Button hover states with elevation changes

## Development Guidelines
### File Structure
- Single-file architecture (`index.html`) for simplicity
- Inline CSS and JavaScript for self-contained deployment
- CDN references for external resources with local fallbacks

### Performance Optimizations
- Optimized animation timing and easing functions
- Efficient CSS selectors and minimal DOM manipulation
- Lightweight JavaScript for enhanced functionality

### Responsive Design
- Breakpoint at 768px for mobile adaptation
- Flexible grid systems that adapt to different screen sizes
- Touch-friendly interface elements for mobile devices

## Browser Compatibility
- Modern browsers with CSS Grid and Flexbox support
- Intersection Observer API for scroll animations
- Graceful degradation for older browsers

## Content Management Features
### File Upload System
- **Logo Upload**: Drag-and-drop interface for custom logo integration
- **Gallery Management**: Multiple image upload with instant preview
- **Real-time Integration**: Uploaded images immediately appear on the website
- **File Validation**: Supports PNG, JPG, SVG with size limits (2MB logo, 5MB gallery)

### Content Sections
- **Detailed Author Bio**: Comprehensive background, achievements, and personal story
- **Enhanced Book Information**: Includes metadata, reviews, purchase links, and book club resources
- **Professional Gallery**: Workspace and author lifestyle images with overlay descriptions

## Interactive Features
### Upload Interface
- Drag-and-drop file handling with visual feedback
- Real-time preview system with remove functionality
- Success notifications and error handling
- Mobile-responsive upload areas

### Dynamic Content Updates
- Logo replacement in navigation bar
- Gallery expansion with new uploaded images
- Instant visual feedback for all uploads
- Local storage of uploaded content (session-based)

## Future Enhancements
- Contact form integration capability
- Blog section expansion potential  
- Social media integration optimization
- SEO meta tags and structured data implementation
- Persistent storage for uploaded content
- Content management dashboard
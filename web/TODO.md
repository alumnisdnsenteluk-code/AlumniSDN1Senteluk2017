# Plan: Image Upload, Admin Menu Improvements, and Responsive Design

## 1. Information Gathered
Based on analyzing the codebase:
- **Current Structure**: Static HTML/JS website for Alumni SDN 1 Senteluk 2017
- **Image Storage**: Currently using default placeholder images in `assets/img/alumni/` and `assets/img/galeri/`
- **Data Storage**: Using localStorage for CRUD operations via DataManager
- **Admin Panel**: Has dashboard, alumni, agenda, galeri, and settings pages
- **Theme**: Light/Dark mode already implemented via CSS variables
- **Responsive**: Some mobile responsive features exist but need improvement

## 2. Plan

### Phase 1: Create Image Storage Folders
- Create `assets/img/profile/` folder for alumni profile pictures
- Create `assets/img/agenda/` folder for agenda/event images
- Create `assets/img/konten/` folder for general content images

### Phase 2: Implement Image Upload System
- Create upload handling JavaScript functions
- Modify admin forms to include file upload inputs
- Add image preview functionality
- Store images in appropriate folders
- Update DataManager to handle image paths

### Phase 3: Improve Admin Menu
- Enhance sidebar styling and interactions
- Add active state indicators
- Improve navigation between admin pages
- Add logout confirmation

### Phase 4: Synchronize All Menus
- Ensure all admin pages use consistent styling
- Sync theme toggle across all pages
- Ensure data consistency between pages

### Phase 5: Lightbox for Full-size Images
- Create/improve lightbox modal
- Add click-to-view-original-size functionality
- Improve lightbox styling and animations

### Phase 6: Responsive Design (Windows/Mobile)
- Improve mobile navbar toggle
- Add tablet responsive breakpoints
- Optimize touch interactions
- Improve form layouts on mobile

## 3. Dependent Files to be Edited

### CSS Files:
- `assets/css/style.css` - Main styles (add lightbox, responsive)
- `assets/css/navbar.css` - Navbar improvements
- `assets/css/admin.css` - Admin panel enhancements
- `assets/css/cards.css` - Card component styles

### JavaScript Files:
- `assets/js/main.js` - Add upload functions, improve theme sync
- `assets/js/admin.js` - Add image upload handling to admin forms
- `assets/js/galeri.js` - Improve lightbox functionality

### Admin HTML Files:
- `admin/alumni.html` - Add profile photo upload
- `admin/agenda.html` - Add agenda image upload
- `admin/galeri.html` - Add galeri image upload
- `admin/dashboard.html` - Improve dashboard

### Main HTML Files:
- `index.html` - Ensure lightbox works
- `galeri.html` - Ensure lightbox works
- `alumni.html` - Add profile photo lightbox

## 4. Followup Steps
1. Create the image folders
2. Implement JavaScript upload handling
3. Update all admin forms with upload capability
4. Add lightbox CSS and functionality
5. Test responsive behavior on different screen sizes
6. Verify all menus are synchronized


# 🎨 Professional Blog with Interactive Image Gallery

## ✨ Features

### 1. **Interactive Bento Grid Layout**
- Modern card-based layout with hover effects
- Responsive design that adapts to all screen sizes
- Smooth animations and transitions

### 2. **Tech Stack Showcase**
- **Marquee Animation** - Technologies scroll smoothly across the screen
- Hover effects with blur-to-sharp transitions
- Glowing shadows on hover
- All 10 images from `/public/img/bg-img/` are displayed

### 3. **Blog Posts Grid**
- Clean article cards with images
- Category filtering system
- Date display with calendar icons
- Hover scale effects with glowing borders

### 4. **Technologies Gallery**
- Interactive grid showing all tech stack images
- Hover effects with scale and glow
- Category labels for each technology

## 🚀 Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Icon components
- **Lucide Icons** - Additional icons
- **Framer Motion** - (can be added for more animations)

## 📁 File Structure

```
src/
├── app/
│   ├── blog/
│   │   └── page.tsx          # Main blog page
│   └── globals.css            # Global styles
├── components/
│   └── ui/
│       ├── bento-grid.tsx     # Bento grid component
│       └── marquee.tsx        # Marquee animation component
```

## 🎯 Key Components

### 1. **BentoGrid**
Modern grid layout for featured content with:
- Responsive columns
- Hover animations
- Background components
- Call-to-action buttons

### 2. **Marquee**
Infinite scrolling animation with:
- Pause on hover
- Reverse direction option
- Vertical/horizontal modes
- Customizable speed

### 3. **Blog Page**
Complete blog interface with:
- Hero section with gradient text
- Category filter buttons
- Interactive tech gallery
- Blog post cards
- Contact modal integration

## 🎨 Interactive Features

1. **Hover Effects**
   - Images scale and glow on hover
   - Blur-to-sharp transitions
   - Border color changes
   - Shadow effects

2. **Animations**
   - Fade-in on page load
   - Marquee scrolling
   - Scale transformations
   - Smooth transitions

3. **Responsive Design**
   - Mobile-first approach
   - Adapts to all screen sizes
   - Touch-friendly interactions

## 🌈 Color Scheme

- **Primary Glow**: `#6EE7B7` (Emerald green)
- **Background**: Dark theme with gradients
- **Borders**: Subtle slate colors
- **Hover States**: Glowing effects

## 📸 Image Display

All 10 images are used:
- `1.gif` - Animation Tech
- `2.png` - Flutter
- `3.gif` - 3D Graphics
- `4.png` - TypeScript
- `5.png` - CSS3
- `6.png` - GitHub
- `7.png` - React
- `8.png` - Node.js
- `9.png` - Next.js
- `10.gif` - AI/ML

## 🚀 How to Run

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run development server**:
   ```bash
   pnpm dev
   ```

3. **Open browser**:
   Navigate to `http://localhost:3000/blog`

## 🎭 Customization

### Add New Blog Post
Edit `src/app/blog/page.tsx` and add to `blogPosts` array:
```typescript
{
  id: 4,
  title: "Your Title",
  description: "Your description",
  date: "2024-01-20",
  image: "/img/bg-img/1.gif",
  category: "Development",
}
```

### Change Marquee Speed
Modify the `--duration` CSS variable:
```tsx
className="[--duration:20s]"  // 20 seconds
```

### Add New Category
Add to `categories` array:
```typescript
const categories = ["All", "Development", "Design", "New Category"];
```

## 🎨 Style Customization

### Colors
Edit `tailwind.config.ts` or use inline styles:
```tsx
className="text-primary-glow hover:text-primary-hover"
```

### Animations
Add new animations in `tailwind.config.ts`:
```typescript
keyframes: {
  yourAnimation: {
    from: { /* start */ },
    to: { /* end */ }
  }
}
```

## 🔥 Performance Tips

1. Images are optimized with Next.js Image component
2. Animations use GPU acceleration (`transform-gpu`)
3. Lazy loading for off-screen content
4. Efficient marquee implementation

## 📱 Responsive Breakpoints

- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## 🎉 Ready to Go!

Your blog is now set up with:
✅ Interactive image galleries
✅ Smooth animations
✅ Responsive design
✅ Modern UI components
✅ Professional styling

Visit `/blog` to see your amazing blog! 🚀

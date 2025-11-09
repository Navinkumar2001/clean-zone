# 🧩 CleanZone

**Tagline:** "Empower Citizens. Clean Communities."

A smart civic issue reporting platform that enables citizens to report municipal problems instantly and track their resolution in real-time.

## 🚀 Features

- **📱 Instant Reporting**: Upload photos, auto-detect GPS location, submit in 3 clicks
- **🗺️ Interactive Map**: Geo-mapped dashboard with color-coded issue status
- **📊 Real-time Tracking**: Track progress from Reported → In Progress → Resolved
- **👥 Community Engagement**: Upvote issues to help prioritize municipal response
- **📈 Analytics**: View statistics and success rates

## 🛠️ Tech Stack

- **Frontend**: Vue 3 + TypeScript + SCSS
- **State Management**: Pinia
- **Maps**: Leaflet.js
- **Build Tool**: Vite
- **Styling**: SCSS with utility classes

## 🏃‍♂️ Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 📱 Usage

1. **Report Issue**: Navigate to `/report`, select issue type, upload photo, get location, submit
2. **View Dashboard**: Check `/dashboard` for interactive map and issues list
3. **Track Progress**: See real-time status updates and community engagement

## 🎯 Core Functionality

- **Issue Types**: Garbage, Pothole, Streetlight, Water leakage, Other
- **Status Tracking**: Reported (🔴), In Progress (🟡), Resolved (🟢)
- **Location Services**: Browser geolocation API for automatic positioning
- **Image Upload**: Camera capture with preview functionality
- **Filtering**: Filter issues by type and status
- **Upvoting**: Community-driven prioritization system

## 🌟 Future Enhancements

- Backend integration with Node.js + MongoDB
- Push notifications via Twilio/SendGrid
- AI image classification for auto-detection
- PWA support for offline functionality
- Municipal admin panel for status updates
- WhatsApp integration for notifications

## 📄 License

MIT License - Feel free to use this project for civic improvement initiatives.
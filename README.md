# Global Sentiment Dashboard

![Dashboard Preview]("@/assets/dashboard-photo.png")

## Overview

Global Sentiment Dashboard is an interactive visualization tool that displays sentiment data across different regions and countries worldwide. The dashboard provides a comprehensive view of sentiment trends, allowing users to analyze positive, neutral, and negative sentiment distributions geographically.

## Features

- **Interactive Map Visualization**: Explore sentiment data with an interactive global map
- **Multiple Sentiment Views**: Toggle between overall, positive, neutral, and negative sentiment displays
- **Detailed Region Analysis**: Click on regions to view detailed sentiment breakdowns
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices
- **Dark/Light Mode**: Support for both dark and light themes
- **Authentication System**: Secure login and registration functionality
- **Dashboard Analytics**: View statistics and trends across different regions

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Routing**: React Router v6
- **Visualization**: amCharts 5
- **State Management**: React Context API
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animation**: Framer Motion
- **Authentication**: Custom auth implementation (can be replaced with Auth providers)
- **Data Parsing**: Papa Parse for CSV data processing

## Installation

### Prerequisites

- Node.js (v16 or higher)
- pnpm or yarn

### Setup

1. Clone the repository:

\`\`\`bash
git clone https://github.com/erehmaryann/global-sentiment-dashboard.git
cd global-sentiment-dashboard
\`\`\`

2. Install dependencies:

\`\`\`bash
pnpm install

# or

yarn
\`\`\`

3. Start the development server:

\`\`\`bash
pnpm run dev

# or

yarn dev
\`\`\`

4. Open your browser and navigate to `http://localhost:8080`

### Building for Production

\`\`\`bash
pnpm run build

# or

yarn build
\`\`\`

The build artifacts will be stored in the `dist/` directory.

## Usage

### Authentication

- Use the login page to sign in with existing credentials
- Use the register page to create a new account
- Demo credentials: `demo@example.com` / `password`

### Dashboard Navigation

- Use the sidebar to navigate between different sections
- Toggle the sidebar using the sidebar trigger button
- Switch between light and dark mode using the theme toggle

### Map Interaction

- Click on countries/regions to view detailed sentiment analysis
- Use the sentiment type controls to switch between different sentiment views
- Hover over regions to see quick information

### Data Visualization

The dashboard provides several ways to visualize sentiment data:

1. **Global Map**: Color-coded representation of sentiment across regions
2. **Stats Cards**: Quick overview of key metrics
3. **Region Details**: Detailed breakdown of sentiment for selected regions
4. **Tabs**: Additional analytics views including trends and insights

## Project Structure

\`\`\`
sentiment-dashboard/
├── public/ # Static assets
├── src/
│ ├── app/ # Application routes and pages
│ │ ├── auth/ # Authentication pages
│ │ └── dashboard/ # Dashboard pages
│ ├── components/ # Reusable components
│ │ ├── layout/ # Layout components
│ │ ├── Map/ # Map visualization components
│ │ └── ui/ # UI components (shadcn/ui)
│ ├── hooks/ # Custom React hooks
│ ├── lib/ # Utility functions
│ ├── services/ # API services
│ ├── types/ # TypeScript type definitions
│ ├── utils/ # Utility functions
│ ├── main.tsx # Application entry point
│ └── router.tsx # Router configuration
├── .eslintrc.json # ESLint configuration
├── .gitignore # Git ignore file
├── index.html # HTML entry point
├── package.json # Project dependencies
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
└── vite.config.ts # Vite configuration
\`\`\`

## Development

### Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run lint` - Run ESLint
- `pnpm run test` - Run tests
- `pnpm run test:ui` - Run tests with UI
- `pnpm run coverage` - Generate test coverage report

### Adding New Routes

1. Create a new page component in the appropriate directory
2. Add the route to `src/router.tsx`
3. Update the sidebar navigation if needed

Example:

\`\`\`tsx
// Add to router.tsx
{
path: "/new-feature",
Component: NewFeature,
}

// Add to sidebar navigation
{
title: "New Feature",
url: "/new-feature",
icon: Icon,
}
\`\`\`

### Styling

The project uses Tailwind CSS for styling. To add or modify styles:

1. Use Tailwind utility classes directly in components
2. For custom styles, add them to the appropriate CSS file
3. For theme customization, modify `tailwind.config.js`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data visualization powered by [amCharts 5](https://www.amcharts.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)

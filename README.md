# MiPaginaReact

A modern React single-page application for browsing and interacting with anime and manga content. Built with Vite for fast development, this project follows best practices in modularity, scalability, and maintainability.

## Features

- Responsive and accessible UI with Tailwind CSS
- User authentication with token refresh and session persistence
- Dynamic navigation and routing using Wouter
- Modular component architecture (Cards, NavBar, Loader, PopUps, etc.)
- Custom hooks for data fetching and state management
- Notification pop-ups for user feedback
- Recent content logic and view pages for anime and manga
- Context-based global state management

## Folder Structure

```
src/
│
├── app.jsx             # Main application component and routes
├── main.jsx            # Entry point for React/Vite
├── Context.jsx         # Context provider for auth and global state
├── index.css           # Tailwind and global styles
│
├── components/         # Reusable UI components (NavBar, Card, Loader, NotificationPopUp, etc.)
├── hooks/              # Custom React hooks (e.g. useRecentContent, useGetToken)
├── pages/              # Page components (Landing, View, Animes, Mangas, Auth, etc.)
├── services/           # API interaction logic (e.g. authController, data fetching)
├── utils/              # Utility functions and helpers
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/Sebaxsus/MiPaginaReact.git
cd MiPaginaReact
npm install
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Build for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Environment Variables

Create a `.env` file in the root with any necessary API URLs and secrets. See `.env.example` if available.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).  
See the [LICENSE](./LICENSE) file for more details.

---

Feel free to open issues for bugs or enhancement requests!

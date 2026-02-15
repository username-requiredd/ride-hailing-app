# Uber-like Map App Blueprint

## Overview

This document outlines the plan for creating a production-quality web application that displays a Google Map with animated car movement, similar to the live ride tracking experience in Uber.

## Project Structure

```
.
├── blueprint.md
├── next.config.ts
├── package.json
├── public
│   └── car.svg
├── src
│   ├── app
│   │   ├── api
│   │   │   └── socket
│   │   │       └── route.ts
│   │   ├── components
│   │   │   ├── CarMarker.tsx
│   │   │   ├── MapView.tsx
│   │   │   └── RideController.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── lib
│   │   ├── google-maps.ts
│   │   └── socket.ts
│   └── store
│       └── ride.ts
└── tsconfig.json
```

## Plan

1.  **Create `blueprint.md`:** Outline the project structure and plan.
2.  **Create Directories:** Set up the folder structure for components, libraries, and the store.
3.  **Install Dependencies:** Install `zustand`, `@react-google-maps/api`, `socket.io-client`, and `socket.io`.
4.  **Create Zustand Store:** Implement the state management for the ride.
5.  **Create `MapView` Component:** Initialize the map and render the elements.
6.  **Create `CarMarker` Component:** Handle the car animation.
7.  **Create `RideController` Component:** Simulate the ride.
8.  **Set up WebSocket Server:** Create a Next.js API route for real-time communication.
9.  **Update `page.tsx`:** Integrate the components.
10. **Update `layout.tsx`:** Load the Google Maps script.
11. **Create Car Icon:** Add a custom car icon.
12. **Update `blueprint.md`:** Document the project and steps taken.

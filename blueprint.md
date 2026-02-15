# Ride-Hailing App Blueprint

## Overview

This document outlines the architecture and features of a modern, full-featured ride-hailing application, similar to Uber or Lyft. The application will provide a seamless user experience, from selecting a ride to completing the trip and leaving feedback.

## Core Features

*   **Ride Selection:** A professional, responsive sidebar will allow users to choose between different ride types (e.g., Economy, Business), with dynamic updates for price estimates and ETAs.
*   **Full Ride Lifecycle:** The application will support the complete ride lifecycle, including visual states for finding a driver, driver arrival, trip in progress, and trip completion.
*   **Interactive Map:** A dynamic map will display the user's location, pickup and destination markers, the driver's real-time location, and the route polyline.
*   **Driver Simulation:** A driver simulator will animate the driver's movement along the route, providing a realistic trip experience.
*   **Feedback System:** Upon trip completion, a modal will appear, allowing users to rate the ride and provide optional feedback.

## Technical Architecture

*   **Frontend:** Next.js with React and TypeScript
*   **State Management:** Zustand for global state management
*   **Mapping:** Google Maps API, with `@react-google-maps/api` for React integration
*   **Styling:** Tailwind CSS for a modern, utility-first design

## Design and UI/UX

*   **Professional and Polished:** The UI will be clean, minimal, and inspired by modern ride-hailing apps like Uber.
*   **Responsive:** The layout will be fully responsive, ensuring a seamless experience on both desktop and mobile devices.
*   **Animations and Transitions:** Subtle animations will be used to enhance the user experience, such as a pulsing icon when finding a driver and a fade-in animation for the trip completion modal.

## UI Upgrade and Ride Lifecycle Implementation

This phase of the project focuses on upgrading the UI to professional standards and implementing the full ride lifecycle. The following steps will be taken:

1.  **Create a Professional Sidebar:**
    *   Develop a responsive sidebar component for ride selection.
    *   Allow users to choose between 'Economy' and 'Business' ride types.
    *   Display dynamic price estimates, ETAs, and driver availability.

2.  **Implement the Full Ride Lifecycle:**
    *   **Finding Driver:** Create an animated waiting screen with the pickup address and ETA.
    *   **Driver Arrived:** Display the driver's name, car information, and an ETA to the pickup location.
    *   **Trip In Progress:** Show the driver moving along the route on the map and display trip progress in the sidebar.
    *   **Trip Complete:** Implement a modal with a trip summary (fare, distance, time) and a feedback/rating component.

3.  **Develop a Rating Modal:**
    *   Create a reusable modal that appears automatically after the trip is complete.
    *   Include a 1-5 star rating system and an optional text feedback field.
    *   Submitting the rating will reset the ride state.

4.  **Extend the Global State:**
    *   Update the Zustand store to manage the ride lifecycle, including `rideType`, `rideStage`, `driverInfo`, `tripSummary`, `rating`, and `feedback`.

5.  **Refine the UI/UX:**
    *   Ensure all new components are styled professionally and are fully responsive.
    *   Implement smooth transitions and animations between ride states.
    *   Refine the map behavior to ensure a seamless experience throughout the ride.

## Bug Fixes and Refinements

*   **Zustand State Management:**
    *   Addressed a critical bug causing the "Rendered more hooks than during the previous render" error.
    *   The root cause was identified as components selecting multiple slices of the `useRideStore` state without a `shallow` comparator, leading to unnecessary re-renders.
    *   Corrected the usage of `useRideStore` in all affected components (`DriverArrived.tsx`, `FindingDriver.tsx`, `MapCameraManager.tsx`, `RideLifecycle.tsx`, `RideSelection.tsx`, `Sidebar.tsx`) and the `useUberStyleDriverFollow.ts` hook by memoizing the selection with `shallow`.
*   **Code Linting:**
    *   Ran `npm run lint -- --fix` to identify and resolve warnings.
    *   Removed unused variables from `MapCameraManager.tsx` and `RideController.tsx` to improve code cleanliness.
*   **Result:** The application is now stable, and the primary rendering error has been resolved, ensuring a smooth and predictable user experience.

## Next Steps: Resolving the "Module not found" Error

The application is currently experiencing a build error: `Module not found: Can't resolve '@/contexts/ThemeContext'`. Despite several attempts to fix this, the error persists. This section outlines a clear plan to resolve this issue.

**1. The Problem:**

The error indicates that an import path for the `ThemeContext` is incorrect somewhere in the application. While several files have been checked, the error's persistence suggests a more thorough search is required.

**2. The Plan:**

To definitively resolve this issue, you should manually check every `.tsx` file in the `src` directory for the `ThemeContext` import.

*   **Locate the Incorrect Import:** Look for any line that imports from `'@/contexts/ThemeContext'` or a relative path to `ThemeContext`.
*   **Correct the Import Path:** The correct import path is `'@/app/contexts/ThemeContext'`. Please update any incorrect paths you find.
*   **Restart the Development Server:** After correcting all import paths, restart the Next.js development server. This will clear any cached errors and ensure a fresh build.

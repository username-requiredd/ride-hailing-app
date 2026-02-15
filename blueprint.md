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

## Current Plan: UI Upgrade and Ride Lifecycle Implementation

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

# Impenetrable Reservation Platform

## Overview
This project is a service reservation application designed for local neighbors and entrepreneurs in conservation areas, initially deployed in the IMPE (Impenetrable) region [1]. 

The platform's main goal is to manage requests for activities and gastronomic services using a specific rotation logic to ensure equitable distribution of work [1]. It replaces manual coordination with an automated routing engine that seamlessly connects tourists with local ventures.

## Key Features

*   **Tourist Access (Zero Friction):** Tourists can easily access the application to request their activities or services for the day without cumbersome registration processes [1].
*   **Entrepreneur Dashboard:** Local hosts can register their ventures, list their activities and gastronomic services [2, 3], and easily accept or reject incoming service requests [1].
*   **Automated Fair Rotation:** The core engine features a cascading flow that assigns requests equitably among available entrepreneurs based on a strict rotation logic [1]. 
*   **Admin Management:** The Impenetrable Admin is responsible for enabling entrepreneurs [2] and managing the master catalogs across different regional projects.
*   **Multi-Destination & Multi-Language:** Built to scale across different conservation projects (e.g., Patagonia, Impenetrable) and supports multiple languages dynamically for international tourists.

## Repository Structure (Monorepo)

This repository follows a Spec-Driven Development approach using **OpenSpec**.

*   `/openspec/specs/`: Contains the single source of truth for AI agents and developers. Read the `01-master-system.md` file for full business rules and the Entity-Relationship Diagram (ERD).
*   `/backend/`: API infrastructure, automated routing engine, and PostgreSQL database migrations.
*   `/frontend/`: Tourist facing web-app and Entrepreneur/Admin dashboards.

## Architecture & Tech Stack
*   **Database:** PostgreSQL (utilizing `JSONB` for native i18n support).
*   **AI Planning:** OpenSpec Framework for persistent context and AI agent compatibility.
*   **Core Logic:** Enums strictly define system states to protect the cascading rotation algorithm, while parametric tables allow flexible catalog growth.

## Getting Started
To start contributing or generating code with an AI Agent (like Cursor, Windsurf, or Copilot):
1. Install OpenSpec: `npm install -g @fission-ai/openspec@latest`
2. Read the spec: `openspec read specs/01-master-system.md`
3. Propose changes or start coding!

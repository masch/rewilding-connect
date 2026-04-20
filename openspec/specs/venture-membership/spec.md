# Venture Membership Specification

## Purpose

This specification defines the relationship between physical business locations (Ventures) and the people who manage them (Entrepreneurs). It supports multi-tenant management where one person can manage multiple businesses and one business can be managed by multiple people.

## Requirements

### Requirement: Venture-Entrepreneur Linkage

The system MUST allow linking one or more Users (with the `ENTREPRENEUR` role) to a `Venture`.

#### Scenario: Multi-manager venture

- GIVEN a Venture "Parador El Sauce"
- WHEN two entrepreneurs (User A and User B) are linked to the venture as managers
- THEN both users MUST receive notifications for incoming orders assigned to that Venture
- AND any of the two users MAY accept or reject the orders on behalf of the Venture.

### Requirement: Entrepreneur Portfolio

The system SHALL support an entrepreneur managing multiple ventures across different regions or types.

#### Scenario: Entrepreneur with two businesses

- GIVEN Entrepreneur "Juan" managing a Gastronomy venture and a Guide Service venture
- WHEN Juan logs into the application
- THEN he MUST be able to switch between his ventures

## Mobile Implementation (Mocks)

To support development and testing without a live backend, the mobile application uses a centralized assignment system.

### Scenario: Unique Entrepreneur Assignment

- **Given** I am logged in as an entrepreneur (e.g., Maria).
- **When** I view the Agenda.
- **Then** I should see orders only for the ventures explicitly assigned in `venture-members.data.ts`.

### Scenario: Multiple Venture Management

- **Given** an entrepreneur is assigned to multiple ventures.
- **When** I view the Agenda.
- **Then** I should see a consolidated list of orders from all assigned ventures.

### Scenario: No Assignment

- **Given** an entrepreneur with no assignments in the mock system.
- **When** I view the Agenda.
- **Then** I should see an empty agenda without errors.

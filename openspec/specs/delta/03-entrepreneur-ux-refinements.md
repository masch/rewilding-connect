# Delta Spec: Entrepreneur UX Refinements & Notification Strategy

## Context

Following community feedback from admins and entrepreneurs in "El Impenetrable", several UX gaps and technical discrepancies were identified between the Master System and the current implementation. This spec formalizes the solutions discussed.

## 1. Status Vocabulary & Semantic Clarity

To avoid confusion between actions taken by the entrepreneur and the tourist.

### Requirement: Unified Labeling

- **Action "Reject"**: In the Entrepreneur UI, the button and the resulting state MUST be labeled as **"Rechazado"** (never "Cancelado").
- **Action "Cancel"**: Reserved for Tourists or Admins.
- **System Expiration**: Labeled as **"Expirado"** (when timeout occurs).

---

## 2. Notification Strategy (Hybrid Approach)

Addressing the constraints of Web (Tourists) vs Native App (Entrepreneurs).

### Requirement: Entrepreneur Notifications (Native)

- **Mechanism**: Expo Push Notifications (FCM/APNs).
- **Behavior**: Must trigger even if the app is in background or closed.
- **Constraint**: Requires the user to grant notification permissions on first login.

### Requirement: Tourist Notifications (Web)

- **Mechanism 1 (Active)**: **UI Polling**. The "Order Status" screen must check the backend every 20 seconds while active.
- **Mechanism 2 (Persistence)**: **Browser Fingerprinting**. If the tab is closed, re-opening the app or scanning the QR again MUST restore the active order state without login.
- **Mechanism 3 (Fallback)**: **WhatsApp Alerts**. Optional field in the order form: "Notify me via WhatsApp". The system sends an automated message when the status changes to `CONFIRMED` or `EXPIRED`.

---

## 3. Entrepreneur Dashboard Structure

Formalizing the content of the currently placeholder screens.

### Requirement: "Solicitudes" Screen (Inbox)

- **Purpose**: Action center for new requests.
- **Content**: Only orders in `OFFER_PENDING` status.
- **Interaction**: Large "Aceptar" / "Rechazar" buttons.
- **Indicator**: A badge in the bottom tab bar showing the count of pending requests.

### Requirement: "Agenda" Screen (Daily Plan)

- **Behavior**: Shows all orders for the selected day (Confirmed and Pending).
- **Visuals**: Pending offers must be visually distinct (e.g., yellow background vs green for confirmed).

### Requirement: "Perfil" Screen (Management)

- **Venture Control**: Toggle for "Pausa General" (closes the venture).
- **Stock Control**: List of catalog items with individual "Pausa" toggles.

---

## 4. Capacity Management Correction

Aligning the code with the Master System business rules.

### Requirement: Guest Count as Source of Truth

- **Calculation**: Capacity MUST be calculated based on `total_guests` (number of people), NOT on the sum of item quantities.
- **UI Update**: The "Occupation" indicator in the Agenda must show `Total Guests / Max Capacity`.

---

## 5. Service Timing Refinement

### Requirement: Suggested Time

- **Implementation**: In addition to the "Service Moment" (Breakfast, Lunch, etc.), the tourist can select a "Suggested Time" from a predefined list (e.g., 12:00, 12:30, 13:00) to avoid ambiguity.

# OpenSpec: Multi-Destination Rewilding Reservation Platform

## 1. System Overview
The platform is a reservation application designed for local residents and entrepreneurs within conservation projects, starting with the IMPE (Impenetrable) region [1]. The main goal is to manage requests for activities and gastronomic services using a fair and equitable rotation logic [1]. 

To achieve this, the system features an automated engine that replaces manual assignments, routing orders in a way that allows the entrepreneur to accept or reject the service [1]. Additionally, it provides a frictionless experience so tourists can easily access the app to request their daily activities or meals [1].

**Key Technical Context:** The application will be primarily used on **Web and Android** platforms. Because the user base (both local entrepreneurs and some tourists) lacks advanced smartphone skills, **ease of use and accessibility are the highest priorities**. Furthermore, the frontend must be highly optimized to run smoothly on **low-end mobile devices**.

## 2. Actors and Intentions (Roles)

### 2.1. Tourist (Zero Friction)
*   **Intention:** Request an activity or service quickly [1].
*   **Behavior & UX Constraints:**
    *   Eliminates the need for traditional user account creation to avoid friction [2].
    *   Accesses the platform by scanning a QR code (which already contains the Project ID).
    *   Identifies themselves using a mandatory "Alias".
    *   The system uses a device Token (Local Storage) to recognize them for future requests.
    *   *UX Priority:* The interface must be extremely visual, with large buttons and minimal text input required.

### 2.2. Entrepreneur & Venture (Business)
*   **Intention:** Organize daily work and receive clients equitably through the rotation system [1].
*   **Behavior & UX Constraints:**
    *   Registers their venture [3]. 
    *   Registers activities or gastronomic services [3].
    *   The engine routes orders to their business. From their dashboard, they can easily accept or reject the request [1, 3].
    *   **Calendar View:** The dashboard includes a simple calendar view to track assigned orders based on the service date and time.
    *   **Individual & General Pauses:** Can toggle switches to pause specific items (out of stock) or their entire business (full capacity).
    *   *UX Priority:* The dashboard must be native-feeling on Android, avoiding complex menus. Actions like "Accept/Reject" must be prominent and error-proof.

### 2.3. Rewilding Admin
*   **Intention:** Audit the ecosystems, enable local hosts, and control regional catalogs.
*   **Behavior:**
    *   Enables the entrepreneur in the platform [3].
    *   *Evolution:* No longer performs manual request routing [3]; this is now handled by the Backend Autonomous Engine.
    *   Manages the master catalog separated *by project*. 
    *   Consumes a Monthly Reporting Dashboard.

### 2.4. Autonomous Engine (Platform Backend)
*   **Intention:** Guarantee the fair distribution of work per region without human intervention.
*   **Behavior:** 
    *   **Router:** Executes the Cascading Routing Algorithm.
    *   **Morning Reminder (Cron Job):** Sends the entrepreneur an automated reminder (via WhatsApp/Email) with their daily agenda.

---

## 3. Business Rules (Core Workflows)

### 3.1. Cascading Routing Flow (Project-Isolated)
When a tourist submits a request:
1.  The engine looks up Ventures that belong *exclusively* to that project (e.g., Impenetrable).
2.  Evaluates the rotation order, automatically skipping paused ventures.
3.  Sends the offer and triggers a waiting Timeout (e.g., 30 minutes).
4.  If the venture rejects the request or the timeout expires, the offer is forwarded to the next venture.

### 3.2. Internationalization (i18n)
*   Dynamic Catalog data is stored in the database using PostgreSQL's native `JSONB` type for fast translation extraction based on the browser's `Accept-Language`.

---

## 4. Technical Architecture & Tech Stack

To meet the requirement of running smoothly on low-end devices while serving Web and Android users efficiently:

*   **Frontend Framework:** **React Native using Expo**. This allows writing a single codebase that compiles into a lightweight Android application (APK/AAB) and a responsive Web application.
*   **Performance Constraint:** Avoid heavy UI animations and large client-side bundle sizes to ensure performance on low-end hardware.
*   **Backend Framework:** **Node.js with TypeScript**. This enables sharing interfaces and type definitions between the frontend and backend, ensuring end-to-end type safety.
*   **Database:** PostgreSQL (ERD defined below) [7].

---

## 5. Data Structure (Multi-Project ERD)

Below is the relational data model prepared for AI generation using PostgreSQL. 

```mermaid
erDiagram
    %% ==========================================
    %% TOP LAYER: MULTI-TENANT (PROJECTS)
    %% ==========================================
    Project {
        int id PK
        string name "e.g. 'IMPE Rewilding', 'Patagonia Rewilding'"
        boolean is_active
    }

    %% ==========================================
    %% SECURITY & ACCESS LAYER
    %% ==========================================
    Access_User {
        int id PK
        string email "Unique"
        string password_hash 
        enum system_role "ADMIN_REWILDING, ENTREPRENEUR"
        int entrepreneur_id FK "Nullable. Ref: Physical person"
    }

    %% ==========================================
    %% PARAMETRIC TABLES (Dictionaries)
    %% ==========================================
    Role_Type {
        int id PK
        string description "e.g. HOSTEL, GUIDE"
    }

    Catalog_Category {
        int id PK
        string description "e.g. GASTRONOMY, ACTIVITY"
    }

    Time_Of_Day {
        int id PK
        string description "e.g. BREAKFAST, LUNCH, DINNER"
    }

    %% ==========================================
    %% MAIN ENTITIES (Business Core)
    %% ==========================================
    Person {
        uuid id PK
        string alias "Mandatory"
        string first_name "Nullable"
        string last_name "Nullable"
        string device_token "Local Storage"
    }

    Entrepreneur {
        int id PK
        string full_name "Physical Person / Owner"
        string whatsapp_contact "Used for Morning Reminder"
    }

    Venture {
        int id PK
        int project_id FK
        int entrepreneur_id FK
        string name "e.g. Parador Don Esteban"
        int role_type_id FK
        int cascade_order "Isolated rotation per project"
        boolean general_pause "Default FALSE"
        boolean is_active
    }

    Catalog_Item {
        int id PK
        int project_id FK "Isolates catalog by region"
        jsonb name_i18n "e.g. {'es':'Guiso','en':'Stew'}"
        int category_id FK
        decimal price
        boolean global_pause 
    }

    Venture_Item {
        int id PK
        int venture_id FK
        int catalog_item_id FK
        boolean individual_pause "Venture-level stock control"
    }

    %% ==========================================
    %% TRANSACTIONAL & CASCADING FLOW
    %% ==========================================
    Order {
        int id PK
        uuid person_id FK
        int project_id FK "Order origin"
        date service_date "Used for Calendar view"
        int time_of_day_id FK "Used for Calendar view"
        int guest_count 
        enum global_status "SEARCHING, CONFIRMED, COMPLETED, NO_SHOW"
        timestamp created_at
    }

    Order_Detail {
        int id PK
        int order_id FK
        int catalog_item_id FK
        int quantity 
        decimal historical_price
    }

    Cascade_Assignment {
        int id PK
        int order_id FK
        int venture_id FK "Assigned to the business, not the person"
        int attempt_number
        enum offer_status "WAITING_FOR_RESPONSE, ACCEPTED, REJECTED, TIMEOUT"
        timestamp offer_sent_at
        timestamp response_deadline 
        timestamp resolved_at
    }

    %% ==========================================
    %% RELATIONSHIPS
    %% ==========================================
    Project ||--o{ Venture : "groups businesses"
    Project ||--o{ Catalog_Item : "defines regional catalog"
    Project ||--o{ Order : "receives requests"

    Access_User |o--|| Entrepreneur : "authenticates"
    Entrepreneur ||--o{ Venture : "manages"
    
    Role_Type ||--o{ Venture : "classifies"
    Catalog_Category ||--o{ Catalog_Item : "categorizes"
    
    Time_Of_Day ||--o{ Order : "occurs at"
    
    Person ||--o{ Order : "places"
    
    Venture ||--o{ Venture_Item : "offers"
    Catalog_Item ||--o{ Venture_Item : "available at"
    
    Order ||--|{ Order_Detail : "contains"
    Catalog_Item ||--o{ Order_Detail : "includes"
    
    Order ||--o{ Cascade_Assignment : "processed by engine"
    Venture ||--o{ Cascade_Assignment : "receives offer"
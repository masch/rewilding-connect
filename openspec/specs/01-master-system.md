# OpenSpec: Multi-Destination Rewilding Reservation Platform

## 1. System Overview
The platform is a reservation application designed for local residents and entrepreneurs within conservation projects, starting with the IMPE (Impenetrable) region [1]. The main goal is to manage requests for activities and gastronomic services using a fair and equitable rotation logic [1]. 

To achieve this, the system features an automated engine that replaces manual assignments, routing orders in a way that allows the entrepreneur to accept or reject the service [1]. Additionally, it provides a frictionless experience so tourists can easily access the app to request their daily activities or meals [1].

## 2. Actors and Intentions (Roles)

### 2.1. Tourist (Zero Friction)
*   **Intention:** Request an activity or service quickly [1].
*   **Behavior:**
    *   Eliminates the need for traditional user account creation to avoid friction [3].
    *   Accesses the platform by scanning a QR code (which already contains the Project ID, e.g., Impenetrable).
    *   Identifies themselves using a mandatory "Alias".
    *   The system uses a device Token (Local Storage) to recognize them for future requests.

### 2.2. Entrepreneur & Venture (Business)
*   **Intention:** Organize daily work and receive clients equitably through the rotation system [1].
*   **Behavior:**
    *   Registers their venture [2]. A single entrepreneur (owner) can manage multiple physical ventures (businesses) associated with a Project.
    *   Registers activities or gastronomic services [2].
    *   The engine routes orders to their business. From their dashboard, they can accept or reject the request [1, 2].
    *   **Calendar View:** The dashboard includes a calendar view to track assigned orders based on the service date and the specific time of day.
    *   **Individual Pause (Stock Control):** Can pause a specific catalog item if they run out of ingredients.
    *   **General Pause (Capacity Control):** Can disable the reception of all new requests if their business is full or closed.

### 2.3. Rewilding Admin
*   **Intention:** Audit the ecosystems, enable local hosts, and control regional catalogs.
*   **Behavior:**
    *   Enables the entrepreneur in the platform [2].
    *   *Evolution:* No longer performs manual request routing [2]; this is now handled by the Backend Autonomous Engine.
    *   Manages the master catalog separated *by project*. Can apply a **Global Pause** to an item across an entire region.
    *   Consumes a Monthly Reporting Dashboard (KPIs for acceptance rates, timeouts, and completed services).

### 2.4. Autonomous Engine (Platform Backend)
*   **Intention:** Guarantee the fair distribution of work per region without human intervention.
*   **Behavior:** 
    *   **Router:** Executes the Cascading Routing Algorithm, isolating the rotation lists for each `Project`.
    *   **Morning Reminder (Cron Job):** Runs a scheduled task early in the morning to find confirmed orders for the current day and sends the entrepreneur an automated reminder (via WhatsApp/Email) with their daily agenda.

---

## 3. Business Rules (Core Workflows)

### 3.1. Cascading Routing Flow (Project-Isolated)
When a tourist submits a request:
1.  The engine looks up `Ventures` that belong *exclusively* to that project (e.g., Impenetrable).
2.  Evaluates the rotation order, automatically skipping ventures with an active "General Pause" or those lacking the requested item ("Individual Pause").
3.  Sends the offer and triggers a waiting Timeout (e.g., 30 minutes).
4.  If the venture rejects the request or the timeout expires, the offer is automatically forwarded to the next venture in the rotation list for that project.

### 3.2. Internationalization (i18n)
*   Dynamic Catalog data (dish and activity names) are stored in the database using PostgreSQL's native `JSONB` type.
*   This allows the system to quickly extract translations (e.g., `{"es": "Guiso", "en": "Stew"}`) based on the tourist's browser `Accept-Language` header.

---

## 4. Data Structure (Multi-Project ERD)

Below is the relational data model prepared for AI generation using PostgreSQL. Operational states are kept as Enums to protect the cascading engine's strict logic, while expansible categories use parametric tables.

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
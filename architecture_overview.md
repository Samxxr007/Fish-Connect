# FishConnect: Technical Architecture

This documentation is designed for the Final Pitch, highlighting the scalable, resilient, and data-driven nature of the FishConnect ecosystem.

## 1. System Ecosystem (High-Level)
This diagram illustrates the "Zero-Broker" flow between the landing and the laptop.

```mermaid
graph LR
    subgraph "END-USER DEVICES"
        M["📱 Mobile App (Fisherman)"]
        D["💻 Desktop Web (Buyer/Judge)"]
    end

    subgraph "COMPUTE LAYER (Vercel Edge)"
        Next["<b>Next.js 14 Engine</b><br/>App Router & Middleware"]
        Auth["Session Management"]
    end

    subgraph "LOGIC & API SERVICES"
        Predict["📈 <b>Demand Predictor</b><br/>(Trend Analysis)"]
        Sea["🌊 <b>Sea Conditions</b><br/>(Open-Meteo Integration)"]
        Market["💰 <b>Market Engine</b><br/>(Live Pricing)"]
    end

    subgraph "DATA PERSISTENCE"
        Static[("JSON Store<br/>(Price/Buyer Data)")]
        Local[("IndexedDB / LocalStorage<br/>(Catch History)")]
    end

    %% Flows
    M & D <--> Next
    Next --> Predict & Sea & Market
    Market --> Static
    Predict --> Static
    M --> Local

    %% Styling
    style Next fill:#0077b6,color:#fff,stroke:#023e8a,stroke-width:2px
    style Predict fill:#ffb703,stroke:#fb8500,stroke-width:2px
    style Sea fill:#8ecae6,stroke:#219ebc,stroke-width:2px
    style M fill:#fff,stroke:#0077b6,stroke-width:2px
    style D fill:#fff,stroke:#0077b6,stroke-width:2px
```

## 2. Real-time Predictive Flow
How the **Demand Predictor** calculates trends for the fisherman.

```mermaid
sequenceDiagram
    autonumber
    participant U as Fisherman (UI)
    participant A as API Route (/api/forecast)
    participant D as Data Layer (JSON)
    
    U->>A: Request Trend (Species, Location)
    A->>D: Query Historical Benchmarks
    D-->>A: Return Raw Index Data
    A->>A: Apply Seasonality & Spike Logic
    A-->>U: Deliver 30-Day Predictive Map
    U->>U: Render Recharts Component
```

## 3. Tech Stack Deep-Dive (Hackathon Pitch)

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS + Framer Motion.
- **Data Engine**: Serverless JSON API for blazing-fast read operations (optimized for high concurrency).
- **Visualization**: Recharts for dynamic time-series predictive modeling.
- **External Intelligence**: Integrated Open-Meteo API for real-time safety and navigation data.
- **Deployment**: Vercel CI/CD pipeline with Singapore (SIN1) region optimization for minimal latency in Asia.

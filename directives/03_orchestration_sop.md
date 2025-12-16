# 03_orchestration_sop.md: Orchestration & Blending Rules

## 1. The Role of the Orchestrator (Gemini)
The Orchestrator's job is to synthesize raw data into a compelling, human-like narrative. It must balance *logic* (data) with *emotion* (pain points).

## 2. The 70/30 Rule
All generated pitches and conversation starters must adhere to the **70/30 Rule**:

- **70% Context (The "Hook"):** Based on specific observations from the lead's digital footprint (e.g., "I saw you're using Typeform," "I noticed your site load speed is excellent"). This proves we aren't a generic bot.
- **30% Pitch (The "Ask"):** The transition to the value proposition and the call to action.

**Formula:** `[Specific Observation] + [Insight/Compliment] -> [Bridge] -> [Value Prop] -> [CTA]`

## 3. Data Blending Guidelines

### Input Sources
1.  **Technical Data:** (from `design_analyzer.py`) - Tech stack, load speed, responsive issues.
2.  **Business Data:** (from `lead_enrichment.py`) - Industry, company size, estimated traffic.
3.  **Behavioral Data:** (from CRM) - Past interactions, clicked links.

### Blending Logic
- **IF** `Tech Stack` includes "WordPress" **AND** `Load Speed` is > 3s:
    - **Strategy:** Focus on "Performance Optimization" and "Lost Revenue due to bounce rates."
    - **Script:** "I noticed you're running on WordPress, which is great for flexibility, but I detected a 3-second load delay on mobile. In your industry, that usually correlates to a 20% drop in conversion..."

- **IF** `Industry` is "High-Ticket Coaching" **AND** `Traffic` is High:
    - **Strategy:** Focus on "Lead Qualification" and "Time Savings."
    - **Script:** "I see you're driving significant traffic to your funnel. The bottleneck usually isn't leads; it's filtering them. Our voice agents can pre-qualify every single one before they ever hit your calendar..."

## 4. Tone & Voice Mandates
- **Authority:** Speak with confidence. No "umms" or "I think."
- **Conciseness:** Get to the point. Respect the prospect's time.
- **Empathy:** Acknowledge pain points before offering solutions.
- **Professionalism:** Maintain a "White-Glove" service demeanor at all times.

# Eternum — SGRSI (Computer Lab Resource Management)

**Semantic HTML5 + CSS frontend mockup for the SGRSI system — a resource management platform for the computer labs of ITI CETP.**

Eternum is the development repository for **SGRSI** (*Sistema de Gestión de Recursos*, "Resource Management System"), an internal web application that helps the ITI CETP technical school administer its computer equipment, loans, support tickets, and lab sessions. The brand name shown in the application shell is **Lux**.

This repository currently contains the **frontend mockup only**: a set of static, semantically structured HTML5 pages styled with hand-written CSS. There is no JavaScript and no backend in the tree today — the markup documents the intended behavior and the interactions that remain to be implemented (collapsible sidebar, theme switching, data rendering, form validation, etc.).

## What the system does

SGRSI is designed to cover the day-to-day management of a school's IT resources:

- **Inventory** — register and track computers and components (by brand, model, serial number, location, and state: operational, under repair, retired).
- **Equipment status** — per-location overview of equipment and incidents.
- **Tickets** — help-desk queue with states (pending, in progress, in resolution, resolved).
- **Loans (Préstamos)** — register equipment loans.
- **Service requests (Solicitudes)** — request new services or maintenance.
- **User profile** — change password and accessibility preferences.
- **Lab usage sheet (Planilla)** — a standalone registration sheet for computer lab sessions: assigns students to numbered machines, records entry/exit times, and captures the state of each computer (working, not working, peripheral problems) per subject, teacher, lab, workshop, group, and shift.
- **Dashboard** — summary metrics (total equipment, open tickets, active loans, pending requests) and chart placeholders.

All UI strings are in Spanish (`lang="es"`), as the system targets the school's administrative and teaching staff.

## Screens

| File | Screen |
|---|---|
| `src/login.html` | Login (cédula + password, password visibility toggle) |
| `src/dashboard.html` | Home / metrics overview, CSV export button, chart placeholders |
| `src/inventario.html` | Inventory with search, filters, and Equipos/Componentes tabs |
| `src/estado-equipos.html` | Equipment status and incidents per location |
| `src/tickets.html` | Help-desk ticket list with state filters |
| `src/prestamos.html` | Loan registration |
| `src/solicitudes.html` | Service request list |
| `src/perfil.html` | Profile, password change, accessibility controls |
| `src/nuevo-equipo.html` | New equipment form |
| `src/nuevo-componente.html` | New component form |
| `planilla.html` | Computer lab usage registration sheet (standalone, outside `src/`) |

## Repository structure

```
├── planilla.html          # Lab usage registration sheet (standalone page)
├── planilla.css           # Styles for the registration sheet
└── src/
    ├── common.css         # Shared layout: sidebar, topbar, cards, buttons
    ├── formulario.css     # Shared form styles
    ├── login.html/.css    # Authentication screen
    ├── dashboard.html/.css
    ├── inventario.html/.css
    ├── estado-equipos.html/.css
    ├── tickets.html/.css
    ├── prestamos.html/.css
    ├── solicitudes.html/.css
    ├── perfil.html/.css
    ├── nuevo-equipo.html  # (uses formulario.css)
    ├── nuevo-componente.html
    └── logo.png           # SGRSI logo
```

## Implementation status

The current state (commit `41f2998`, "maquetación HTML5 semántica — estructura base del sistema v2.1.0") is a **static semantic mockup**:

- Pages share a common application shell: sidebar navigation, topbar with user info, font-size controls, and a light/dark theme toggle.
- Inline HTML comments mark where JavaScript is expected: sidebar collapse state, active-route highlighting, theme/font-size persistence, data-driven rendering of tables and lists, search/filter behavior, and client-side form validation.
- No build tooling is required — the pages are plain HTML + CSS and can be opened directly in a browser or served by any static file server.

## History

The repository previously contained an Obsidian Vault (reverted) and standalone SGRSI HTML forms with client-side validation (merged, then reverted). The surviving direction is the semantic HTML5 mockup structure that the project is built around.

## License

No license file is present in the repository.

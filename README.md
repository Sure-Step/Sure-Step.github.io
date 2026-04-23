# Sure-Step

**A web-based care-management application designed to alleviate the undue mental stress that caregivers often face when lacking a solid structure.**

This repository holds the development documentation, source for the project website, and design artifacts produced by the Sure-Step team throughout the project lifecycle.

🔗 **Live site:** [sure-step.github.io](https://sure-step.github.io)

---

## About the Project

Sure-Step is a mobile and desktop application that helps **informal** and **professional** caregivers plan, organize, and coordinate the daily work of caring for someone else. It centralizes task scheduling, appointment tracking, medication reminders, and care documentation so caregivers can focus on people instead of paperwork.

Research shows that nearly half of informal caregivers experience caregiver burden, and that proactive planning is the single greatest reducer of stress. Sure-Step is built around those findings.

## Website Contents

| Page | Description |
| --- | --- |
| [Home](https://sure-step.github.io/) | Problem framing, research-backed statistics, and an overview of the Sure-Step solution. |
| [Presentations](https://sure-step.github.io/presentations.html) | Feasibility, Design, and Demo decks. |
| [SRS](https://sure-step.github.io/srs.html) | The full Software Requirements Specification document. |
| [Deliverables](https://sure-step.github.io/deliverables.html) | Process flow, competition analysis, risk analysis, GUI design, and architecture diagrams. |
| [Team](https://sure-step.github.io/team.html) | The people building Sure-Step. |
| [References & Glossary](https://sure-step.github.io/references-glossary.html) | Research citations and definitions of key terms. |

## Team

- Vallerie Hamby
- Hector Reyes
- Michael Branch
- Kai Buckhalter
- Desean Parker

## Tech Stack

- **Jekyll** — static site generator used to build the site from layouts and includes.
- **GitHub Pages** — hosting.
- **HTML, CSS, and vanilla JavaScript** — no framework dependencies.
- **Inter** (Google Fonts) — typography.

## Repository Structure

```
sure-step.github.io/
├── _includes/            Reusable HTML fragments (nav, icon system)
│   ├── nav.html
│   └── icon.html
├── _layouts/             Page layouts
│   └── default.html
├── assets/               Images, team photos, logos, diagrams
├── css/
│   └── style.css         Design tokens + all site styles
├── js/
│   └── site.js           Dark mode, scroll progress, reveal animations, counters
├── index.html            Home
├── team.html
├── presentations.html
├── srs.html
├── deliverables.html
├── references-glossary.html
└── README.md
```

## Running Locally

The site is a standard Jekyll project. To preview it on your machine:

```bash
# Install Ruby + Bundler if you don't have them, then:
bundle install
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`.

## Design System

The visual design is centralized in `css/style.css` through CSS custom properties. To re-skin the entire site, edit the brand tokens at the top of that file — every color on every page updates automatically. Dark mode is supported and the user's preference is persisted across visits.

## License & Acknowledgments

Developed as a team project. Research citations are documented on the [References page](https://sure-step.github.io/references-glossary.html#References).
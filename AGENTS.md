# Portfolio Vanessa Suárez — Instrucciones para IA

## Descripción del proyecto

Portfolio profesional de **Vanessa Suárez**, interiorista. Sitio desplegado en **https://www.suarezstudio.es** mediante GitHub Pages (repo: `crismatji/vanessa-suarez-portfolio`).

Stack: **React 18 + TypeScript + Vite + CSS Modules**. Sin librerías de UI ni frameworks de estilos externos.

---

## Estructura del proyecto

```
src/
  App.tsx                  # Raíz: gestiona overlays y proyecto activo
  main.tsx
  index.css                # Variables CSS globales y tokens de diseño
  components/
    Navbar.tsx/css          # Barra de navegación superior (fija, z-100)
    Trifold.tsx/css         # Layout horizontal deslizante (home ↔ proyecto)
    HomePanel.tsx/css       # Panel izquierdo home (nombre + ticker) — 66.667vw
    PortraitPanel.tsx/css   # Panel derecho home (foto Vanessa) — 33.333vw
    ProjectDetail.tsx/css   # Panel detalle proyecto — 100vw (aparece al desplazar)
                            #   Layout estándar: cover 16:9 + description + gallery 2 cols
                            #   Layout editorial (cuando imageDescriptions presente):
                            #     - N imágenes a pantalla completa (16:9) + caption cada una
                            #     - Duo: 2 fotos en fila, 50% ancho cada una (4:3)
                            #     - Gallery estándar para imágenes restantes
    ServiciosPanel.tsx/css  # Overlay servicios (slide desde derecha)
    ProyectosPanel.tsx/css  # Overlay proyectos con tarjetas (slide desde derecha)
    AboutPanel.tsx/css      # Overlay "Sobre mí" con foto y texto
    ContactPanel.tsx/css    # Overlay contacto con formulario EmailJS
    Panel.tsx/css           # Componente base para overlays (slide-in desde derecha)
    Ticker.tsx/css          # Banda inferior con texto animado
    CustomCursor.tsx/css    # Cursor personalizado
  data/
    projects.ts             # Array de proyectos (Project[])
public/
  projects/cea/             # Imágenes proyecto CEA (cea-01.jpeg … cea-08.jpeg)
  projects/sopon/           # Imágenes proyecto Sopón (sopon-01.jpg … sopon-12.jpg)
  vanessa.jpeg              # Fotografía de Vanessa
  favicon.svg               # Favicon "VS" minimalista
  CNAME                     # www.suarezstudio.es (necesario para GitHub Pages)
```

---

## Arquitectura de navegación

### Trifold (layout deslizante)
El viewport tiene 3 paneles en fila horizontal con `display: flex`:

| Panel | Componente | Ancho | Posición |
|-------|-----------|-------|---------|
| 1 | `HomePanel` | 66.667vw | visible en home |
| 2 | `PortraitPanel` | 33.333vw | visible en home |
| 3 | `ProjectDetail` | 100vw | visible al abrir proyecto |

- **Estado home**: `translateX(0)` → Panel 1 + Panel 2 visibles
- **Estado proyecto abierto**: `translateX(-100vw)` → Panel 3 a pantalla completa
- Track total: `200vw`

### Overlays (Panel base)
`ServiciosPanel`, `ProyectosPanel`, `AboutPanel`, `ContactPanel` usan el componente `Panel` que hace slide desde la derecha con `position: fixed; inset: 0; z-index: 200`.

### Estado en App.tsx
```tsx
type Overlay = null | 'about' | 'contact' | 'servicios' | 'proyectos';
const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
const [overlay, setOverlay] = useState<Overlay>(null);
```

---

## Sistema de theming

Los temas se aplican en `<html data-theme="...">`. Están definidos en `src/index.css`:
- `default` — tema neutro grisáceo
- `cea` — tema cálido (mármol/latón)
- `sopon` — tema tierra andaluza

El tema cambia al abrir un proyecto (`Trifold.tsx` notifica al `App`).

---

## Datos de proyectos (`src/data/projects.ts`)

Interfaz `Project`:
```ts
{
  id, title, category, subtitle, location, description,
  images, coverImage,
  imageDescriptions?: string[]  // opcional — activa el layout editorial en ProjectDetail
}
```

Proyectos actuales: `cea`, `ajibe`.

### CEA — datos actualizados
- `subtitle`: "Confederación de Empresarios de Andalucía"
- `location`: "" (no se muestra en el hero)
- `imageDescriptions`: array de 2 textos (uno por cada imagen inicial del detail)

Las rutas de imagen usan `import.meta.env.BASE_URL` para compatibilidad con GitHub Pages.

---

## Servicios (ServiciosPanel)

Los 6 servicios que ofrece Vanessa:
1. Proyectos de Interiorismo (Distribución, Mobiliario, Iluminación)
2. Planos Técnicos y Render
3. Asesoramiento y Selección de Materiales
4. Asesoramiento y Gestión de Compra en Mobiliario
5. Estudio de Necesidades
6. Coordinación y Ejecución de Obra

---

## Formulario de contacto

Usa **EmailJS** con credenciales en `ContactPanel.tsx`:
- `SERVICE_ID`, `TEMPLATE_ID`, `PUBLIC_KEY` — ya configurados

---

## Deploy

```bash
npm run build          # genera dist/
npm run preview        # preview local del build
```

El deploy a GitHub Pages se hace automáticamente mediante **GitHub Actions** (workflow en `.github/workflows/`). El archivo `public/CNAME` contiene `www.suarezstudio.es`.

- `vite.config.ts` tiene `base: '/'` (dominio propio, no ruta de repo)

---

## Convenciones de código

- **CSS Modules** para todos los estilos — no usar clases globales salvo las definidas en `index.css` (ej: `label`, `body p`)
- **Tokens CSS** en `index.css`: `--font-serif`, `--accent`, `--text-primary`, `--text-secondary`, `--text-muted`, `--border`, `--border-soft`, `--bg`, `--theme-bg`, `--theme-accent`
- **Tipografías**: Antonio (sans, títulos grandes), Cormorant Garamond (serif, italics), Inter (UI)
- No usar librerías de iconos — los iconos son texto plano (`←`, `→`)
- Animaciones con `cubic-bezier(0.16, 1, 0.3, 1)` para entradas suaves
- Responsive breakpoints: `768px` (mobile), `900px` (tablet)

---

## Pendiente / Roadmap

- [x] Sustituido proyecto Sopón por **Ajibe** (6 imágenes: patio, recepción, habitación, zona snack, aseos)
- [ ] Añadir más proyectos cuando estén disponibles

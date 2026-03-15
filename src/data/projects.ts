export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  location: string;
  description: string;
  images: string[];
  coverImage: string;
}

const base = import.meta.env.BASE_URL;

const ceaImages = Array.from({ length: 8 }, (_, i) =>
  `${base}projects/cea/cea-${String(i + 1).padStart(2, '0')}.jpeg`
);

const soponImages = Array.from({ length: 12 }, (_, i) =>
  `${base}projects/sopon/sopon-${String(i + 1).padStart(2, '0')}.jpg`
);

export const projects: Project[] = [
  {
    id: 'cea',
    title: 'CEA',
    category: 'Interiorismo Corporativo',
    subtitle: 'Sede de CEA Empresas Andaluzas',
    location: 'Andalucía, España',
    description:
      'Reforma integral de las instalaciones corporativas de CEA Empresas Andaluzas. El proyecto parte de una paleta de soluciones de lujo contenido: mármol blanco, terciopelo rojo burdeos y detalles en latón dorado definen la recepción y las salas de reunión. La luz indirecta y la volumetría suave de los falsos techos crean una experiencia espacial que transmite solidez, confianza e identidad institucional.',
    images: ceaImages,
    coverImage: ceaImages[0],
  },
  {
    id: 'sopon',
    title: 'SOPÓN',
    category: 'Espacio Gastronómico',
    subtitle: 'Diseño integral para un restaurante de inspiración andaluza',
    location: 'Andalucía, España',
    description:
      'SOPÓN es un proyecto de diseño integral para un espacio gastronómico de inspiración andaluza. El concepto parte de la tradición culinaria y cultural del sur: los tablaos, los taberneos, la cerámica artesanal y la luz rasante del atardecer. Se propone una separación de espacios mediante elementos textiles, iluminación escultórica en corten y piezas únicas que dotan al local de carácter y memoria.',
    images: soponImages,
    coverImage: soponImages[0],
  },
];

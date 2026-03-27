export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  location: string;
  description: string;
  images: string[];
  coverImage: string;
  /** Per-image captions. When present, ProjectDetail renders the structured editorial layout:
   *  one full-width image + caption per entry, followed by a side-by-side duo and a standard gallery. */
  imageDescriptions?: string[];
}

const base = import.meta.env.BASE_URL;

const ceaImages = [
  `${base}projects/cea/1-foto-grande-rincon-fotocall.jpeg`,
  `${base}projects/cea/foto-grande-oficina.jpeg`,
  `${base}projects/cea/foto-area-descanso.jpeg`,
  `${base}projects/cea/fotocall-con-personas.jpeg`,
];

const ajibeImages = [
  `${base}projects/ajibe/foto-patio.jpeg`,
  `${base}projects/ajibe/foto-recepcion.jpeg`,
  `${base}projects/ajibe/foto-habitacion.jpeg`,
  `${base}projects/ajibe/foto-zona-snack.jpeg`,
  `${base}projects/ajibe/foto-aseo-privado.jpeg`,
  `${base}projects/ajibe/foto-aseo-publico.jpeg`,
];

export const projects: Project[] = [
  {
    id: 'cea',
    title: 'CEA',
    category: 'Interiorismo Corporativo',
    subtitle: 'Confederación de Empresarios de Andalucía',
    location: '',
    description:
      'El proyecto parte de una marca corporativa ya consolidada: la identidad visual, los valores institucionales y las directrices de la organización actúan como guía y límite creativo. El trabajo no consiste en diseñar desde cero, sino en escuchar, interpretar y trasladar con precisión ese lenguaje al espacio físico. El resultado es un interiorismo coherente con la marca, adaptado a sus necesidades operativas y alineado con la política e imagen que la Confederación proyecta hacia el exterior.',
    images: ceaImages,
    coverImage: ceaImages[0],
    imageDescriptions: [
      'La identidad corporativa de la CEA actúa como eje vertebrador de cada decisión de diseño. La paleta cromática institucional, la selección de materiales y el tratamiento de los acabados responden con rigor a la imagen de la entidad, generando ambientes que refuerzan el sentido de pertenencia y la solidez representativa de la Confederación.',
      'La claraboya original del edificio se convierte en el recurso arquitectónico central de la intervención. Se potencia su singularidad para maximizar la entrada de luz natural, generando ambientes de trabajo diáfanos y de carácter propio. La preexistencia del inmueble no se enmascara, sino que se integra como un activo del diseño, dotando a los espacios de autenticidad y memoria.',
    ],
  },
  {
    id: 'ajibe',
    title: 'AJIBE',
    category: 'Interiorismo Hotelero',
    subtitle: 'Rehabilitación de espacio hotelero en Andalucía',
    location: '',
    description:
      'En este proyecto el patio interior era, en origen, un espacio residual sin uso definido: un vacío sin carácter que interrumpía la coherencia del conjunto. La intervención lo transforma en el corazón del proyecto. Recuperado desde una voluntad creativa y sensible, se convierte en el germen estético y emocional del alojamiento; el lugar desde el que irradia la esencia del resto de los espacios. A partir de él, cada estancia encuentra su identidad.',
    images: ajibeImages,
    coverImage: ajibeImages[0],
    imageDescriptions: [
      'La recuperación del patio redefine la experiencia del establecimiento desde la llegada. La intervención trabaja con la luz natural, la vegetación mediterránea y los materiales propios de la arquitectura andaluza para componer un ambiente sereno y singular que invita a detenerse. Este espacio es la declaración de intenciones de todo el proyecto.',
      'La recepción extiende el lenguaje del patio hacia el interior, estableciendo una transición fluida entre el acceso y las estancias privadas. La calidez de los materiales y el tratamiento cuidado de la iluminación crean una atmósfera acogedora que anticipa la calidad del resto del alojamiento.',
    ],
  },
];

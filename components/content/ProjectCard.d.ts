/**
 * Karta projektu portfolio: ostre media, hover = scale 1.03 + czerwony krążek ↗.
 * @startingPoint section="Content" subtitle="Karta projektu z hoverem i metadanymi" viewport="420x420"
 */
export interface ProjectCardProps {
  /** URL zdjęcia; bez niego renderuje się placeholder (poproś o realne materiały) */
  image?: string;
  title: string;
  client?: string;
  /** Max 2 widoczne, mono */
  tags?: string[];
  year?: string;
  href?: string;
  /** CSS aspect-ratio, np. "4 / 3", "16 / 10", "1 / 1" */
  ratio?: string;
  style?: React.CSSProperties;
}

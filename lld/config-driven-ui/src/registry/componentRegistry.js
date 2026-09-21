import { Navbar } from '../components/Navbar';
import { HeroBanner } from '../components/HeroBanner';
import { Container } from '../components/Container';
import { ProductCard } from '../components/ProductCard';
import { InfoCard } from '../components/InfoCard';
import { Footer } from '../components/Footer';

/**
 * COMPONENT REGISTRY
 * 
 * Central registry mapping string component types (from JSON/API) 
 * to their actual React Component implementations.
 * 
 * When backend says type: "Navbar", the renderer looks up COMPONENT_REGISTRY["Navbar"].
 */
export const COMPONENT_REGISTRY = {
  Navbar,
  HeroBanner,
  Container,
  ProductCard,
  InfoCard,
  Footer,
};

/**
 * Helper function to retrieve component by type name.
 * Returns null or undefined if not found.
 */
export const getComponentByType = (type) => {
  return COMPONENT_REGISTRY[type];
};

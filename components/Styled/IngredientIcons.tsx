import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '@/constants/Theme';
import { useTranslation } from 'react-i18next';

/* 8 Categorías: 
	1. Granos y cereales
	2. Legumbres y frutos secos
	3. Verduras y frutas
	4. Productos lácteos
	5. Carnes, pescados y mariscos
	6. Aceites y grasas
	7. Especias y condimentos
	8. Otros
*/

const categoryColors: Record<number, string> = {
  1: '#F4A261', // Granos y cereales
  2: '#2A9D8F', // Legumbres y frutos secos
  3: '#8AC926', // Verduras y frutas
  4: '#FFB4A2', // Productos lácteos
  5: '#E76F51', // Carnes, pescados y mariscos
  6: '#FFD166', // Aceites y grasas
  7: '#D62828', // Especias y condimentos
  8: '#6A4C93', // Otros
};


export function getCategoryById(id: number, t: any) {
  switch (id) {
    case 1: 
      return t('Products.categories.grains'); 
    case 2: 
      return t('Products.categories.legumes');  
    case 3: 
      return t('Products.categories.vegetables'); 
    case 4: 
      return t('Products.categories.lactose'); 
    case 5: 
      return t('Products.categories.meat'); 
    case 6: 
      return t('Products.categories.oil'); 
    case 7: 
      return t('Products.categories.species'); 
    case 8: 
      return t('Products.categories.others'); 
  }
}

export function getIconByCategory(category: number) {
  const color = categoryColors[category] || theme.colors.white;
	const size = 25; 

  switch (category) {
    case 1:
      return <GrainsIcon size={size} color={color} />;
    case 2:
      return <LegumesIcon size={size} color={color} />;
    case 3:
      return <VegetablesIcon size={size} color={color} />;
    case 4:
      return <DairyIcon size={size} color={color} />;
    case 5:
      return <MeatIcon size={size} color={color} />;
    case 6:
      return <OilIcon size={size} color={color} />;
    case 7:
      return <SpiceIcon size={size} color={color} />;
    case 8:
    default:
      return <OtherIcon size={size} color={color} />;
  }
}

function GrainsIcon({ color, size }: { color: string, size: number }) {
  return <Icon name="grain" size={size} color={color} />;
}

function LegumesIcon({ color, size }: { color: string, size: number }) {
  return <Icon name="seed" size={size} color={color} />;
}

function VegetablesIcon({ color, size }: { color: string, size: number }) {
  return <Icon name="carrot" size={size} color={color} />;
}

function DairyIcon({ color, size }: { color: string, size: number }) {
  return <Icon name="cow" size={size} color={color} />;
}

function MeatIcon({ color, size }: { color: string, size: number }) {
  return <Icon name="fish" size={size} color={color} />;
}

function OilIcon({ color, size }: { color: string, size: number }) {
  return <Icon name="oil" size={size} color={color} />;
}

function SpiceIcon({ color, size }: { color: string, size: number }) {
  return <Icon name="chili-mild" size={size} color={color} />;
}

function OtherIcon({ color, size }: { color: string, size: number }) {
  return <Icon name="food" size={size} color={color} />;
}

import { Template } from '@/enums';
import { nextConfig } from './next';
import { viteConfig } from './vite';

export const config = {
  [Template.NEXT]: nextConfig,
  [Template.VITE]: viteConfig,
};

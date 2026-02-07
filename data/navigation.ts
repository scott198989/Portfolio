import { Home, Layers, FolderKanban, Briefcase, Cpu, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'About', href: '#about', icon: Layers },
  { label: 'Projects', href: '#projects', icon: FolderKanban },
  { label: 'Experience', href: '#experience', icon: Briefcase },
  { label: 'Stack', href: '#stack', icon: Cpu },
  { label: 'Contact', href: '#contact', icon: Mail },
];

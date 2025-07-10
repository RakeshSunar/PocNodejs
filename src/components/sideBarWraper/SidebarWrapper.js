'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/sidebar/Sidebar'; // adjust path if needed

export default function SidebarWrapper({ children }) {
  const pathname = usePathname();

  const hideSidebarRoutes = ['/login', '/register'];
  const showSidebar = !hideSidebarRoutes.includes(pathname);

  return (
    <>
      {showSidebar && <Sidebar />}
      {children}
    </>
  );
}

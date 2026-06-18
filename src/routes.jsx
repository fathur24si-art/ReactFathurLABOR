import React, { lazy } from 'react';
import { Icon } from '@chakra-ui/react';
import {
  MdHome,
  MdRestaurantMenu,
  MdListAlt,
  MdPeople,
  MdAssessment,
  MdExtension,
} from 'react-icons/md';

// Admin Imports
import DasborRestoran from 'pertemuan6/views/admin/beranda';
import MenuMakanan from 'pertemuan6/views/admin/pasar';
import PesananPelanggan from 'pertemuan6/views/admin/tabel-data';
import DaftarPelanggan from 'pertemuan6/views/admin/profil';
import LaporanRestoran from 'pertemuan6/views/admin/laporan';
const FiturXYZ = lazy(() => import('pertemuan6/views/admin/fiturXYZ'));
import ErrorView from 'pertemuan6/views/admin/error';

const routes = [
  {
    category: true,
    name: "Dashboard",
    items: [
      {
        name: "Dasbor Restoran",
        layout: "/admin",
        path: "/beranda",
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
        component: <DasborRestoran />,
      },
    ],
  },
  {
    category: true,
    name: "Manajemen Resto",
    items: [
      {
        name: "Menu Makanan",
        layout: "/admin",
        path: "/menu",
        icon: (
          <Icon
            as={MdRestaurantMenu}
            width="20px"
            height="20px"
            color="inherit"
          />
        ),
        component: <MenuMakanan />,
      },
      {
        name: "Pesanan Pelanggan",
        layout: "/admin",
        path: "/pesanan",
        icon: <Icon as={MdListAlt} width="20px" height="20px" color="inherit" />,
        component: <PesananPelanggan />,
      },
      {
        name: "Daftar Pelanggan",
        layout: "/admin",
        path: "/pelanggan",
        icon: <Icon as={MdPeople} width="20px" height="20px" color="inherit" />,
        component: <DaftarPelanggan />,
      },
      {
        name: "Fitur XYZ",
        layout: "/admin",
        path: "/fitur-xyz",
        icon: <Icon as={MdExtension} width="20px" height="20px" color="inherit" />,
        component: <FiturXYZ />,
      },
    ],
  },
  {
    category: true,
    name: "Laporan & Bantuan",
    items: [
      {
        name: "Laporan Restoran",
        layout: "/admin",
        path: "/laporan",
        icon: <Icon as={MdAssessment} width="20px" height="20px" color="inherit" />,
        component: <LaporanRestoran />,
      },
    ],
  },
];

export const errorRoutes = [
  {
    name: 'Error 400',
    layout: '/admin',
    path: '/error/400',
    component: <ErrorView />,
  },
  {
    name: 'Error 401',
    layout: '/admin',
    path: '/error/401',
    component: <ErrorView />,
  },
  {
    name: 'Error 403',
    layout: '/admin',
    path: '/error/403',
    component: <ErrorView />,
  },
  {
    name: 'Error 404',
    layout: '/admin',
    path: '/error/404',
    component: <ErrorView />,
  },
  {
    name: 'Error Handler',
    layout: '/admin',
    path: '/error/:code',
    component: <ErrorView />,
  }
];

export default routes;

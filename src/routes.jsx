import React from 'react';
import { Icon } from '@chakra-ui/react';
import {
  MdHome,
  MdRestaurantMenu,
  MdListAlt,
  MdPeople,
} from 'react-icons/md';

// Admin Imports
import DasborRestoran from 'pertemuan6/views/admin/beranda';
import MenuMakanan from 'pertemuan6/views/admin/pasar';
import PesananPelanggan from 'pertemuan6/views/admin/tabel-data';
import DaftarPelanggan from 'pertemuan6/views/admin/profil';
import ErrorView from 'pertemuan6/views/admin/error';

const routes = [
  {
    name: 'Dasbor Restoran',
    layout: '/admin',
    path: '/beranda',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <DasborRestoran />,
  },
  {
    name: 'Menu Makanan',
    layout: '/admin',
    path: '/menu',
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
    name: 'Pesanan Pelanggan',
    layout: '/admin',
    icon: <Icon as={MdListAlt} width="20px" height="20px" color="inherit" />,
    path: '/pesanan',
    component: <PesananPelanggan />,
  },
  {
    name: 'Daftar Pelanggan',
    layout: '/admin',
    path: '/pelanggan',
    icon: <Icon as={MdPeople} width="20px" height="20px" color="inherit" />,
    component: <DaftarPelanggan />,
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

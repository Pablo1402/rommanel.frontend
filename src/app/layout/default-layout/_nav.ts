import { INavData } from '@coreui/angular';

export const navItemsUser: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Clientes',
    url: '/client',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'Pesquisa',
        url: '/client/list',
      },
      {
        name: 'Novo',
        url: '/client/new',
      }
    ]
  }

];


export const navItemsAdmin: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Produtos',
    url: '/product',
    iconComponent: { name: 'cil-layers' },
    children: [
      {
        name: 'Pesquisa',
        url: '/product/list',
      },
      {
        name: 'Novo',
        url: '/product/new',
      }
    ]
  },
  {
    name: 'Parceiros',
    url: '/partner',
    iconComponent: { name: 'cil-bank' },
    children: [
      {
        name: 'Pesquisa',
        url: '/partner/list',
      },
      {
        name: 'Novo',
        url: '/partner/new',
      }
    ]
  },
  {
    name: 'Orçamentos',
    url:'/budget',
    iconComponent: { name: 'cil-send' },
    children: [
      {
        name: 'Pesquisa',
        url: '/budget/list',
      },
      {
        name: 'Novo',
        url: '/budget/new',
      }
    ]
  }
];
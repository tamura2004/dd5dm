interface Menu {
  path: string;
  icon: string;
  label: string;
}

export const MENUES: Menu[] = [
  {
    path: '/',
    icon: 'home',
    label: 'ホーム',
  },
  {
    path: '/signin',
    icon: 'person',
    label: 'サインイン',
  },
  {
    path: '/signup',
    icon: 'person_add',
    label: 'サインアップ',
  },
  {
    path: '/sessions',
    icon: 'list',
    label: 'セッション一覧',
  },
  {
    path: '/sessions/new',
    icon: 'add',
    label: '新規セッション',
  },
  {
    path: '/npcs',
    icon: 'list',
    label: 'NPC一覧',
  },
  {
    path: '/npcs/new',
    icon: 'person_add',
    label: '新規NPC',
  },
];
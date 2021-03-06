import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import { listen } from '@/plugins/firebase';
import Session from '@/models/Session';
import Guild from '@/models/Guild';
import Player from '@/models/Player';
import Dungeon from '@/models/Dungeon';
import Npc from '@/models/Npc';
import Spell from '@/models/Spell';
import Feat from '@/models/Feat';

import uppperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

Vue.config.productionTip = false;

listen<Session>(Session);
listen<Guild>(Guild);
listen<Player>(Player);
listen<Dungeon>(Dungeon);
listen<Npc>(Npc);
listen<Spell>(Spell);
listen<Feat>(Feat);

const requireComponent = require.context(
  './components',
  false,
  /\w+\.vue$/,
);

requireComponent.keys().forEach((fileName: any) => {
  const componentConfig = requireComponent(fileName);
  const componentName = uppperFirst(
    camelCase(
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, ''),
    ),
  );
  Vue.component(
    componentName,
    componentConfig.default || componentConfig,
  );
});

new Vue({
  data: {
    drawer: false,
    processing: false,
  },
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

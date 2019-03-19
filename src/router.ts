import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Sessions from '@/views/Sessions.vue';
import SessionForm from '@/views/SessionForm.vue';
import Session from '@/views/Session.vue';
import EncounterForm from '@/views/EncounterForm.vue';
import Encounter from '@/views/Encounter.vue';
import SessionPlayers from '@/views/SessionPlayers.vue';
import SessionEncounters from '@/views/SessionEncounters.vue';
import SessionReward from '@/views/SessionReward.vue';
import EncounterMonster from '@/views/EncounterMonster.vue';
import EncounterBattle from '@/views/EncounterBattle.vue';
import EncounterReward from '@/views/EncounterReward.vue';
import EncounterRest from '@/views/EncounterRest.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: Sessions,
    },
    {
      path: '/sessions/new',
      name: 'sessions/new',
      component: SessionForm,
    },
    {
      path: '/session/:sessionId',
      name: 'session',
      component: Session,
      props: true,
      children: [
        {
          path: 'players',
          name: 'session/players',
          component: SessionPlayers,
          props: true,
        },
        {
          path: 'encounters',
          name: 'session/encounters',
          component: SessionEncounters,
          props: true,
        },
        {
          path: 'reward',
          name: 'session/reward',
          component: SessionReward,
          props: true,
        },
      ],
    },
    {
      path: '/session/:sessionId/edit',
      name: 'session/edit',
      component: SessionForm,
      props: true,
    },
    {
      path: '/session/:sessionId/encounters/new',
      name: 'encounters/new',
      component: EncounterForm,
      props: true,
    },
    {
      path: '/session/:sessionId/encounter/:encounterId',
      name: 'encounter',
      component: Encounter,
      props: true,
      children: [
        {
          path: 'monster',
          name: 'encounter/monster',
          component: EncounterMonster,
          props: true,
        },
        {
          path: 'battle',
          name: 'encounter/battle',
          component: EncounterBattle,
          props: true,
        },
        {
          path: 'reward',
          name: 'encounter/reward',
          component: EncounterReward,
          props: true,
        },
        {
          path: 'rest',
          name: 'encounter/rest',
          component: EncounterRest,
          props: true,
        },
      ],
    },
  ],
});

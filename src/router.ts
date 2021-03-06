import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth';
import PATH from '@/types/PathTypes';

import DungeonIndex from '@/views/DungeonIndex.vue';
import DungeonShow from '@/views/DungeonShow.vue';
import DungeonNew from '@/views/DungeonNew.vue';
import DungeonEdit from '@/views/DungeonEdit.vue';
import GuildIndex from '@/views/GuildIndex.vue';
import GuildShow from '@/views/GuildShow.vue';
import GuildNew from '@/views/GuildNew.vue';
import GuildEdit from '@/views/GuildEdit.vue';
import EncounterShow from '@/views/EncounterShow.vue';
import EncounterBattle from '@/views/EncounterBattle.vue';
import EncounterForm from '@/views/EncounterForm.vue';
import EncounterMonster from '@/views/EncounterMonster.vue';
import EncounterRest from '@/views/EncounterRest.vue';
import EncounterReward from '@/views/EncounterReward.vue';
import Home from '@/views/Home.vue';
import MenuMaster from '@/views/MenuMaster.vue';
import MenuGuild from '@/views/MenuGuild.vue';
import NpcNew from '@/views/NpcNew.vue';
import NpcIndex from '@/views/NpcIndex.vue';
import NpcEdit from '@/views/NpcEdit.vue';
import SpellNew from '@/views/SpellNew.vue';
import SpellIndex from '@/views/SpellIndex.vue';
import SpellEdit from '@/views/SpellEdit.vue';
import PlayerIndex from '@/views/PlayerIndex.vue';
import PlayerNew from '@/views/PlayerNew.vue';
import PlayerEdit from '@/views/PlayerEdit.vue';
import PlayerShow from '@/views/PlayerShow.vue';
import PlayerWeapons from '@/views/PlayerWeapons.vue';
import PlayerSpells from '@/views/PlayerSpells.vue';
import PlayerFeats from '@/views/PlayerFeats.vue';
import PlayerMemo from '@/views/PlayerMemo.vue';
import SessionShow from '@/views/SessionShow.vue';
import SessionEncounters from '@/views/SessionEncounters.vue';
import SessionNew from '@/views/SessionNew.vue';
import SessionEdit from '@/views/SessionEdit.vue';
import SessionPlayers from '@/views/SessionPlayers.vue';
import SessionReward from '@/views/SessionReward.vue';
import SessionIndex from '@/views/SessionIndex.vue';
import Signin from '@/views/Signin.vue';
import Signup from '@/views/Signup.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    { name: PATH.GUILDS_INDEX, path: '/guilds', component: GuildIndex },
    { name: PATH.GUILDS_NEW, path: '/guilds/new', component: GuildNew },
    { name: PATH.GUILD_EDIT, path: '/guild/:guildId/edit', component: GuildEdit, props: true },
    {
      name: PATH.GUILD_SHOW,
      path: '/guild/:guildId',
      component: GuildShow,
      props: true,
      children: [
        { name: PATH.GUILD_PLAYERS, path: 'players', component: PlayerIndex, props: true },
      ],
    },
    { name: PATH.DUNGEONS_INDEX, path: '/dungeons', component: DungeonIndex },
    { name: PATH.DUNGEONS_NEW, path: '/dungeons/new', component: DungeonNew },
    { name: PATH.DUNGEON_EDIT, path: '/dungeon/:dungeonId/edit', component: DungeonEdit, props: true },
    {
      name: PATH.DUNGEON_SHOW,
      path: '/dungeon/:dungeonId',
      component: DungeonShow,
      props: true,
      children: [
        { name: PATH.DUNGEON_SESSIONS, path: 'sessions', component: SessionIndex, props: true },
      ],
    },
    { name: PATH.HOME, path: '/', component: Home },
    { name: PATH.MENU_MASTER, path: '/menu/master', component: MenuMaster },
    { name: PATH.MENU_GUILD, path: '/menu/guild', component: MenuGuild },
    { name: PATH.NPCS_INDEX, path: '/npcs', component: NpcIndex },
    { name: PATH.NPCS_NEW, path: '/npcs/new', component: NpcNew },
    { name: PATH.NPC_EDIT, path: '/npc/:npcId/edit', component: NpcEdit, props: true },
    { name: PATH.PLAYERS_INDEX, path: '/players', component: PlayerIndex },
    { name: PATH.PLAYERS_NEW, path: '/players/new', component: PlayerNew },
    { name: PATH.PLAYER_EDIT, path: '/player/:playerId/edit', component: PlayerEdit, props: true },
    {
      name: PATH.PLAYER_SHOW,
      path: '/player/:playerId',
      component: PlayerShow,
      props: true,
      children: [
        { name: PATH.PLAYER_WEAPONS, path: 'weapons', component: PlayerWeapons, props: true },
        { name: PATH.PLAYER_SPELLS, path: 'spells', component: PlayerSpells, props: true },
        { name: PATH.PLAYER_FEATS, path: 'feats', component: PlayerFeats, props: true },
        { name: PATH.PLAYER_MEMO, path: 'memo', component: PlayerMemo, props: true },
      ],
    },
    { name: PATH.SPELLS_INDEX, path: '/spells', component: SpellIndex },
    { name: PATH.SPELLS_NEW, path: '/spells/new', component: SpellNew },
    { name: PATH.SPELL_EDIT, path: '/spell/:spellId/edit', component: SpellEdit, props: true },
    { name: PATH.SIGNIN, path: '/signin', component: Signin },
    { name: PATH.SIGNUP, path: '/signup', component: Signup },
    { name: PATH.SESSIONS, path: '/sessions', component: SessionIndex, props: true },
    { name: PATH.SESSIONS_NEW, path: '/sessions/new/:dungeonId', component: SessionNew, props: true },
    { name: PATH.SESSION_EDIT, path: '/session/:sessionId/edit', component: SessionEdit, props: true },
    {
      name: PATH.SESSION,
      path: '/session/:sessionId',
      component: SessionShow,
      props: true,
      children: [
        { name: PATH.SESSION_PLAYERS, path: 'players', component: SessionPlayers, props: true },
        { name: PATH.SESSION_ENCOUNTERS, path: 'encounters', component: SessionEncounters, props: true },
        { name: PATH.SESSION_REWARD, path: 'reward', component: SessionReward, props: true },
      ],
    },
    { name: PATH.ENCOUNTERS_NEW, path: '/session/:sessionId/encounters/new', component: EncounterForm, props: true },
    {
      name: PATH.ENCOUNTER,
      path: '/session/:sessionId/encounter/:encounterId',
      component: EncounterShow,
      props: true,
      children: [
        { name: PATH.ENCOUNTER_MONSTER, path: 'monster', component: EncounterMonster, props: true },
        { name: PATH.ENCOUNTER_BATTLE, path: 'battle', component: EncounterBattle, props: true },
        { name: PATH.ENCOUNTER_REWARD, path: 'reward', component: EncounterReward, props: true },
        { name: PATH.ENCOUNTER_REST, path: 'rest', component: EncounterRest, props: true },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser && to.path === '/npcs/new') {
    next('/signin');
  } else {
    next();
  }
});

export default router;

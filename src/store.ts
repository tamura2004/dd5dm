import Vue from 'vue';
import Vuex from 'vuex';
import { ADD_SESSION } from '@/types/MutationTypes';
import { CREATE_SESSION, UPDATE_SESSION_PLAYERS, CREATE_ENCOUNTER } from '@/types/ActionTypes';
import { db } from '@/plugins/firebase';
import State from '@/models/State';
import Session from '@/models/Session';
import Encounter from '@/models/Encounter';
import Creature from '@/models/Creature';

Vue.use(Vuex);

export default new Vuex.Store({
  state: new State(),
  getters: {
    session(state) {
      return (sessionId: string) => state.sessions.get(sessionId);
    },
    encounters(state) {
      return (sessionId: string) => [...state.encounters.values()]
        .filter((e: Encounter) => e.sessionId === sessionId)
        .sort((a, b) => a.level - b.level);
    },
    encounter(state) {
      return (encounterId: string) => state.encounters.get(encounterId);
    },
    dungeon(state) {
      return (dungeonId: string) => state.dungeons.get(dungeonId);
    },
    npc(state) {
      return (npcId: string) => state.npcs.get(npcId);
    },
  },
  mutations: {
    [ADD_SESSION](state, { sessionId, session }) {
      Vue.set(state.sessions, sessionId, new Session(session));
    },
    set(state, { name, collection }) {
      Vue.set(state, name, collection);
    },
  },
  actions: {
    async [CREATE_SESSION]({}, session) {
      const docRef: any = await db.collection('sessions').add({...session});
      return docRef.id;
    },
    async [CREATE_ENCOUNTER]({}, encounter) {
      const docRef: any = await db.collection('encounters').add({...encounter});
      return docRef.id;
    },
    async [UPDATE_SESSION_PLAYERS]({}, {sessionId, playerIds}) {
      await db.collection('sessions').doc(sessionId).update({ playerIds });
    },
  },
});

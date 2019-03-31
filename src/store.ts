import Vue from 'vue';
import Vuex from 'vuex';
import { ADD_SESSION } from '@/types/MutationTypes';
import { UPDATE_SESSION_PLAYERS, CREATE, UPDATE } from '@/types/ActionTypes';
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
      return (sessionId: string) => new Map<string, Encounter>(
        [...state.encounters]
        .filter(([_, e]) => e.sessionId === sessionId)
        .sort(([_, a], [__, b]) => a.level - b.level),
      );
    },
    encounter(state) {
      return (encounterId: string) => state.encounters.get(encounterId);
    },
    creatures(state) {
      return (encounterId: string) => new Map<string, Creature>(
        [...state.creatures]
        .filter(([, c]) => c.encounterId === encounterId),
      );
    },
    creature(state) {
      return (creatureId: string) => state.creatures.get(creatureId);
    },
    dungeon(state) {
      return (dungeonId: string) => state.dungeons.get(dungeonId);
    },
    npcs(state) {
      return state.npcs;
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
    async [CREATE]({}, payload) {
      const conn = db.collection(payload.constructor.collectionName);
      const ref: any = await conn.add({...payload});
      return ref.id;
    },
    async [UPDATE]({}, { collectionName, id, updates }) {
      await db.collection(collectionName).doc(id).update(updates);
    },
    async [UPDATE_SESSION_PLAYERS]({}, {sessionId, playerIds}) {
      await db.collection('sessions').doc(sessionId).update({ playerIds });
    },
  },
});

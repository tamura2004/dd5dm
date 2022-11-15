import Vue from 'vue';
import Vuex from 'vuex';
import * as MUTATION from '@/types/MutationTypes';
import * as ACTION from '@/types/ActionTypes';
import { db } from '@/plugins/firebase';
import State from '@/models/State';
import Session from '@/models/Session';
import Encounter from '@/models/Encounter';
import Creature from '@/models/Creature';
import Player from '@/models/Player';
import firebase from 'firebase/app';
import 'firebase/storage';
import Feat from './models/Feat';
import { expToLevel} from '@/data/EXP';

Vue.use(Vuex);

export default new Vuex.Store({
  state: new State(),
  getters: {
    level(state) {
      return (playerId: string) => {
        const player = state.players.get(playerId);
        if (player !== undefined) {
          const guild = state.guilds.get(player.guildId);
          if (guild !== undefined) {
            return expToLevel(guild.exp);
          }
        }
      };
    },
    guild(state) {
      return (guildId: string) => state.guilds.get(guildId);
    },
    session(state) {
      return (sessionId: string) => state.sessions.get(sessionId);
    },
    sessions(state) {
      return (dungeonId: string) => new Map<string, Session>(
        [...state.sessions]
        .filter(([_, s]) => s.dungeonId === dungeonId || !dungeonId),
      );
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
    players(state) {
      return (sessionId: string) => {
        const session = state.sessions.get(sessionId);
        if (session === undefined) {
          return new Map<string, Player>();
        } else {
          return new Map<string, Player>(
            [...state.players]
            .filter(([playerId]) => session.playerIds.includes(playerId)),
          );
        }
      };
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
    spells(state) {
      return state.spells;
    },
    spell(state) {
      return (spellId: string) => state.spells.get(spellId);
    },
    player(state) {
      return (playerId: string) => state.players.get(playerId);
    },
    feats(state) {
      return (playerId: string) =>
        [...state.feats].filter(([, feat]) => feat.playerId === playerId);
    },
    feat(state) {
      return (featId: string) => state.feats.get(featId);
    },
  },
  mutations: {
    [MUTATION.ADD_SESSION](state, { sessionId, session }) {
      Vue.set(state.sessions, sessionId, new Session(session));
    },
    set(state, { name, collection }) {
      Vue.set(state, name, collection);
    },
    [MUTATION.SET_WAIT](state, payload) {
      state.wait = payload;
    },
  },
  actions: {
    async [ACTION.CREATE]({}, payload) {
      const conn = db.collection(payload.constructor.collectionName);
      const ref: any = await conn.add({...payload});
      return ref.id;
    },
    async [ACTION.UPDATE]({}, { collectionName, id, updates }) {
      await db.collection(collectionName).doc(id).update(updates);
    },
    async [ACTION.UPDATE_SESSION_PLAYERS]({}, {sessionId, playerIds}) {
      await db.collection('sessions').doc(sessionId).update({ playerIds });
    },
    async [ACTION.DELETE]({}, { collectionName, id }) {
      await db.collection(collectionName).doc(id).delete();
    },
    async [ACTION.DELETE_IMAGE]({}, { id }) {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${id}.png`);
      await imageRef.delete();
    },
    async [ACTION.PUT_IMAGE]({}, { id, blob }) {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${id}.png`);
      await imageRef.put(blob);
    },
    [ACTION.TO_BLOB]({ }, { canvas }) {
      return new Promise((resolve, reject) => {
        canvas.toBlob((blob: any) => {
          if (blob === null) {
            alert('画像を選択して下さい');
            reject('画像がありません');
          } else {
            resolve(blob);
          }
        });
      });
    },
    async [ACTION.WAIT]({ commit }, cb) {
      try {
        commit(MUTATION.SET_WAIT, true);
        await cb();
      } catch (err) {
        alert(err);
      } finally {
        commit(MUTATION.SET_WAIT, false);
      }
    },
    async [ACTION.SIGNIN]({}, { email, password }) {
      await firebase.auth().signInWithEmailAndPassword(
        email,
        password,
      );
    },
    async [ACTION.SIGNUP]({}, { email, password }) {
      await firebase.auth().createUserWithEmailAndPassword(
        email,
        password,
      );
    },
    async [ACTION.CREATE_FEAT]({ dispatch }, { playerId, name }) {
      await dispatch(ACTION.CREATE, new Feat({
        playerId,
        name,
        num: 1,
      }));
    },
  },
});

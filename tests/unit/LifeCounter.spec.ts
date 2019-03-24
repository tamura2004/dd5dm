import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount } from '@vue/test-utils';
import MonsterList from '@/components/MonsterList.vue';
import { MODE } from '@/data/ENCOUNTER_DATA';
import MONSTERS from '@/data/MONSTERS';

describe('MonsterList', () => {
  let wrapper: any = null;

  beforeEach(() => {
    Vue.use(Vuetify);
    const monster = MONSTERS[1];
    monster.mode = MODE.EASY;
    wrapper = mount(MonsterList, { propsData: { monster }});
  });

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('is render monster name', () => {
    expect(wrapper.text()).toMatch('アウェイクンド・ツリー');
  });

  it('is render mode label', () => {
    expect(wrapper.text()).toMatch('簡単');
  });
});

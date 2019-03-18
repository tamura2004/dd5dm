import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount } from '@vue/test-utils';
import EncounterTile from '@/components/EncounterTile.vue';
import { MODE } from '@/data/ENCOUNTER_DATA';
import { MONSTERS } from '@/data/MONSTERS';
import Encounter from '@/models/Encounter';

describe('EncounterTile', () => {
  let wrapper: any = null;

  beforeEach(() => {
    Vue.use(Vuetify);
    const encounter = new Encounter({
      monsterId: 1,
      templateId: 1,
      monsterNum: 3,
      mode: MODE.EASY,
    });
    wrapper = mount(EncounterTile, { propsData: { encounter }});
  });

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('is render monster name', () => {
    expect(wrapper.text()).toMatch('スケルトン・アウェイクンド・ツリー');
  });

  it('is render monster ac', () => {
    expect(wrapper.text()).toMatch('AC: 15');
  });

  it('is render monster hp', () => {
    expect(wrapper.text()).toMatch('hp: 47');
  });

  it('is render monster exp', () => {
    expect(wrapper.text()).toMatch('exp:1350');
  });

  it('is render mode label', () => {
    expect(wrapper.text()).toMatch('簡単');
  });
});

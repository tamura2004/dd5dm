import Vue from 'vue';
import Vuetify from 'vuetify';
import { mount } from '@vue/test-utils';
import EncounterTile from '@/components/EncounterTile.vue';
import { MODE } from '@/data/ENCOUNTER_DATA';
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
    expect(wrapper.text()).toMatch('スケルトン・アウェイクンド・ツリー');
    expect(wrapper.text()).toMatch('AC: 15');
    expect(wrapper.text()).toMatch('hp: 47');
    expect(wrapper.text()).toMatch('exp:1350');
    expect(wrapper.text()).toMatch('簡単');
  });
});

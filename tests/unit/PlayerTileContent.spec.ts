import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import { mount } from '@vue/test-utils';
import PlayerTileContent from '@/components/PlayerTileContent.vue';

describe('PlayerTileContent', () => {
  let wrapper: any = null;

  beforeEach(() => {
    Vue.use(Vuetify);
    Vue.use(Vuex);
    const store = new Vuex.Store({
      state: {
        players: new Map([[
          'abc',
          {
            hp: 100,
          },
        ]]),
      },
    });
    wrapper = mount(PlayerTileContent, {
      store,
      propsData: {
        id: 'abc',
      },
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Tenkey from '@/components/Tenkey.vue';
import { mount } from '@vue/test-utils';

describe('Tenkey', () => {
  Vue.use(Vuetify);
  Vue.use(Vuex);
  const store = new Vuex.Store({
    state: {
      creatures: new Map([[
        'abc',
        {
          hp: 100,
        },
      ]]),
    },
  });
  const wrapper = mount(Tenkey, {
    store,
    propsData: {
      collectionName: 'creatures',
      id: 'abc',
      field: 'hp',
      title: 'ヒットポイント',
    }
  });

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

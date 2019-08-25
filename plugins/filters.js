import Vue from "vue";
import { toLevel } from "~/assets/ts/data/exp";

export default function({ store }) {
  const player = id => store.getters["players/player"](id);
  const guild = player =>
    player.guildId && store.getters["guilds/guild"](player.guildId);
  const level = guild => guild && guild.exp && toLevel(guild.exp);

  Vue.filter("player", player);
  Vue.filter("guild", guild);
  Vue.filter("level", level);
}

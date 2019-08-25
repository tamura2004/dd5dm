export default function({ store }, inject) {
  const setTitle = title => store.dispatch("nav/title", title);
  inject("title", setTitle);
}

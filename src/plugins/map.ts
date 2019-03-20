interface Map<K, V> {
  take(key: K): V;
}

Map.prototype.take = function(key) {
  const v = this.get(key);
  if (v === undefined) {
    throw true;
  }
  return this.get(key);
};

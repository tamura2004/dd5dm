interface Map<K, V> {
  take(key: K): V;
}

Map.prototype.take = function(key) {
  const v = this.get(key);
  if (v === undefined) {
    throw new Error(`bad key for ${[...this.values()]}: ${key}`);
  }
  return this.get(key);
};

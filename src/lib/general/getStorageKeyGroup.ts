export function getStorageKeyGroup<GROUP extends string>(
  group: GROUP,
): <KEY extends string>(key: KEY) => `kali:${GROUP}:${KEY}` {
  return (key) => `kali:${group}:${key}`
}

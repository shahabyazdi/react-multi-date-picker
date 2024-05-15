export default function findNode(target, selector, all) {
  if (!target) return;

  const calendar = findCalendar(target);

  return all
    ? Array.from(calendar.querySelectorAll(selector))
    : calendar.querySelector(selector);
}

export function findCalendar(node) {
  return node.closest(".rmdp-calendar");
}

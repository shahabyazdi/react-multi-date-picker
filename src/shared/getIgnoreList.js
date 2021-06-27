export default function getIgnoreList(formattingIgnoreList) {
  if (!Array.isArray(formattingIgnoreList)) formattingIgnoreList = [];

  return JSON.stringify(formattingIgnoreList);
}

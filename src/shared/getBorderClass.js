export default function getBorderClass(position, nodes) {
  let classNames = [];

  if (["left", "right"].includes(position)) {
    if (nodes.left) classNames.push("rmdp-border-left");
    if (nodes.right) classNames.push("rmdp-border-right");
  } else {
    if (nodes.top) classNames.push("rmdp-border-top");
    if (nodes.bottom) classNames.push("rmdp-border-bottom");
  }

  return classNames.join(" ");
}

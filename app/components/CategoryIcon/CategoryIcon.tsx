import React from "react";
import { IconsList } from "./iconsList";

interface CategoryIconProps {
  id: number,
  size?: number,
}

const CategoryIcon = ({ id, size }: CategoryIconProps) => {
  const icon = IconsList.find((icon) => icon.id === id);
  const IconWithSize = (icon: JSX.Element, size: number) => {
    return React.cloneElement(icon, { size });
  };

  if (icon) {
    if (size) return IconWithSize(icon.icon, size);
    else return icon.icon;
  }
  return null;
};

export default CategoryIcon;

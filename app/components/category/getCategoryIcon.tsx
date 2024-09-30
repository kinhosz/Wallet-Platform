import { IconsList } from "./iconsList";

export default function getCategoryIcon(id: number) {
    const categoryIcon = IconsList.find((icon) => icon.id === id);
    return categoryIcon ? categoryIcon.icon : null;
}

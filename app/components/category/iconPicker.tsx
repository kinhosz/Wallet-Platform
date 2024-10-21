import { useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IconsList } from "./iconsList";

interface IconPickerProps {
    selected: number;
    handleSelection: (icon: number) => void;
}

export default function IconPicker({ selected, handleSelection }: IconPickerProps) {
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [isAtStart, setIsAtStart] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = (shift: number) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: shift, behavior: 'smooth' });
            const container = scrollContainerRef.current;
            const maxScrollLeft = container.scrollWidth - container.clientWidth;

            if (shift < 0) {
                setIsAtEnd(false);
                setIsAtStart(container.scrollLeft <= 200);
            }
            else {
                setIsAtStart(false);
                setIsAtEnd(container.scrollLeft >= maxScrollLeft - 200);
            }
        }
    }

    return (
        <div className="relative p-4 max-w-64 overflow-hidden">
            { !isAtStart && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
                    <button onClick={() => handleScroll(-200)} className="p-2 bg-gray-300 rounded-full" type="button">
                        <FaArrowLeft />
                    </button>
                </div>
            )}
            <div ref={scrollContainerRef} className="flex gap-4 overflow-x-hidden scroll-smooth">
                {IconsList.map((icon) => (
                <button
                    key={icon.id}
                    onClick={() => handleSelection(icon.id)}
                    className={`cursor-pointer border-2 p-4 text-center transition-all hover:shadow-lg rounded-md ${
                        selected === icon.id ? 'border-orange-600' : 'border-transparent'
                    }`}
                >
                    <div className="text-lg">{icon.icon}</div>
                </button>
            ))}
            </div>
            { !isAtEnd && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
                    <button onClick={() => handleScroll(200)} className="p-2 bg-gray-300 rounded-full" type="button">
                        <FaArrowRight />
                    </button>
                </div>
            )}
        </div>
    );
}

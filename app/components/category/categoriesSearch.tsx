interface CategoriesListProps {
    title: string;
    onSelect: (title: string) => void;
}

function mockData() {
    return [
        { title: 'aaaaaaa' },
        { title: 'aaabbbb' },
        { title: 'abbbbbb' },
        { title: 'zzzzzzz' },
        { title: 'acccccc' },
        { title: 'bbbbaaa' },
        { title: 'bbbbbbb' },
        { title: 'djakdja' },
        { title: 'griunva' },
        { title: 'cknuaaw' },
        { title: 'fieneac' },
        { title: 'cianbei' },
        { title: 'ivfenia' },
        { title: 'vinriaa' },
    ]
}

export default function CategoriesSearch({ title, onSelect }: CategoriesListProps) {
    const data = mockData();
    const mapped_categories = data.filter((category) => {
        return category.title.toLowerCase().includes(title.toLowerCase());
    }).sort((c1, c2) => {
        if (c1.title < c2.title) return -1;
        else if(c1.title > c2.title) return 1;
        else return 0;
    });
    const isCategoryCreated = mapped_categories.some(c => c.title === title);

    return (
        <div className="bg-white text-sm rounded-xl drop-shadow-xl mt-2 max-h-28 overflow-y-auto">
            { title != '' && !isCategoryCreated && (
                <button className="p-1" onClick={() => onSelect(title)}>
                    Create: {title}
                </button>
            )}
            { mapped_categories.map((category, index) => (
                <button key={index} className="flex flex-row p-1" onClick={() => onSelect(category.title)}>
                    {category.title}
                </button>
            ))}
        </div>
    );
}

import Monetary from "../monetary";

interface Category {
    title: string;
    planned: number;
    real: number;
}

interface TableProps {
    categories: Category[];
}

export default function TableComponent({ categories }: TableProps) {
    return (
        <div className="p-4">
            {/* HEAD */}
            <div className="col-span-4 grid grid-cols-4 font-normal italic ">
                <span className="bg-red-200">Category</span>
                <span className="bg-red-200">Planned</span>
                <span className="bg-red-200">Real</span>
                <span className="bg-red-200">Difference</span>
            </div>
            {/* BODY */}
            { categories.map((item, index) => (
                <div key={index} className="col-span-4 grid grid-cols-4 gap-4 text-sm mt-2">
                    <div className="col-span-2 grid grid-cols-2 bg-wallet_gray rounded-full p-2">
                    <div className="col-span-1">{item.title}</div>
                    <div className="flex justify-between">
                        <Monetary value={item.planned}/>
                        <p className="mx-4 text-wallet_orange">&gt;</p>
                    </div>
                    </div>
                    <Monetary value={item.real} className="p-2"/>
                    <Monetary value={item.planned - item.real} className="p-2"/>
                </div>
            ))}
        </div>
    );
}

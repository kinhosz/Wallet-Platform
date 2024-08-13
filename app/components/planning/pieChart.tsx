import { Chart } from "react-google-charts";
import { Category } from "~/types/category";

interface PieChartProps {
    categories: Category[];
    className?: string;
}

const PieChart = ({ categories, className }: PieChartProps) => {
    const data = [
        ['Category', 'Value'],
        ...categories.map(category => [category.title, category.real])
    ];

    const options = {
        pieSliceText: 'none',
        pieStartAngle: 100,
        is3D: true,
        legend: { position: 'bottom', textStyle: { color: 'black' } },
        tooltip: { trigger: 'selection' },
        chartArea: { width: '80%', height: '80%' },
        slices: {
            0: { offset: 0 },
            1: { offset: 0 },
            2: { offset: 0 },
            3: { offset: 0 }
        },
    };

    return (
        <div className={className}>
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
            />
        </div>
    );
};

export default PieChart;

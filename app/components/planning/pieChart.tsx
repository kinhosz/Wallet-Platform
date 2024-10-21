import { Chart } from "react-google-charts";
import { PlanningLine } from "~/types/planning_line";

interface PieChartProps {
    planningLines: PlanningLine[];
    className?: string;
}

const PieChart = ({ planningLines, className }: PieChartProps) => {
    const data = [
        ['Category', 'Value'],
        ...planningLines.map(line => [line.category.name, line.real])
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

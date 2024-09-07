import { useQuery } from '@tanstack/react-query';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getTransactionsAPI } from '../../services/transactions/transactionService';

ChartJS.register(ArcElement, Tooltip, Legend);

const filters = {
    startDate: '',
    endDate: '',
    type: '',
    category: '',
};

const TransactionChart = () => {
    const { data: transactions } = useQuery({
        queryFn: () => getTransactionsAPI(filters),
        queryKey: ['list-transactions', filters],
    });

    // calculate total income and expense
    const totals = transactions?.reduce(
        (acc, transaction) => {
            if (transaction.type === 'income') {
                acc.income += transaction?.amount;
            } else {
                acc.expense += transaction?.amount;
            }
            return acc;
        },
        { income: 0, expense: 0 }
    );

    // date for chart
    const data = {
        labels: ['Income', 'Expense'],
        datasets: [
            {
                label: 'Transactions',
                data: [totals?.income, totals?.expense],
                backgroundColor: ['#36a2eb', '#ffcd56'],
                hoverOffset: 4,
            },
        ],
    };

    // chart options
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 25,
                    boxWidth: 12,
                    font: {
                        size: 14,
                    },
                },
            },
            title: {
                display: true,
                text: 'Income Vs Expense',
                font: {
                    size: 18,
                    width: 'bold',
                },
                padding: {
                    top: 18,
                    bottom: 30,
                },
            },
        },
        cutout: '70%',
    };

    return (
        <div className="col-md-12 mb-4">
            <h4>Transaction Overview</h4>
            <div style={{ height: '350px' }}>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default TransactionChart;

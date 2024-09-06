import { useQuery } from '@tanstack/react-query';
import { getTransactionsAPI } from '../../services/transactions/transactionService';
import { Link } from 'react-router-dom';
import { BsFillTrash3Fill, BsPencilSquare } from 'react-icons/bs';

const TransactionList = () => {
    const { data } = useQuery({
        queryFn: getTransactionsAPI,
        queryKey: ['filter-transaction'],
    });

    return (
        <div className="col-md-12">
            <h4>Transactions</h4>
            <div className="card">
                <div className="card-body">
                    {data?.map((transaction) => (
                        <div
                            className="card text-bg-light category-card mb-3"
                            key={transaction?._id}
                        >
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <span className="me-2">
                                        {transaction?.date
                                            ? new Date(
                                                  transaction?.date
                                              ).toLocaleDateString()
                                            : null}
                                    </span>
                                    <span
                                        className={`badge rounded-pill ${
                                            transaction?.type === 'income'
                                                ? 'text-bg-info'
                                                : 'text-bg-warning'
                                        }`}
                                    >
                                        {transaction?.type
                                            ?.charAt(0)
                                            .toUpperCase() +
                                            transaction?.type?.slice(1)}
                                    </span>
                                    <span className="ms-1 me-1"> - </span>
                                    <span>${transaction?.amount}</span>
                                    <span className="ms-2 fw-light fst-italic">
                                        {transaction?.description}
                                    </span>
                                </div>

                                <div>
                                    <Link
                                        className="btn btn-outline-primary btn-sm"
                                        to={`/update-category/${transaction?._id}`}
                                    >
                                        <BsPencilSquare />
                                    </Link>
                                    <button className=" ms-2 btn btn-sm btn-outline-danger">
                                        <BsFillTrash3Fill />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TransactionList;

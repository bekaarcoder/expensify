import { useQuery } from '@tanstack/react-query';
import { getTransactionsAPI } from '../../services/transactions/transactionService';
import { Link } from 'react-router-dom';
import { BsFillTrash3Fill, BsPencilSquare } from 'react-icons/bs';
import { listCategoriesAPI } from '../../services/category/categoryService';
import { ChangeEvent, useState } from 'react';

interface FilterState {
    startDate: string;
    endDate: string;
    type: string;
    category: string;
}

const TransactionList = () => {
    const [filters, setFilters] = useState<FilterState>({
        startDate: '',
        endDate: '',
        type: '',
        category: '',
    });

    const handleFilterChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const { data } = useQuery({
        queryFn: () => getTransactionsAPI(filters),
        queryKey: ['filter-transaction', filters],
    });

    const { data: categories } = useQuery({
        queryFn: listCategoriesAPI,
        queryKey: ['list-categories'],
    });

    return (
        <>
            <div className="col-md-12 mb-4">
                <h6>Filter Transactions</h6>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="startDate"
                                    name="startDate"
                                    value={filters.startDate}
                                    onChange={handleFilterChange}
                                    placeholder="Start Date"
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="date"
                                    className="form-control"
                                    id="endDate"
                                    name="endDate"
                                    value={filters.endDate}
                                    onChange={handleFilterChange}
                                    placeholder="End Date"
                                />
                            </div>
                            <div className="col">
                                <select
                                    name="type"
                                    id="type"
                                    className="form-select"
                                    value={filters.type}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">All Types</option>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>
                            <div className="col">
                                <select
                                    name="category"
                                    id="category"
                                    value={filters.category}
                                    onChange={handleFilterChange}
                                    className="form-select"
                                >
                                    <option value="All">All Categories</option>
                                    <option value="Uncategorized">
                                        Uncategorized
                                    </option>
                                    {categories?.map((category) => (
                                        <option
                                            value={category?.name}
                                            key={category?._id}
                                        >
                                            {category?.name
                                                ?.charAt(0)
                                                .toUpperCase() +
                                                category?.name?.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        </>
    );
};

export default TransactionList;

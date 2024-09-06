import TransactionList from '../Transaction/TransactionList';

const Dashboard = () => {
    return (
        <div className="container">
            <div className="row my-5">
                <h3 className="mb-5">Dashboard</h3>
                <TransactionList />
            </div>
        </div>
    );
};

export default Dashboard;

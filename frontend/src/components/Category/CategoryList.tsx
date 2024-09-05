import { useMutation, useQuery } from '@tanstack/react-query';
import { BsFillTrash3Fill, BsPencilSquare } from 'react-icons/bs';
import {
    deleteCategoryAPI,
    listCategoriesAPI,
} from '../../services/category/categoryService';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const CategoryList = () => {
    const { data, isError, isLoading, refetch } = useQuery({
        queryFn: listCategoriesAPI,
        queryKey: ['list-categories'],
    });

    const { mutateAsync } = useMutation({
        mutationFn: deleteCategoryAPI,
        mutationKey: ['delete-category'],
    });

    const handleDelete = (id: string) => {
        mutateAsync(id)
            .then(() => {
                refetch();
                toast.success('Category deleted successfully');
            })
            .catch((e) => {
                console.log('Error', e);
            });
    };

    return (
        <div className="container">
            <div className="row my-5 justify-content-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center mb-3">Categories</h3>
                            {isLoading && (
                                <p className="text-center">
                                    Loading categories...
                                </p>
                            )}
                            {isError && (
                                <p className="text-center text-danger">
                                    Some error occurred while fetching
                                    categories
                                </p>
                            )}
                            {data?.map((category) => (
                                <div
                                    className="card text-bg-light category-card mb-3"
                                    key={category?._id}
                                >
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <span className="me-2">
                                                {category?.name
                                                    ?.charAt(0)
                                                    .toUpperCase() +
                                                    category?.name?.slice(1)}
                                            </span>
                                            <span
                                                className={`badge rounded-pill ${
                                                    category?.type === 'income'
                                                        ? 'text-bg-info'
                                                        : 'text-bg-warning'
                                                }`}
                                            >
                                                {category?.type
                                                    ?.charAt(0)
                                                    .toUpperCase() +
                                                    category?.type?.slice(1)}
                                            </span>
                                        </div>

                                        <div>
                                            <Link
                                                className="btn btn-outline-primary btn-sm"
                                                to={`/update-category/${category?._id}`}
                                            >
                                                <BsPencilSquare />
                                            </Link>
                                            <button
                                                className=" ms-2 btn btn-sm btn-outline-danger"
                                                onClick={() =>
                                                    handleDelete(category?._id)
                                                }
                                            >
                                                <BsFillTrash3Fill />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;

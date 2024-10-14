import React from 'react';
import { Typography, Spinner, Card, CardBody, CardFooter, Button } from "@material-tailwind/react";
import { Post, Category, PostQueryParams, usePosts, useCategories } from '@fintechain-monorepo/wordpress-data';

interface PostListProps {
  queryParams?: PostQueryParams;
  onPostClick?: (postId: number) => void;
}

/**
 * PostList component displays a list of WordPress posts
 * @param {PostListProps} props - The props for the PostList component
 * @returns {React.FC} A React functional component
 */
export const PostList: React.FC<PostListProps> = ({ queryParams = { per_page: 10 }, onPostClick }) => {
  const { posts, isLoading: postsLoading, error: postsError, totalPages, fetchPosts } = usePosts();

  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    fetchPosts({ ...queryParams, page: currentPage });
  }, [fetchPosts, queryParams, currentPage]);

  if (postsLoading ) return <Spinner className="m-auto" />;
  if (postsError) return <div className="text-red-500">Error: {postsError}</div>;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h2" className="mb-4">Latest Posts</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts?.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardBody>
              <Typography variant="h5" className="mb-2">{post.title.rendered}</Typography>
              <Typography className="text-gray-600 mb-2">
                {new Date(post.date).toLocaleDateString()}
              </Typography>
              
              <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} className="text-gray-700" />
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                size="sm"
                variant="text"
                className="flex items-center gap-2"
                onClick={() => onPostClick && onPostClick(post.id)}
              >
                Read More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2"
          >
            Previous
          </Button>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default React.memo(PostList);
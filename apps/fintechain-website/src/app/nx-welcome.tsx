
// ... other imports follow
import { DataService, usePageData } from "@fintechain-monorepo/shared-data";
import { TYPES } from "./container";
import { useInjection } from "inversify-react";
import { Post } from "@fintechain-monorepo/wordpress-data";

export function NxWelcome({ title }: { title: string }) {
    const wordpressService = useInjection<DataService<Post>>(TYPES.WordPressDataService);
    
    /* const { data: posts, loading, error } = useData<Post>({
        service: wordpressService,
        params: {
            page: 1,
            limit: 10,
            filter: {
                status: 'publish',
                categories: '1,2'
            }
        }
    }); */

    const { page, loading, error } = usePageData("about-page");

    if (loading) return <div>Loading posts...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!page) return <div>No posts found</div>;

    return (
        <div>
            {/* {posts.map(post => (
                <article key={post.id}>
                    <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                    {post._embedded?.['wp:featuredmedia']?.[0] && (
                        <img 
                            src={post._embedded['wp:featuredmedia'][0].source_url}
                            alt={post._embedded['wp:featuredmedia'][0].alt_text}
                        />
                    )}
                    <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                </article>
            ))} */}
        </div>
    );
}

export default NxWelcome;

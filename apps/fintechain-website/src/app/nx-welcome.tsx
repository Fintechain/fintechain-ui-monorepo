import "reflect-metadata";
// ... other imports follow
import { DataService, PageData, useData } from "@fintechain-monorepo/page-architect";
import { container, TYPES } from "./container";
import { useInjection } from "inversify-react";
import { Post } from "@fintechain-monorepo/wordpress-data";

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 This is a starter component and can be deleted.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 Delete this file and get started with your project!
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
export function NxWelcome({ title }: { title: string }) {
    const wordpressService = useInjection<DataService<Post>>(TYPES.WordPressService);
    
    const { data: posts, loading, error } = useData<Post>({
        service: wordpressService,
        params: {
            page: 1,
            limit: 10,
            filter: {
                status: 'publish',
                categories: '1,2'
            }
        }
    });

    if (loading) return <div>Loading posts...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!posts || !Array.isArray(posts)) return <div>No posts found</div>;

    return (
        <div>
            {posts.map(post => (
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
            ))}
        </div>
    );
}

export default NxWelcome;

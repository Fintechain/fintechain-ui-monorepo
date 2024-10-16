import { PageHeaderSection, UiSection } from "@fintechain-monorepo/shared-ui";
import PostList from "../../containers/post-list/post-list";



export function PostListView() {
    const featuredImageUrl = undefined
    return (
        <>

            <PageHeaderSection
                title="Beyond the Ledger"
                subtitle="Exploring the convergence of finance, technology, and human values in the age of blockchain"
            />
            <UiSection
                backgroundType="color"
                backgroundValue="bg-white"
                className="lg:py-20 py-10 px-8 text-neutral-neutral"
                contentClassName=""
            >

                <PostList />
            </UiSection>

        </>
    );
}

export default PostListView;

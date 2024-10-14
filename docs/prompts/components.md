# WordPress Component Generation Prompt

Create a React component for [COMPONENT_NAME] that interacts with WordPress data:

1. Use TypeScript for type safety.
2. Import necessary types from the shared types file.
3. Utilize the appropriate custom hooks from the WordPress data library for data fetching.
4. Implement error handling and loading states based on the data fetching status.
5. Use Tailwind CSS for styling, focusing on responsive design.
6. Incorporate Material Tailwind React components where appropriate.
7. Ensure proper accessibility (ARIA attributes, keyboard navigation).
8. Optimize performance using React.memo() if applicable.
9. Include JSDoc comments for documentation.

Example structure:

```typescript
import React from 'react';
import { Typography, Spinner } from "@material-tailwind/react";
import { usePost, useCategories } from '@myorg/shared/wordpress/data';
import { Post, Category } from '@myorg/shared/types';

interface [COMPONENT_NAME]Props {
  postId: number;
}

export const [COMPONENT_NAME]: React.FC<[COMPONENT_NAME]Props> = ({ postId }) => {
  const { post, isLoading: postLoading, error: postError } = usePost(postId);
  const { categories, isLoading: categoriesLoading } = useCategories();

  if (postLoading || categoriesLoading) return <Spinner />;
  if (postError) return <div>Error: {postError.message}</div>;

  return (
    <article className="container mx-auto p-4">
      <Typography variant="h1">{post.title.rendered}</Typography>
      {/* Render other post details */}
    </article>
  );
};

export default React.memo([COMPONENT_NAME]);
```

Key considerations:
- Use appropriate data fetching hooks (e.g., usePost, usePages, useCategories).
- Handle loading and error states returned by the custom hooks.
- Implement proper TypeScript typing for all props and data.
- Ensure the component is reusable and follows single responsibility principle.
- Consider implementing subcomponents for complex layouts.

Please provide any additional requirements or specific WordPress data this component should display or interact with.
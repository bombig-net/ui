import type { Meta, StoryObj } from '@storybook/react';

import { Comment, CommentAction, CommentActions, CommentGroup, CommentMetadata } from './comments';

const meta: Meta<typeof Comment> = {
    title: 'Components/Comments',
    component: Comment,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Comment>;

export const Default: Story = {
    args: {
        author: 'John Doe',
        avatarUrl: 'https://i.pravatar.cc/150?u=john',
        children: 'This is a comment with some text content.',
    },
};

export const WithMetadata: Story = {
    args: {
        author: 'Jane Smith',
        avatarUrl: 'https://i.pravatar.cc/150?u=jane',
        metadata: <CommentMetadata>2 days ago</CommentMetadata>,
        children: 'A comment with metadata showing when it was posted.',
    },
};

export const WithActions: Story = {
    args: {
        author: 'Bob Wilson',
        avatarUrl: 'https://i.pravatar.cc/150?u=bob',
        metadata: <CommentMetadata>1 hour ago</CommentMetadata>,
        children: 'A comment with reply and like actions.',
        actions: (
            <CommentActions>
                <CommentAction onClick={() => {}}>Reply</CommentAction>
                <CommentAction onClick={() => {}}>Like</CommentAction>
            </CommentActions>
        ),
    },
};

export const Deleted: Story = {
    args: {
        author: 'Deleted User',
        isDeleted: true,
        children: 'This comment has been deleted.',
    },
};

export const ThreadedDiscussion: Story = {
    render: () => (
        <CommentGroup>
            <Comment
                author="Alice Johnson"
                avatarUrl="https://i.pravatar.cc/150?u=alice"
                metadata={<CommentMetadata>3 hours ago</CommentMetadata>}
            >
                The main comment in the thread.
            </Comment>
            <CommentGroup variant="threaded">
                <Comment
                    author="Bob Wilson"
                    avatarUrl="https://i.pravatar.cc/150?u=bob"
                    metadata={<CommentMetadata>2 hours ago</CommentMetadata>}
                >
                    A reply to Alice&apos;s comment.
                </Comment>
                <Comment
                    author="Charlie Brown"
                    avatarUrl="https://i.pravatar.cc/150?u=charlie"
                    metadata={<CommentMetadata>1 hour ago</CommentMetadata>}
                >
                    Another reply in the thread.
                </Comment>
            </CommentGroup>
        </CommentGroup>
    ),
};

export const NestedComments: Story = {
    render: () => (
        <CommentGroup>
            <Comment
                author="Parent User"
                avatarUrl="https://i.pravatar.cc/150?u=parent"
                metadata={<CommentMetadata>5 hours ago</CommentMetadata>}
            >
                The parent comment.
            </Comment>
            <CommentGroup variant="nested">
                <Comment
                    author="Child User"
                    avatarUrl="https://i.pravatar.cc/150?u=child"
                    metadata={<CommentMetadata>4 hours ago</CommentMetadata>}
                >
                    A nested reply to the parent comment.
                </Comment>
            </CommentGroup>
        </CommentGroup>
    ),
};

export const HighlightedComment: Story = {
    args: {
        author: 'Featured User',
        avatarUrl: 'https://i.pravatar.cc/150?u=featured',
        metadata: <CommentMetadata>Just now</CommentMetadata>,
        variant: 'highlight',
        children: 'This is a highlighted comment that stands out from others.',
    },
};

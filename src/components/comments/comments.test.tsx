import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Comment, CommentAction, CommentActions, CommentGroup, CommentMetadata } from './comments';

describe('Comment', () => {
    it('renders a basic comment with author and content', () => {
        render(<Comment author="John Doe">This is a test comment</Comment>);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('This is a test comment')).toBeInTheDocument();
    });

    it('renders avatar when avatarUrl is provided', () => {
        render(
            <Comment author="John Doe" avatarUrl="https://example.com/avatar.jpg">
                Comment with avatar
            </Comment>
        );

        const avatar = screen.getByAltText("John Doe's avatar");
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('renders metadata when provided', () => {
        render(
            <Comment author="John Doe" metadata={<CommentMetadata>2 hours ago</CommentMetadata>}>
                Comment with metadata
            </Comment>
        );

        expect(screen.getByText('2 hours ago')).toBeInTheDocument();
    });

    it('renders actions when provided', async () => {
        const handleReply = jest.fn();
        const handleLike = jest.fn();

        render(
            <Comment
                author="John Doe"
                actions={
                    <CommentActions>
                        <CommentAction onClick={handleReply}>Reply</CommentAction>
                        <CommentAction onClick={handleLike}>Like</CommentAction>
                    </CommentActions>
                }
            >
                Comment with actions
            </Comment>
        );

        const replyButton = screen.getByText('Reply');
        const likeButton = screen.getByText('Like');

        await userEvent.click(replyButton);
        await userEvent.click(likeButton);

        expect(handleReply).toHaveBeenCalledTimes(1);
        expect(handleLike).toHaveBeenCalledTimes(1);
    });

    it('renders deleted state correctly', () => {
        render(
            <Comment author="John Doe" isDeleted>
                This comment should not be visible
            </Comment>
        );

        expect(screen.getByText('This comment has been deleted.')).toBeInTheDocument();
        expect(screen.queryByText('This comment should not be visible')).not.toBeInTheDocument();
    });
});

describe('CommentGroup', () => {
    it('renders children when not collapsed', () => {
        render(
            <CommentGroup>
                <Comment author="User 1">Comment 1</Comment>
                <Comment author="User 2">Comment 2</Comment>
            </CommentGroup>
        );

        expect(screen.getByText('Comment 1')).toBeInTheDocument();
        expect(screen.getByText('Comment 2')).toBeInTheDocument();
    });

    it('does not render children when collapsed', () => {
        render(
            <CommentGroup collapsed>
                <Comment author="User 1">Comment 1</Comment>
                <Comment author="User 2">Comment 2</Comment>
            </CommentGroup>
        );

        expect(screen.queryByText('Comment 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Comment 2')).not.toBeInTheDocument();
    });

    it('applies threaded variant styles correctly', () => {
        const { container } = render(
            <CommentGroup variant="threaded">
                <Comment author="User 1">Comment 1</Comment>
            </CommentGroup>
        );

        const group = container.firstChild as HTMLElement;
        expect(group).toHaveClass('border-l-2', 'border-neutral-100', 'pl-6', 'ml-6');
    });

    it('applies nested variant styles correctly', () => {
        const { container } = render(
            <CommentGroup variant="nested">
                <Comment author="User 1">Comment 1</Comment>
            </CommentGroup>
        );

        const group = container.firstChild as HTMLElement;
        expect(group).toHaveClass('ml-12', 'mt-6');
    });
});

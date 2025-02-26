import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/button';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './dialog';

const meta = {
    title: 'Components/Dialog',
    component: Dialog,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        open: {
            control: 'boolean',
            description: 'Controlled open state',
        },
        defaultOpen: {
            control: 'boolean',
            description: 'Default open state (uncontrolled)',
        },
        onOpenChange: {
            action: 'onOpenChange',
            description: 'Event handler called when open state changes',
        },
        modal: {
            control: 'boolean',
            description: 'Whether to block interactions with other elements while open',
            defaultValue: true,
        },
    },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default dialog implementation with a title, description, and action buttons.
 */
export const Default: Story = {
    render: (args) => (
        <Dialog {...args}>
            <DialogTrigger asChild>
                <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Example Dialog</DialogTitle>
                    <DialogDescription>
                        This is a description of the dialog content. You can put any content here.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p>This is the main content area of the dialog.</p>
                </div>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
};

/**
 * A destructive dialog variant for dangerous actions like deletion.
 */
export const Destructive: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Delete Account</Button>
            </DialogTrigger>
            <DialogContent variant="destructive">
                <DialogHeader>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete your account? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="outline">Delete Account</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
};

/**
 * A controlled dialog example with async form submission.
 */
const ControlledDialog = () => {
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setOpen(false);
        }, 1000);
    };

    const handleCancel = () => setOpen(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="gap-4 grid py-4">
                        <div className="items-center gap-4 grid grid-cols-4">
                            <label htmlFor="name" className="font-serif text-right">
                                Name
                            </label>
                            <input
                                id="name"
                                className="col-span-3 bg-neutral-900 px-3 border border-yellow-500/20 rounded-none h-10 text-sm"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="items-center gap-4 grid grid-cols-4">
                            <label htmlFor="username" className="font-serif text-right">
                                Username
                            </label>
                            <input
                                id="username"
                                className="col-span-3 bg-neutral-900 px-3 border border-yellow-500/20 rounded-none h-10 text-sm"
                                placeholder="Enter your username"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" type="button" onPress={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" isDisabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export const Controlled: Story = {
    render: () => <ControlledDialog />,
};

/**
 * A dialog with scrollable content and custom portal container.
 */
const ScrollableDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Open Scrollable Dialog</Button>
            </DialogTrigger>
            <DialogContent scrollable>
                <DialogHeader>
                    <DialogTitle>Scrollable Content</DialogTitle>
                    <DialogDescription>
                        This dialog demonstrates scrollable content with a long list. The content
                        will scroll within the viewport while maintaining the dialog&apos;s
                        position.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="mb-4 p-4 border border-yellow-500/20 rounded-none">
                            <h3 className="mb-2 font-sans font-medium text-yellow-500">
                                Item {i + 1}
                            </h3>
                            <p className="font-serif text-neutral-300 text-sm">
                                This is a long content item that demonstrates scrolling behavior in
                                the dialog. The dialog will be centered in the viewport and the
                                overlay will scroll independently.
                            </p>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export const ScrollableContent: Story = {
    render: () => <ScrollableDialog />,
};

/**
 * A dialog with custom overlay variant.
 */
export const CustomOverlay: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Open With Opaque Overlay</Button>
            </DialogTrigger>
            <DialogContent overlayVariant="opaque">
                <DialogHeader>
                    <DialogTitle>Custom Overlay</DialogTitle>
                    <DialogDescription>
                        This dialog uses an opaque overlay without blur effect.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p className="font-serif">
                        The overlay is completely opaque without any blur effect.
                    </p>
                </div>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
};

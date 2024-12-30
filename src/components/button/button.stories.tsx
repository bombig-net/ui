import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        docs: {
            description: {
                component: `
A button component built on top of React Aria's Button component that provides a complete set of button behaviors and accessibility features.

### Features
- Full keyboard navigation support
- ARIA attributes automatically managed
- Focus management
- Press events and interactions
- Support for disabled state
- Three visual variants: default, cta, and outline
- Customizable styling through className

### Accessibility
- Follows WAI-ARIA Button pattern
- Proper focus handling and indication
- Keyboard interaction support
- Screen reader announcements
- Disabled state management

### Usage
\`\`\`tsx
import { Button } from '@bombig/ui'

function Example() {
    return (
        <Button 
            variant="cta"
            onPress={() => alert('Button pressed!')}
        >
            Press me
        </Button>
    )
}
\`\`\`

For more details about the underlying component, see the [React Aria Button documentation](https://react-spectrum.adobe.com/react-aria/Button.html).
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            description: 'The visual style variant of the button',
            control: 'select',
            options: ['default', 'cta', 'outline'],
        },
        children: {
            description: 'The content to display inside the button',
            control: 'text',
        },
        isDisabled: {
            description: 'Whether the button is disabled',
            control: 'boolean',
        },
        onPress: {
            description: 'Handler called when the press is released over the target',
            action: 'pressed',
        },
        onPressStart: {
            description: 'Handler called when a press interaction starts',
            action: 'pressStart',
        },
        onPressEnd: {
            description: 'Handler called when a press interaction ends',
            action: 'pressEnd',
        },
        onPressChange: {
            description: 'Handler called when the press state changes',
            action: 'pressChange',
        },
        onPressUp: {
            description: 'Handler called when a press is released over the target',
            action: 'pressUp',
        },
        preventFocusOnPress: {
            description: 'Whether to prevent focus when clicking with a mouse',
            control: 'boolean',
        },
        excludeFromTabOrder: {
            description: 'Whether to exclude the element from the tab order',
            control: 'boolean',
        },
        className: {
            description:
                "Additional CSS classes to apply to the button. Use this to customize the button's appearance.",
            control: 'text',
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: 'Default Button',
        variant: 'default',
    },
};

export const CTA: Story = {
    args: {
        children: 'CTA Button',
        variant: 'cta',
    },
};

export const Outline: Story = {
    args: {
        children: 'Outline Button',
        variant: 'outline',
    },
};

export const Disabled: Story = {
    args: {
        children: 'Cannot press',
        isDisabled: true,
    },
};

export const PreventFocus: Story = {
    args: {
        children: 'No focus on mouse click',
        preventFocusOnPress: true,
    },
};

export const ExcludeFromTabOrder: Story = {
    args: {
        children: 'Not in tab order',
        excludeFromTabOrder: true,
    },
};

export const WithPressHandlers: Story = {
    args: {
        children: 'Press handlers demo',
        onPress: undefined,
        onPressStart: undefined,
        onPressEnd: undefined,
        onPressChange: undefined,
        onPressUp: undefined,
    },
    parameters: {
        docs: {
            description: {
                story: 'All press handlers will be logged to the Actions tab in Storybook.',
            },
        },
    },
};

export const CustomStyling: Story = {
    args: {
        children: 'Custom styles',
        className: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-300',
    },
};

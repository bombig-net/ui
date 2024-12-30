import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumbs, Breadcrumb } from './breadcrumbs'
import { Link } from '../link/link'

const meta = {
    title: 'Components/Breadcrumbs',
    component: Breadcrumbs,
    parameters: {
        docs: {
            description: {
                component: `A Breadcrumbs component that provides accessible navigation. Based on React Aria's Breadcrumbs component.

Features:
- Support for both client-side and standard navigation
- Keyboard navigation support
- Proper ARIA labeling and semantics
- Follows WAI-ARIA Breadcrumb pattern for accessibility
- Current page indication with aria-current
- Semantic HTML structure (nav > ol > li)

[React Aria Breadcrumbs Documentation](https://react-spectrum.adobe.com/react-aria/Breadcrumbs.html)`
            }
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <Breadcrumbs>
            <Breadcrumb>
                <Link href="/">Home</Link>
            </Breadcrumb>
            <Breadcrumb>
                <Link href="/products">Products</Link>
            </Breadcrumb>
            <Breadcrumb>
                <Link href="/products/electronics">Electronics</Link>
            </Breadcrumb>
            <Breadcrumb>
                <Link variant="subtle" aria-current="page">Laptops</Link>
            </Breadcrumb>
        </Breadcrumbs>
    )
}

export const WithHomeIcon: Story = {
    render: () => (
        <Breadcrumbs>
            <Breadcrumb>
                <Link href="/" className="gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
                    </svg>
                    Home
                </Link>
            </Breadcrumb>
            <Breadcrumb>
                <Link href="/products">Products</Link>
            </Breadcrumb>
            <Breadcrumb>
                <Link href="/products/electronics">Electronics</Link>
            </Breadcrumb>
            <Breadcrumb>
                <Link variant="subtle" aria-current="page">Laptops</Link>
            </Breadcrumb>
        </Breadcrumbs>
    )
}

export const WithCustomSeparator: Story = {
    render: () => (
        <Breadcrumbs>
            <Breadcrumb className="after:content-['>']">
                <Link href="/">Home</Link>
            </Breadcrumb>
            <Breadcrumb className="after:content-['>']">
                <Link href="/products">Products</Link>
            </Breadcrumb>
            <Breadcrumb className="after:content-['>']">
                <Link href="/products/electronics">Electronics</Link>
            </Breadcrumb>
            <Breadcrumb>
                <Link variant="subtle" aria-current="page">Laptops</Link>
            </Breadcrumb>
        </Breadcrumbs>
    )
} 
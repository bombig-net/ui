interface DesignToken {
    value: string | { [key: string]: string };
    type: string;
    description?: string;
}

interface TokenSet {
    global: {
        [key: string]: DesignToken;
    };
    $themes: unknown[];
    $metadata: {
        tokenSetOrder: string[];
    };
}

type TokensByType = Record<string, Record<string, DesignToken['value']>>;

// Helper function to resolve token references
function resolveTokenValue(
    value: string | { [key: string]: string },
    tokenSet: TokenSet
): string | { [key: string]: string } {
    if (typeof value === 'string') {
        // Check if this is a token reference like "{tracking-tighter}"
        const tokenRefMatch = value.match(/^\{([^}]+)\}$/);
        if (tokenRefMatch && tokenRefMatch[1]) {
            const tokenName = tokenRefMatch[1];
            // Find the referenced token in the tokenSet
            const referencedToken = tokenSet.global[tokenName];
            if (referencedToken && referencedToken.value) {
                // Recursively resolve the referenced token's value
                return resolveTokenValue(referencedToken.value, tokenSet);
            }
        }
        return value;
    }

    // For object values (like typography), resolve each property recursively
    const resolved: { [key: string]: string } = {};
    for (const [key, propValue] of Object.entries(value)) {
        if (typeof propValue === 'string') {
            resolved[key] = resolveTokenValue(propValue, tokenSet) as string;
        } else {
            resolved[key] = String(propValue);
        }
    }
    return resolved;
}

export function groupTokensByType(tokenSet: TokenSet): TokensByType {
    const result: TokensByType = {};

    Object.entries(tokenSet.global).forEach(([key, token]) => {
        (result[token.type] ??= {})[key] = resolveTokenValue(token.value, tokenSet);
    });

    return result;
}

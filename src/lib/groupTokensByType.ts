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

export function groupTokensByType(tokenSet: TokenSet) {
    const result: { [key: string]: { [key: string]: DesignToken['value'] } } = {};

    Object.entries(tokenSet.global).forEach(([key, token]) => {
        if (!result[token.type]) {
            result[token.type] = {};
        }
        result[token.type][key] = token.value;
    });

    return result;
} 
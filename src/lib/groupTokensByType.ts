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

export function groupTokensByType(tokenSet: TokenSet): TokensByType {
    const result: TokensByType = {};

    Object.entries(tokenSet.global).forEach(([key, token]) => {
        (result[token.type] ??= {})[key] = token.value;
    });

    return result;
}

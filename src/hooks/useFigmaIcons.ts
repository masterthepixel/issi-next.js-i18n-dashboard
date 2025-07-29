import { useEffect, useState } from 'react';

interface FigmaApiConfig {
    accessToken: string;
    fileId: string;
    nodeIds?: string[];
}

interface FigmaNode {
    id: string;
    name: string;
    type: string;
    absoluteBoundingBox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}

interface FigmaApiResponse {
    document: {
        children: FigmaNode[];
    };
    components: Record<string, any>;
    componentSets: Record<string, any>;
    schemaVersion: number;
    styles: Record<string, any>;
}

/**
 * Hook to fetch icons from Figma API
 * Useful for dynamic icon loading and updates
 */
export function useFigmaIcons(config: FigmaApiConfig) {
    const [icons, setIcons] = useState<FigmaNode[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIcons = async () => {
            if (!config.accessToken || !config.fileId) {
                setError('Missing Figma access token or file ID');
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const url = `https://api.figma.com/v1/files/${config.fileId}`;
                const response = await fetch(url, {
                    headers: {
                        'X-Figma-Token': config.accessToken,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Figma API error: ${response.status}`);
                }

                const data: FigmaApiResponse = await response.json();

                // Extract icon nodes (you may need to adjust this based on your Figma structure)
                const iconNodes = extractIconNodes(data.document.children);
                setIcons(iconNodes);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch icons');
            } finally {
                setLoading(false);
            }
        };

        fetchIcons();
    }, [config.accessToken, config.fileId]);

    return { icons, loading, error };
}

/**
 * Extract icon nodes from Figma document structure
 * Customize this function based on how your icons are organized in Figma
 */
function extractIconNodes(children: FigmaNode[]): FigmaNode[] {
    const icons: FigmaNode[] = [];

    function traverse(nodes: FigmaNode[]) {
        for (const node of nodes) {
            // Adjust this logic based on your Figma structure
            // For example, you might look for specific frame names or types
            if (node.type === 'COMPONENT' || node.name?.toLowerCase().includes('icon')) {
                icons.push(node);
            }

            // Recursively search in children
            if ('children' in node && Array.isArray((node as any).children)) {
                traverse((node as any).children);
            }
        }
    }

    traverse(children);
    return icons;
}

/**
 * Fetch SVG exports for specific nodes
 */
export async function fetchFigmaSvgExports(
    fileId: string,
    nodeIds: string[],
    accessToken: string
) {
    const idsParam = nodeIds.join(',');
    const url = `https://api.figma.com/v1/images/${fileId}?ids=${idsParam}&format=svg`;

    const response = await fetch(url, {
        headers: {
            'X-Figma-Token': accessToken,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch SVG exports: ${response.status}`);
    }

    return response.json();
}

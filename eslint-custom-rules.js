// Custom ESLint plugin for JSON validation and structured data
const plugin = {
    rules: {
        'validate-json-stringify': {
            meta: {
                type: 'problem',
                docs: {
                    description: 'Validate JSON.stringify calls to prevent syntax errors',
                    category: 'Possible Errors'
                },
                fixable: null,
                schema: []
            },
            create(context) {
                return {
                    CallExpression(node) {
                        // Check for JSON.stringify calls
                        if (
                            node.callee.type === 'MemberExpression' &&
                            node.callee.object.name === 'JSON' &&
                            node.callee.property.name === 'stringify'
                        ) {
                            const argument = node.arguments[0];

                            // Check if the argument contains potential problematic characters
                            if (argument && argument.type === 'ObjectExpression') {
                                checkObjectForProblematicValues(argument, context);
                            } else if (argument && argument.type === 'ArrayExpression') {
                                argument.elements.forEach(element => {
                                    if (element && element.type === 'ObjectExpression') {
                                        checkObjectForProblematicValues(element, context);
                                    }
                                });
                            }
                        }
                    }
                };

                function checkObjectForProblematicValues(objectNode, context) {
                    objectNode.properties.forEach(property => {
                        if (property.type === 'Property' && property.value) {
                            // Check for string values with potential issues
                            if (property.value.type === 'Literal' && typeof property.value.value === 'string') {
                                const value = property.value.value;

                                // Check for unescaped characters that might cause JSON issues
                                if (value.includes('#') && property.key.name === 'streetAddress') {
                                    context.report({
                                        node: property.value,
                                        message: 'Street address contains "#" character which may cause JSON parsing issues. Consider using "Suite" instead.'
                                    });
                                }

                                // Check for other problematic characters
                                if (value.includes('\n') || value.includes('\r') || value.includes('\t')) {
                                    context.report({
                                        node: property.value,
                                        message: 'String contains unescaped whitespace characters that may cause JSON parsing issues.'
                                    });
                                }

                                // Check for unescaped quotes
                                if ((value.includes('"') && !value.includes('\\"')) ||
                                    (value.includes("'") && !value.includes("\\'"))) {
                                    context.report({
                                        node: property.value,
                                        message: 'String contains unescaped quotes that may cause JSON parsing issues.'
                                    });
                                }
                            }

                            // Recursively check nested objects
                            if (property.value.type === 'ObjectExpression') {
                                checkObjectForProblematicValues(property.value, context);
                            }
                        }
                    });
                }
            }
        },

        'structured-data-validation': {
            meta: {
                type: 'suggestion',
                docs: {
                    description: 'Validate structured data schema objects',
                    category: 'Best Practices'
                },
                fixable: null,
                schema: []
            },
            create(context) {
                return {
                    VariableDeclarator(node) {
                        // Check for schema variables
                        if (node.id.name && node.id.name.includes('Schema') && node.init) {
                            if (node.init.type === 'ObjectExpression') {
                                validateSchemaObject(node.init, context);
                            }
                        }
                    }
                };

                function validateSchemaObject(objectNode, context) {
                    const properties = objectNode.properties;
                    let hasContext = false;
                    let hasType = false;

                    properties.forEach(property => {
                        if (property.key && property.key.value === '@context') {
                            hasContext = true;
                        }
                        if (property.key && property.key.value === '@type') {
                            hasType = true;
                        }
                    });

                    if (!hasContext) {
                        context.report({
                            node: objectNode,
                            message: 'Structured data schema missing required "@context" property.'
                        });
                    }

                    if (!hasType) {
                        context.report({
                            node: objectNode,
                            message: 'Structured data schema missing required "@type" property.'
                        });
                    }
                }
            }
        }
    }
};

module.exports = plugin;

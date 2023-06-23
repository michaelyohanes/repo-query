import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { autocomplete, AutocompleteOptions } from '@algolia/autocomplete-js';


const Autocomplete = (props: AutocompleteOptions<any>) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const panelRootRef = useRef<Root | null>(null);
    const rootRef = useRef<HTMLElement | null>(null);


    useEffect(() => {
        if (!containerRef.current) {
            return undefined;
        }

        const search = autocomplete({
            renderer: { createElement, Fragment, render: () => { } },
            render({ children }, root) {
                if (!panelRootRef.current || rootRef.current !== root) {
                    rootRef.current = root;

                    panelRootRef.current?.unmount();
                    panelRootRef.current = createRoot(root);
                }

                panelRootRef.current.render(children);
            },
            onStateChange({ state }) {
                const { isOpen, collections } = state;

                if (collections && collections.length) {
                    const { items } = collections[0];

                    if (!isOpen && items.length > 0) {
                        state.isOpen = true;
                    };
                }
            },
            ...props,
        });

        return () => {
            search.destroy();
        };
    }, [props]);

    return <div ref={containerRef} />;
}

export default Autocomplete;
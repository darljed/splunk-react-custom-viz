/*
 * Visualization source: This file defines a Splunk custom visualization that leverages React for rendering.
 *
 */
define([
            'jquery',
            'underscore',
            'api/SplunkVisualizationBase',
            'api/SplunkVisualizationUtils',
            'react',     // Require React
            'react-dom'  // Require ReactDOM
        ],
        function(
            $,
            _,
            SplunkVisualizationBase,
            vizUtils,
            React,       // React library object
            ReactDOM     // ReactDOM library object
        ) {
  
    // Extend from SplunkVisualizationBase to create your custom visualization
    return SplunkVisualizationBase.extend({
  
        // `initialize` is called once when the visualization is loaded
        initialize: function() {
            SplunkVisualizationBase.prototype.initialize.apply(this, arguments);
            
            // Store the root element provided by Splunk
            this.$el = $(this.el);

            // Create a dedicated div element within the visualization's root
            // where React will mount its components. This ensures React manages
            // its own part of the DOM without conflicting with Splunk's framework.
            this.$el.append('<div id="react-root"></div>');
            
            // Store the React root instance (for React 18's new API)
            this.reactRoot = null; 
            
            // Initialization logic goes here
            console.log("Splunk React Visualization initialized.");
        },

        // `formatData` is optional and allows you to transform the raw search
        // results before they are passed to `updateView`.
        formatData: function(data) {
            // Example: You might want to extract specific fields or rows,
            // or reformat the data structure to be more React-friendly.
            if (data && data.rows && data.fields) {
                const formattedData = {
                    fields: data.fields.map(f => f.name),
                    rows: data.rows
                };
                return formattedData;
            }
            return data;
        },
  
        // `updateView` is called whenever new data arrives or configuration changes.
        // This is where you'll render or update your React component.
        updateView: function(data, config) {
            // Get the mount point for React
            const container = this.$el.find('#react-root')[0];

            if (!container) {
                console.error("React mount point #react-root not found in the DOM.");
                return;
            }

            // If a React root already exists from a previous render, unmount it
            // This is crucial for cleanup and preventing memory leaks in React 18+
            if (this.reactRoot) {
                this.reactRoot.unmount();
                this.reactRoot = null; // Clear the reference
            }

            // Create a new React 18 root for rendering
            this.reactRoot = ReactDOM.createRoot(container);

            // Define your React component.
            // For a simple example, we define it inline. For complex apps,
            // this would be imported from a compiled JS bundle.
            const SplunkVizComponent = ({ data, config, vizUtils }) => {
                const [ count, setCount ] = React.useState(0)

                // Determine display content based on data presence
                console.log(config, vizUtils)
                let content;
                if (!data || !data.rows || data.rows.length === 0) {
                    content = <p>No data to display. Run a search to see results.</p>;
                } else {
                    // Display some data
                    const firstRow = data.rows[0];
                    const fields = data.fields; // Already formatted by formatData if implemented

                    content = (
                        <div className="sub-container">
                            <div>
                                <h3>React Powered Visualization </h3>
                                <p>Here's some data from Splunk:</p>
                                <p><strong>Fields:</strong> {fields ? fields.join(', ') : 'N/A'}</p>
                                <p><strong>First Row:</strong> {firstRow ? firstRow.join(', ') : 'N/A'}</p>
                                {/* You can add more complex React components, charts, etc. here */}
                                <p><strong>Current theme</strong>: { vizUtils ?  vizUtils?.getCurrentTheme() : 'N/A' }</p>
                                
                                
                            </div>
                            <ClickerComponent />
                        </div>
                    );
                }

                {/* A sample clicker component here to demo React features */}
                function ClickerComponent(){
                    const [ count, setCount ] = React.useState(0)
                    const [ index, setIndex ] = React.useState(0)
                    
                    const clickMessages = [
                        "Click Me",
                        "You rock!",
                        "Pure awesome.",
                        "Stay golden.",
                        "Good vibes!",
                        "Smile!"
                    ]
                    function handleClick(){
                        setCount(count => count + 1)
                        setIndex(index => index === clickMessages.length - 1 ? 0 : index + 1)
                    }

                    return (
                        <div>
                            <h3>A Simple Clicker Component </h3>
                            <p>You clicked { count } times.</p>
                            <button onClick={handleClick} className="btn btn-primary btn-block">
                                {
                                    clickMessages[index]
                                }
                            </button>
                        </div>)
                }

                return (
                    <div className='main-container'>
                        {content}
                    </div>
                );
            };

            // Render the React component into the designated container
            this.reactRoot.render(<SplunkVizComponent data={data} config={config} vizUtils={vizUtils} />);
        },

        // `getInitialDataParams` defines the properties of the search data needed for the visualization.
        getInitialDataParams: function() {
            return ({
                outputMode: SplunkVisualizationBase.ROW_MAJOR_OUTPUT_MODE,
                count: 10000 // Request up to 10,000 results
            });
        },

        // `reflow` is called when the visualization's containing element is resized.
        reflow: function() {
            // If your React component contains responsive elements (like charts),
            // you might need to trigger a resize within the component.
            // For a simple text display, a direct reflow might not be necessary for React.
            // If you need to re-render based on new dimensions, you might force an update
            // to your React component's state or props.
            if (this.reactRoot) {
                // A simple re-render might suffice, or more specific handling.
                // If you store the last `data` and `config` in `this` (e.g., `this._lastData`, `this._lastConfig`),
                // you could re-call: `this.updateView(this._lastData, this._lastConfig);`
                console.log("Splunk React Visualization reflowed.");
            }
        }
    });
});

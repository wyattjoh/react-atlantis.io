require.config({
    baseUrl: '/assets/dist',
    paths: {
        'jquery': 'components/jquery/dist/jquery',
        'react': 'components/react/react',
        'lodash': 'components/lodash/dist/lodash',
        'fastclick': 'components/fastclick/lib/fastclick',
        'foundation': 'components/foundation/js/foundation/foundation',
        'foundation.topbar': 'components/foundation/js/foundation/foundation.topbar',
        'fondation.reveal': 'components/foundation/js/foundation/foundation.reveal'
    }
});

require([
    'jquery',
    'foundation',
    'fastclick',
    'fondation.reveal',
    'foundation.topbar'
    ], function($) {
        $(document).foundation();
    });

require([
    'react',
    'lodash',
    'jquery'
    ], function(React, _, jQuery) {

        var getRandomColor = _.memoize(function(tok) {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        });

        var AtlantisTile = React.createClass({displayName: 'AtlantisTile',
            tileStyle: function() {
                return {
                    background: getRandomColor(this.props.name)
                };
            },
            render: function() {
                return (
                    React.createElement("figure", {className: "effect-goliath", style: this.tileStyle()}, 
                        React.createElement("div", {className: "image animated"}), 
                        React.createElement("figcaption", null, 
                            React.createElement("h2", null, this.props.name), 
                            React.createElement("p", null, "Open ", this.props.name, " on ", this.props.config.name), 
                            React.createElement("a", {href: this.props.url}, "Open ", this.props.name, " on ", this.props.config.name)
                        )
                    )
                );
            }
        });

        var AtlantisGrid = React.createClass({displayName: 'AtlantisGrid',
            getInitialState: function() {
                return { tiles: [] }
            },
            componentDidMount: function() {
                jQuery.ajax({
                    url: this.props.url,
                    dataType: 'json',
                    success: function(data) {
                        data.tiles.forEach(function(tile, index) {
                            // If the tile has a plugin defined
                            if (tile.plugin) {
                                require(["/plugins/" + tile.plugin.name + "/dist/js/module.js"], function(PluginComponent) {
                                    this.setState({ tiles: this.state.tiles.concat([
                                        React.createElement(PluginComponent, {key: index, context: tile, config: data.config})
                                    ]) });
                                }.bind(this));
                            } else {
                                this.setState({ tiles: this.state.tiles.concat([
                                    React.createElement(AtlantisTile, {key: index, name: tile.name, url: tile.url, config: data.config})
                                ]) });
                            }
                        }.bind(this));

                    }.bind(this),

                    error: function(xhr, status, err) {
                        console.error(this.props.url, status, err.toString());

                    }.bind(this)
                });
            },
            render: function() {
                return (
                    React.createElement("div", {className: "grid"}, 
                        this.state.tiles
                    )
                );
            }
        });

        var CONFIG_URL = "/data/config.json";

        // START RENDER CALL
        React.render(
            React.createElement(AtlantisGrid, {url: CONFIG_URL}),
            document.getElementById('grid')
        );

    });

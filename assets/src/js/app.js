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

        var AtlantisTile = React.createClass({
            tileStyle: function() {
                return {
                    background: getRandomColor(this.props.name)
                };
            },
            render: function() {
                return (
                    <figure className="effect-goliath" style={this.tileStyle()}>
                        <div className="image animated"></div>
                        <figcaption>
                            <h2>{this.props.name}</h2>
                            <p>Open {this.props.name} on {this.props.config.name}</p>
                            <a href={this.props.url}>Open {this.props.name} on {this.props.config.name}</a>
                        </figcaption>
                    </figure>
                );
            }
        });

        var AtlantisGrid = React.createClass({
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
                                        <PluginComponent key={index} context={tile} config={data.config} />
                                    ]) });
                                }.bind(this));
                            } else {
                                this.setState({ tiles: this.state.tiles.concat([
                                    <AtlantisTile key={index} name={tile.name} url={tile.url} config={data.config} />
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
                    <div className="grid">
                        {this.state.tiles}
                    </div>
                );
            }
        });

        var CONFIG_URL = "/data/config.json";

        // START RENDER CALL
        React.render(
            <AtlantisGrid url={CONFIG_URL} />,
            document.getElementById('grid')
        );

    });

define([
    "react"
    ], function(React) {

        var getRandomColor = _.memoize(function(tok) {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        });

        var XbmcTile = React.createClass({
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
                            <h2>XBMC: {this.props.context.name}</h2>
                            <p>Open {this.props.context.name} on {this.props.config.name}</p>
                            <a href={this.props.context.url}>Open {this.props.context.name} on {this.props.config.name}</a>
                        </figcaption>
                    </figure>
                );
            }
        });

        return XbmcTile;
    });

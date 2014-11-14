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

        var XbmcTile = React.createClass({displayName: 'XbmcTile',
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
                            React.createElement("h2", null, "XBMC: ", this.props.context.name), 
                            React.createElement("p", null, "Open ", this.props.context.name, " on ", this.props.config.name), 
                            React.createElement("a", {href: this.props.context.url}, "Open ", this.props.context.name, " on ", this.props.config.name)
                        )
                    )
                );
            }
        });

        return XbmcTile;
    });

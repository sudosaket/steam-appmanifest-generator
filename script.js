new Vue({
    el: '#app',
    data: {
        message: 'Welcome!',
        steamid: '76561198283464121',
        games: [],
        selected: {}
    },
    methods: {
        fetchGameList: function () {
            var that = this;
            $.ajax({
                url: `https://steam-appmanifest-generator.azurewebsites.net/api/hello?steamid=${this.steamid}`,
                success: function (result) {
                    that.games = result.response.games;
                }
            });
        },
        generateManifest: function () {
            var that = this;
            $.ajax({
                url: `https://steam-appmanifest-generator.azurewebsites.net/api/GenerateAppManifestContent?appid=${this.selected.appid}&appname=${this.selected.name}`,
                success: function (result) {
                    download(`appmanifest_${that.selected.appid}.acf`, result);
                }
            });
        }
    }
});

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}
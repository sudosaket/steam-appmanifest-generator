Vue.use(VueMaterial);

new Vue({
    el: '#app',
    data: {
        message: 'Welcome!',
        steamid: '76561198091853591',
        games: [],
        selected: {}
    },
    methods: {
        fetchGameList: function () {
            var that = this;
            $.ajax({
                url: `https://steam-appmanifest-generator.azurewebsites.net/api/games?steamid=${this.steamid}`,
                success: function (result) {
                    that.games = result.response.games;
                }
            });
        },
        generateManifest: function () {
            result =
`"AppState"
{
    "AppID"  "${this.selected.appid}"
    "Universe" "1"
    "installdir" "${this.selected.name}"
    "StateFlags" "1026"
}`
            download(`appmanifest_${this.selected.appid}.acf`, result);
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

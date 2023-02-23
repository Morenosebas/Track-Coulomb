export default function BodyContentIndex() {

    return (
        <div style={{ zIndex: -1, top: "17%", position: "fixed", height: "100%" }} className="container-fluid text-center">
            <div style={{ height: "50%" }} className="row row-cols-2">
                <div style={{ width: "100%" }} className="col">
                    <iframe
                        src="https://www.widgets.investing.com/live-currency-cross-rates?theme=darkTheme&amp;pairs=1,3,2,4,7,5,8,6,9,10,49,11"
                        width="105%"
                        height="100%"
                        frameborder="0"
                        scrolling="no"
                        allowtransparency="true"
                        marginwidth="0"
                        marginheight="0">
                    </iframe>
                </div>

            </div>
            <div className="row">
                <div className="col">
                    <iframe
                        height="200"
                        width="100%"
                        src="https://sslcharts.investing.com/index.php?force_lang=1&pair_ID=1&timescale=18000&candles=100&style=line">
                    </iframe>
                </div>
                <div className="col">
                    <iframe scrolling="no" height="90%" width="100%" src="https://ssltools.investing.com/technical_summary.php?pairs=8830,8831,8833,8836,8849,8862&curr-name-color=%230059B0&fields=5m,1h,1d&force_lang=1">
                    </iframe>
                </div>
                <div className="col">
                    <iframe frameborder='0' scrolling="no" height="90%" width="100%" src="https://ssltools.investing.com/technical_summary.php?pairs=27,166,170,172,175,178&curr-name-color=%230059B0&fields=5m,1h,1d&force_lang=1">
                    </iframe>
                </div>
            </div>
        </div>
    )
}
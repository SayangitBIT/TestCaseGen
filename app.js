const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const request = require('request');
const app = express()
const port = process.env.PORT || 3000


app.use(express.urlencoded({ extended: true }))
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
  res.render('index', body = "")
})

app.post('/', (req, res) => {
    const {num,Lower_limit,Upper_limit} = req.body;

    var program = {
        "clientId": "3a3bb2ae4f0c5146bd2d0e50729c17c4",
        "clientSecret": "1df9581d451b6aca5f5b12799a554a1816ccf5a8b99709de2206596c231593b8",
        "stdin":  num + ' ' + Lower_limit + ' ' + Upper_limit,
        "script" : "#include <bits/stdc++.h>\r\n\r\nusing namespace std;\r\nconst long long INF = 1e18;\r\n\r\n#define fastio()                  \\\r\n    ios_base::sync_with_stdio(0); \\\r\n    cin.tie(0);                   \\\r\n    cout.tie(0)\r\n#define endl \"\\n\"\r\n\r\nint main() {\r\n// #ifndef ONLINE_JUDGE    \r\n// freopen(\"input.txt\",\"r\",stdin);\r\n// freopen(\"output.txt\",\"w\",stdout);\r\n// #endif\r\n\r\nfastio();\r\n\r\n    long long n,l,r;\r\n    cin>>n>>l>>r;\r\n    std::random_device rd;     // only used once to initialise (seed) engine\r\n    std::mt19937 rng(rd());    // random-number engine used (Mersenne-Twister in this case)\r\n    uniform_int_distribution <long long> uni(l,r);\r\n\r\n    vector <long long> ans;\r\n     for(int i = 0; i < n; i++) {\r\n        auto num = uni(rng);\r\n        ans.push_back(num);\r\n    }\r\n\r\n    sort(ans.begin(), ans.end());\r\n    //cout<<n<<endl;\r\n    for(int i = 0; i < n; i++)\r\n    cout<<ans[i]<<endl;\r\n\r\n}",
        "language" : "cpp17",
        "versionIndex" : "0"
    };
    request({
        url: 'https://api.jdoodle.com/v1/execute',
        method: "POST",
        json: program
    },
    function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        res.render('index', {body});
    });
    
   // body.append(cur);
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
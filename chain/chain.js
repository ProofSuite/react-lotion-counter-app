let lotion = require('lotion')
let fs = require('fs')
let counterReducer = require('./reducers/counter')

let app = lotion({
  initialState: {
    counter: {
      count: 0
    }
  },
  logTendermint: false,
  p2pPort: 64339,
  rpcPort: 64340
})


app.use(function(state,tx) {
  let newState = counterReducer(state, tx)
  state.counter = newState.counter
})


app.start().then((appInfo) => {
  console.log('\n')
  console.log('Chain ID:', appInfo.GCI)
  console.log('Genesis Path:', appInfo.genesisPath)

  let genesisString = fs.readFileSync(appInfo.genesisPath, 'utf8')
  let genesis = JSON.parse(genesisString)
  let chainId = appInfo.GCI
  let config = { chainId, genesis }

  fs.writeFileSync('../app/src/config.json', JSON.stringify(config))
})
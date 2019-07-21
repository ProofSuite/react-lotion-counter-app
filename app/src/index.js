import React from 'react'
import ReactDOM from 'react-dom'
import { createChainStore } from 'redux-tendermint'
import { reducer } from '@proofsuite/counterchain'
import { genesis, chainId } from './config.json'
import Counter from './components/Counter'


createChainStore(reducer, chainId, genesis).then(store => {
  const render = () => ReactDOM.render(
    <Counter
      value={store.getState().counter.count}
      onIncrement={() => store.dispatch({ level: 'chain', type: 'INCREMENT' })}
      onDecrement={() => store.dispatch({ level: 'chain', type: 'DECREMENT' })}
    />,
    document.getElementById('root')
  )

  render()

  store.subscribe(render)
  store.subscribe(() => console.log('State', store.getState()))
  store.subscribeChain(() => console.log('Chain State', store.getChainState()))
})
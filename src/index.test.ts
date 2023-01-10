import { test } from 'uvu'
import * as assert from 'uvu/assert'

import graph from './index'


const NODE = 'vCU8cXnxkkMupiACruf9ih2M4k_CWIEvGsozbY9jlzg'

test('graph', async () => {
  const result = await graph(NODE)
  console.log(result.children[1].children)
  assert.equal(result.id, 'QbTshWZWxU205dYM1_qA-PNEEd9kcVaAAFbsVzIj5_g')
})

test.run()
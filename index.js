import {Volume} from 'memfs'
import {patchFs} from 'fs-monkey'
import {ufs} from 'unionfs'
import * as originalFs from 'fs'

let vol

function start() {
  // Maybe could use `node-mountfs` too.
  vol = new Volume()
  ufs.use(vol).use(originalFs)
  patchFs(ufs)
}

start()

export function reset() {
  vol.reset()
}

export {vol}

import fs from 'graceful-fs'

vol.fromJSON({'test.json': '{}'})

const a = fs.readFileSync('test.json')
console.log(a)
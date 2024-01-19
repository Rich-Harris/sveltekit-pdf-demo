# https://sveltekit-pdf-demo.vercel.app

This showcases the `read` function from [`$app/server`](https://kit.svelte.dev/docs/modules#$app-server), added in SvelteKit 2.4.0. It allows you to read an asset directly from the filesystem in Node-based deployments (with support planned for other runtimes in future):

```js
import FuturaPTCondBold from './fonts/FuturaPTCondBold.otf';
import { read } from '$app/server';

const font = await read(FuturaPTCondBold).arrayBuffer();
```

Any assets that are imported in this way will be included in the deployment.

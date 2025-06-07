import { GLOBAL_KEY } from '@reactful/client'
globalThis[GLOBAL_KEY].clients ||= {}


globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/prototype/routes/counter'] = { off:false, tag:'CountButton' }
import('/mnt/b/Repositorios/reactful/prototype/routes/counter').then(x => x.CountButton).then(x => globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/prototype/routes/counter'] = x);

globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/prototype/routes/forms/form'] = { off:false, tag:'default' }
import('/mnt/b/Repositorios/reactful/prototype/routes/forms/form').then(x => x.default).then(x => globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/prototype/routes/forms/form'] = x);

globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/prototype/routes/hello'] = { off:false, tag:'Hello' }
import('/mnt/b/Repositorios/reactful/prototype/routes/hello').then(x => x.default).then(x => globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/prototype/routes/hello'] = x);

globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/prototype/routes/login'] = { off:false, tag:'default' }
import('/mnt/b/Repositorios/reactful/prototype/routes/login').then(x => x.default).then(x => globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/prototype/routes/login'] = x);

globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/prototype/routes/profile/detail'] = { off:false, tag:'Detail' }
import('/mnt/b/Repositorios/reactful/prototype/routes/profile/detail').then(x => x.Detail).then(x => globalThis[GLOBAL_KEY].clients['/mnt/b/Repositorios/reactful/prototype/routes/profile/detail'] = x);

await import('/mnt/b/Repositorios/reactful/node_modules/@reactful/client/renders/index').then(x => x.default());
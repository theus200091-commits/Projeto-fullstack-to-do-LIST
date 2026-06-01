#!/bin/sh
if [ -f "Servidor Express/express.js" ]; then
  python -c "import pathlib; p=pathlib.Path('Servidor Express/express.js'); text=p.read_text(); secret='mongodb://matheus545152:3dKHLGi7ii6l2TsO@ac-3mceybe-shard-00-00.gwnnovr.mongodb.net:27017,ac-3mceybe-shard-00-01.gwnnovr.mongodb.net:27017,ac-3mceybe-shard-00-02.gwnnovr.mongodb.net:27017/Usuarios?ssl=true&replicaSet=atlas-bvdc35-shard-0&authSource=admin&appName=UsuariosToDoLiST'; p.write_text(text.replace(secret, 'process.env.MONGODB_URI'))"
fi

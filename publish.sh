# Meant for documentation purposes, since the publish step requires 2FA validation

cd projects/@typed-web-api/common
npm version patch # patch, minor or major
npm publish
cd ../../..

cd projects/@typed-web-api/client
npm i -S @typed-web-api/common@latest
npm version patch # patch, minor or major
npm publish
cd ../../..

cd projects/@typed-web-api/express 
npm i -S @typed-web-api/common@latest
npm version patch # patch, minor or major
npm publish
cd ../../..

cd projects/@typed-web-api/nestjs-server 
npm i -S @typed-web-api/common@latest
npm version patch # patch, minor or major
npm publish
cd ../../..

cd projects/@sample-express-app/common 
npm i -S @typed-web-api/common@latest
cd ../../..

cd projects/@sample-express-app/client 
npm i -S @typed-web-api/client@latest
cd ../../..

cd projects/@sample-express-app/server 
npm i -S @typed-web-api/express@latest
cd ../../..

cd projects/@sample-nest-app/common 
npm i -S @typed-web-api/common@latest
cd ../../..

cd projects/@sample-nest-app/client 
npm i -S @typed-web-api/client@latest
cd ../../..

cd projects/@sample-nest-app/server 
npm i -S @typed-web-api/nestjs-server@latest
cd ../../..

npm i # Necessary to adjust package-lock.json after installs

git add .
git commit -m "version X.Y.Z"

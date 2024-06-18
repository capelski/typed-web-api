# Meant for documentation purposes, since the publish step requires 2FA validation

npm run test # Make sure all tests pass before publishing

npm version patch -w @typed-web-api/common # patch, minor or major
npm publish -w @typed-web-api/common

npm i -S @typed-web-api/common@latest -w @typed-web-api/client
npm version patch -w @typed-web-api/client # patch, minor or major
npm publish -w @typed-web-api/client
 
npm i -S @typed-web-api/common@latest -w @typed-web-api/express
npm version patch -w @typed-web-api/express # patch, minor or major
npm publish -w @typed-web-api/express

npm i -S @typed-web-api/common@latest -w @typed-web-api/nestjs 
npm version patch -w @typed-web-api/nestjs # patch, minor or major
npm publish -w @typed-web-api/nestjs

npm i -S @typed-web-api/common@latest -w sample-common
npm i -S @typed-web-api/client@latest -w sample-client 
npm i -S @typed-web-api/express@latest -w sample-server-express
npm i -S @typed-web-api/nestjs@latest -w sample-server-nestjs

npm i --package-lock-only # Necessary to adjust package-lock.json after installs

# Build the sample projects to make sure the new versions don't break the api
npm run build -w sample-common
npm run build -w sample-client
npm run build -w sample-server-express
npm run build -w sample-server-nestjs

git add .
git commit -m "version X.Y.Z"

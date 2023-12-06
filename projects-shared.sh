allFiles=(
  "package-lock.json"
  "projects/@typed-web-api/client/package.json"
  "projects/@typed-web-api/common/package.json"
  "projects/@typed-web-api/express/package.json"
  "projects/@typed-web-api/nestjs/package.json"
  "projects/@sample-express-app/client/package.json"
  "projects/@sample-express-app/common/package.json"
  "projects/@sample-express-app/server/package.json"
  "projects/@sample-nestjs-app/client/package.json"
  "projects/@sample-nestjs-app/common/package.json"
  "projects/@sample-nestjs-app/server/package.json"
);

checkDiff() {
  for file in ${allFiles[@]}; do
    DIFF=$(git diff $file)

    if [[ $DIFF != "" ]]; then
      echo "Cannot link/unlink with changes in \"$file\""
      exit 1;
    fi
  done
}

discardDiff() {
  for file in ${allFiles[@]}; do
    git checkout $file;
  done
}

installDependency() {
  dependencyMode=$1;
  echo "Installing $2 ($dependencyMode dependency) in $3..."

  if [[ $dependencyMode == 'local' ]]; then
    npm i -S ./projects/$2 -w $3
  else
    cd ./projects/$3
    npm i -S $2@latest --workspaces=false
    rm -rf package-lock.json
    cd ../../..
  fi
}

installDependencies() {
  checkDiff

  npm run clean-modules;

  if [[ $1 == 'public' ]]; then
    cd ./projects/@typed-web-api/common
    npm i --workspaces=false
    rm -rf package-lock.json
    cd ../../..
  fi

  installDependency $1 @typed-web-api/common @typed-web-api/client
  installDependency $1 @typed-web-api/common @typed-web-api/express
  installDependency $1 @typed-web-api/common @typed-web-api/nestjs

  installDependency $1 @typed-web-api/common @sample-express-app/common
  installDependency $1 @typed-web-api/client @sample-express-app/client
  installDependency $1 @typed-web-api/express @sample-express-app/server

  installDependency $1 @typed-web-api/common @sample-nestjs-app/common
  installDependency $1 @typed-web-api/client @sample-nestjs-app/client
  installDependency $1 @typed-web-api/nestjs @sample-nestjs-app/server

  echo "Reinstalling dependencies at root folder..."
  if [[ $1 == 'public' ]]; then
    npm i --workspaces=false
  else
    npm i
  fi

  echo "Discarding generated workspace changes..."
  discardDiff
}